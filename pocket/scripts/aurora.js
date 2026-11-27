// The glow (<canvas data-aurora aria-hidden="true"> in a .glow section, OGL): three soft lights
// in the theme's second color, alternate surface and third color, read from the theme when it
// starts, drift slowly and lean toward the cursor. It runs at 30 frames a second at most, at a
// pixel ratio of 1, and stops while off screen. Under it, the section's own CSS lights are what
// show with no script, without WebGL and while editing; under reduced motion no glow is made.
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
uniform vec3 uA;
uniform vec3 uB;
uniform vec3 uC;

// One soft light, an ellipse sized on the section as its CSS gradient is.
float light(vec2 p, vec2 c, vec2 r) {
  vec2 d = (p - c) / r;
  return exp(-dot(d, d) * 2.6);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uSize;
  uv.y = 1.0 - uv.y;
  float t = uTime;
  vec2 lean = (uPointer - 0.5) * uPull;
  vec2 a = vec2(0.18 + 0.07 * sin(t * 0.21), 0.3 + 0.08 * cos(t * 0.17)) + lean * 0.22;
  vec2 b = vec2(0.58 + 0.09 * cos(t * 0.15), 0.72 + 0.07 * sin(t * 0.19)) + lean * 0.12;
  vec2 c = vec2(0.86 + 0.06 * sin(t * 0.13 + 1.7), 0.24 + 0.09 * cos(t * 0.23)) + lean * 0.3;
  float la = light(uv, a, vec2(0.42, 0.52));
  float lb = light(uv, b, vec2(0.4, 0.48));
  float lc = light(uv, c, vec2(0.44, 0.54));
  // Each light laid over the others, as the CSS gradients under it are.
  vec4 col = vec4(0.0);
  col = vec4(uB * lb * 0.95, lb * 0.95);
  col = col * (1.0 - la * 0.85) + vec4(uA * la * 0.85, la * 0.85);
  col = col * (1.0 - lc * 0.8) + vec4(uC * lc * 0.8, lc * 0.8);
  gl_FragColor = col;
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
  for (const canvas of within(root, "canvas[data-aurora]")) {
    if (running.has(canvas)) continue;
    const section = canvas.closest(".glow") ?? canvas.parentElement;
    let renderer;
    try {
      renderer = new Renderer({ canvas, alpha: true, premultipliedAlpha: true, dpr: 1 });
    } catch {
      continue; // no WebGL: the CSS lights stay
    }
    const gl = renderer.gl;
    if (!gl) continue;
    const css = getComputedStyle(document.documentElement);
    const color = (name) => rgb(css.getPropertyValue(name).trim());
    const program = new Program(gl, {
      vertex,
      fragment,
      transparent: true,
      uniforms: {
        uSize: { value: [1, 1] },
        uTime: { value: 0 },
        uPointer: { value: [0.5, 0.5] },
        uPull: { value: 0 },
        uA: { value: color("--color-secondary") },
        uB: { value: color("--color-base-200") },
        uC: { value: color("--color-accent") },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => {
      const { width, height } = section.getBoundingClientRect();
      renderer.setSize(width, height);
      program.uniforms.uSize.value = [width, height];
    };
    resize();
    const sizes = new ResizeObserver(resize);
    sizes.observe(section);

    let pointer = [0.5, 0.5];
    let pull = 0;
    let wanted = 0;
    const onMove = (event) => {
      const box = section.getBoundingClientRect();
      pointer = [(event.clientX - box.left) / box.width, (event.clientY - box.top) / box.height];
      wanted = 1;
    };
    const onLeave = () => (wanted = 0);
    section.addEventListener("pointermove", onMove, { passive: true });
    section.addEventListener("pointerleave", onLeave);

    let frame;
    let visible = true;
    let last = 0;
    const smooth = [0.5, 0.5];
    const began = performance.now();
    const tick = (time) => {
      frame = undefined;
      if (!visible) return;
      frame = requestAnimationFrame(tick);
      if (time - last < 1000 / 30) return;
      last = time;
      pull += (wanted - pull) * 0.05;
      smooth[0] += (pointer[0] - smooth[0]) * 0.06;
      smooth[1] += (pointer[1] - smooth[1]) * 0.06;
      program.uniforms.uPointer.value = smooth;
      program.uniforms.uPull.value = pull;
      program.uniforms.uTime.value = (time - began) / 1000;
      renderer.render({ scene: mesh });
    };
    const seen = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) frame = requestAnimationFrame(tick);
    });
    seen.observe(section);
    frame = requestAnimationFrame(tick);
    section.setAttribute("data-running", "");

    running.set(canvas, () => {
      if (frame) cancelAnimationFrame(frame);
      visible = false;
      sizes.disconnect();
      seen.disconnect();
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      section.removeAttribute("data-running");
      // The context is kept: the same canvas starts again after a new rendering of the preview.
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    });
  }
}

export function stop(root) {
  for (const canvas of within(root, "canvas[data-aurora]")) {
    running.get(canvas)?.();
    running.delete(canvas);
  }
}
