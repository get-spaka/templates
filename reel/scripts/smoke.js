// Acid smoke (<canvas data-shader aria-hidden="true"> as the first child of a section with
// data-smoke; OGL): a slow field of ink in the theme's main color over its ground,
// folding on itself and leaning toward the pointer. It reads both colors from the theme
// when it starts, so the Theme tab recolors it; it runs at 30 frames a second at most,
// at a low resolution (smoke is soft), and stops while the section is off screen. Under
// reduced motion it draws one still frame. Under it, the section's CSS glow is what shows
// with no script, without WebGL and while editing.
import { Mesh, Program, Renderer, Triangle } from "ogl";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const vertex = /* glsl */ `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const fragment = /* glsl */ `
precision highp float;
uniform vec2 uSize;
uniform float uTime;
uniform vec2 uPointer;
uniform vec3 uInk;
uniform vec3 uGround;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uSize;
  float aspect = uSize.x / uSize.y;
  vec2 p = vec2(uv.x * aspect, uv.y) * 1.7;
  vec2 lean = (uPointer - uv) * vec2(aspect, 1.0) * 0.45;
  float t = uTime * 0.045;
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p + 3.2 * q + vec2(1.7, 9.2) + t * 1.4 + lean), fbm(p + 3.2 * q + vec2(8.3, 2.8) - t * 0.8));
  float f = fbm(p + 2.6 * r);
  // The ink gathers toward the top right, away from the headline, and near the pointer.
  float gather = smoothstep(1.05, 0.05, distance(uv * vec2(aspect, 1.0), vec2(0.8 * aspect, 0.78)));
  vec2 d = (uv - uPointer) * vec2(aspect, 1.0);
  float near = exp(-dot(d, d) / 0.09);
  float ink = smoothstep(0.42, 0.95, f) * (0.18 + 0.82 * gather) + near * 0.22 * f;
  ink = clamp(ink, 0.0, 1.0) * 0.62;
  gl_FragColor = vec4(mix(uGround, uInk, ink), 1.0);
}
`;

/** A theme color as the shader's RGB, by letting a 2D canvas read it. */
function rgb(color) {
  const ctx = document.createElement("canvas").getContext("2d");
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return [r / 255, g / 255, b / 255];
}

const running = new Map();

export function start(root) {
  const still = reduced();
  for (const canvas of within(root, "[data-smoke] > canvas[data-shader]")) {
    if (running.has(canvas)) continue;
    const section = canvas.parentElement;
    let renderer;
    try {
      renderer = new Renderer({ canvas, dpr: 0.6, antialias: false });
    } catch {
      continue; // no WebGL: the CSS glow stays
    }
    const gl = renderer.gl;
    if (!gl) continue;
    const theme = getComputedStyle(document.documentElement);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uSize: { value: [1, 1] },
        uTime: { value: 12 },
        uPointer: { value: [0.78, 0.7] },
        uInk: { value: rgb(theme.getPropertyValue("--color-primary").trim()) },
        uGround: { value: rgb(theme.getPropertyValue("--color-base-100").trim()) },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
    const draw = () => renderer.render({ scene: mesh });

    const resize = () => {
      const { width, height } = section.getBoundingClientRect();
      renderer.setSize(width, height);
      program.uniforms.uSize.value = [gl.drawingBufferWidth, gl.drawingBufferHeight];
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      if (still) draw();
    };
    resize();
    const sizes = new ResizeObserver(resize);
    sizes.observe(section);
    section.setAttribute("data-running", "");

    if (still) {
      draw();
      running.set(canvas, () => {
        sizes.disconnect();
        section.removeAttribute("data-running");
      });
      continue;
    }

    const aim = [0.78, 0.7];
    const onMove = (event) => {
      const box = section.getBoundingClientRect();
      aim[0] = (event.clientX - box.left) / box.width;
      aim[1] = 1 - (event.clientY - box.top) / box.height;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    let frame;
    let last = 0;
    const began = performance.now();
    const tick = (time) => {
      frame = undefined;
      if (!visible) return;
      frame = requestAnimationFrame(tick);
      if (time - last < 1000 / 30) return;
      last = time;
      const pointer = program.uniforms.uPointer.value;
      pointer[0] += (aim[0] - pointer[0]) * 0.04;
      pointer[1] += (aim[1] - pointer[1]) * 0.04;
      program.uniforms.uTime.value = 12 + (time - began) / 1000;
      draw();
    };
    const seen = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) frame = requestAnimationFrame(tick);
    });
    seen.observe(section);
    frame = requestAnimationFrame(tick);

    running.set(canvas, () => {
      if (frame) cancelAnimationFrame(frame);
      visible = false;
      sizes.disconnect();
      seen.disconnect();
      window.removeEventListener("pointermove", onMove);
      section.removeAttribute("data-running");
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    });
  }
}

export function stop(root) {
  for (const canvas of within(root, "[data-smoke] > canvas[data-shader]")) {
    running.get(canvas)?.();
    running.delete(canvas);
  }
}
