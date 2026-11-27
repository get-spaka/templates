// The halftone field (<canvas data-shader="halftone">, OGL): a grid of dots in the
// theme's main color whose size follows a slow noise and swells around the cursor
// (around the middle of the screen on a phone, moving with the scroll). It reads the
// colors from the theme when it starts, runs at 30 frames a second at most, and stops
// while off screen. Under it, the section's printed CSS halftone is what shows with
// no script, no WebGL, under reduced motion and while editing.
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
uniform float uPull;
uniform float uCell;
uniform vec3 uInk;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

void main() {
  vec2 px = vec2(gl_FragCoord.x, uSize.y - gl_FragCoord.y);
  vec2 cell = floor(px / uCell);
  vec2 center = (cell + 0.5) * uCell;
  float n = noise(center / 260.0 + vec2(uTime * 0.05, uTime * 0.03));
  // Larger toward the top right, like the printed halftone under it.
  float corner = 1.0 - clamp(distance(center / uSize, vec2(1.0, 0.0)) / 1.2, 0.0, 1.0);
  float d = distance(center, uPointer);
  float swell = uPull * exp(-(d * d) / (2.0 * 170.0 * 170.0));
  float r = uCell * (0.1 + 0.2 * n + 0.18 * corner + 0.3 * swell);
  float edge = distance(px, center);
  float a = 1.0 - smoothstep(r - 0.75, r + 0.75, edge);
  gl_FragColor = vec4(uInk * a, a);
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
  if (reduced()) return;
  for (const canvas of within(root, '[data-shader="halftone"]')) {
    if (running.has(canvas)) continue;
    const section = canvas.closest("[data-halftone]") ?? canvas.parentElement;
    let renderer;
    try {
      renderer = new Renderer({ canvas, alpha: true, premultipliedAlpha: true, dpr: Math.min(1.5, devicePixelRatio) });
    } catch {
      continue; // no WebGL: the printed halftone stays
    }
    const gl = renderer.gl;
    if (!gl) continue;
    const ink = rgb(getComputedStyle(document.documentElement).getPropertyValue("--color-primary").trim());
    const program = new Program(gl, {
      vertex,
      fragment,
      transparent: true,
      uniforms: {
        uSize: { value: [1, 1] },
        uTime: { value: 0 },
        uPointer: { value: [-9999, -9999] },
        uPull: { value: 0 },
        uCell: { value: 16 },
        uInk: { value: ink },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
    const dpr = renderer.dpr;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    let pointer = fine ? undefined : [0, 0];
    let pull = 0;

    const resize = () => {
      const { width, height } = section.getBoundingClientRect();
      renderer.setSize(width, height);
      program.uniforms.uSize.value = [width * dpr, height * dpr];
      program.uniforms.uCell.value = (width < 640 ? 12 : 16) * dpr;
    };
    resize();
    const sizes = new ResizeObserver(resize);
    sizes.observe(section);

    const onMove = (event) => {
      const box = section.getBoundingClientRect();
      pointer = [(event.clientX - box.left) * dpr, (event.clientY - box.top) * dpr];
    };
    if (fine) window.addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    const seen = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) frame = requestAnimationFrame(tick);
    });
    seen.observe(section);

    let frame;
    let last = 0;
    const began = performance.now();
    const tick = (time) => {
      frame = undefined;
      if (!visible) return;
      frame = requestAnimationFrame(tick);
      if (time - last < 1000 / 30) return;
      last = time;
      if (!fine) {
        // On a phone the swell sits mid-screen and travels down the poster as it scrolls.
        const box = section.getBoundingClientRect();
        pointer = [box.width * 0.62 * dpr, (innerHeight * 0.45 - box.top) * dpr];
      }
      pull += ((pointer ? 1 : 0) - pull) * 0.08;
      if (pointer) program.uniforms.uPointer.value = pointer;
      program.uniforms.uPull.value = pull;
      program.uniforms.uTime.value = (time - began) / 1000;
      renderer.render({ scene: mesh });
    };
    frame = requestAnimationFrame(tick);
    section.setAttribute("data-running", "");

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
  for (const canvas of within(root, '[data-shader="halftone"]')) {
    running.get(canvas)?.();
    running.delete(canvas);
  }
}
