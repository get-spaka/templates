// The sheer: <canvas data-sheer aria-hidden="true"> over the photo of a <figure data-sheer-window>,
// drawn with OGL. Two panels of translucent linen hang from a rail at the window's top and meet
// in the middle, their vertical folds lit at the crests and shaded at the troughs, with a fine
// weave. The breeze moves them, the hem more than the rail; every few seconds a gust lifts the
// hems and opens a gap between them. As the page scrolls the window up, the panels draw aside to
// its edges, bunching into tighter folds, until the courtyard is clear. A pointer passing over
// the window sends a ripple through the cloth.
// Without WebGL the script sets data-sheer-css on the window, whose stylesheet draws two CSS
// panels, and draws them aside through --sheer-open. Under reduced motion: one still frame, the
// panels gathered at both edges. With no script and while editing: the photo alone.
import { scroll } from "motion";
import { Mesh, Program, Renderer, Triangle } from "ogl";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const vertex = /* glsl */ `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = /* glsl */ `
precision highp float;
uniform vec2 uSize;
uniform float uFoldScale;
uniform float uTime;
uniform float uOpen;
uniform vec3 uPointer;
uniform vec3 uLinen;
uniform vec3 uShade;
varying vec2 vUv;

const float PI = 3.14159265;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(float x) {
  float i = floor(x);
  float f = fract(x);
  return mix(hash(vec2(i, 0.0)), hash(vec2(i + 1.0, 0.0)), f * f * (3.0 - 2.0 * f));
}

// One panel at s (0 at its outer edge, 1 at its inner edge) and y (0 at the rail, 1 at the hem):
// its color and how much of the photo it hides.
vec4 panel(float s, float y, float seed, float ripple, float folds) {
  float hang = y * y;
  // Folds of uneven width, as cloth falls: a little noise in where each one turns.
  float phase = s * folds + seed
    + 0.32 * sin(s * folds * 1.47 + seed * 5.0) + 0.14 * sin(s * folds * 3.07 + seed * 9.0)
    + sin(y * 3.1 + uTime * 0.45 + s * 2.3 + seed) * 0.22 * (0.3 + hang)
    + ripple;
  float wave = cos(phase * 2.0 * PI);
  // A fold's crest is lit, its trough shaded; the cloth is denser where it turns away.
  float lit = smoothstep(-0.35, 0.95, wave);
  float turn = 1.0 - abs(wave);
  vec3 color = mix(mix(uLinen, uShade, 0.42), uLinen * 1.03, lit);
  float alpha = mix(0.34, 0.66, pow(1.0 - lit, 1.25)) + turn * 0.06;
  // Gathered at the rail, a band of small pleats; a doubled hem at the foot and along the inner edge.
  alpha += (1.0 - smoothstep(0.0, 0.035, y)) * 0.18;
  alpha += smoothstep(0.968, 0.978, y) * 0.14;
  alpha += smoothstep(0.955, 0.975, s) * 0.12;
  // The panel's inner edge, softened over a few pixels.
  alpha *= 1.0 - smoothstep(0.988, 1.0, s);
  return vec4(color, alpha);
}

void main() {
  vec2 uv = vec2(vUv.x, 1.0 - vUv.y);
  vec2 px = uv * uSize;
  float y = uv.y;
  float hang = y * y;

  // The breeze, more at the hem; a gust every few seconds lifts the hems and parts the panels.
  float gust = smoothstep(0.55, 0.92, noise(uTime * 0.23 + 3.0));
  float sway = (sin(uTime * 0.55 + y * 2.2) * 0.011 + sin(uTime * 0.93 + y * 4.0 + 1.3) * 0.005) * (0.2 + hang);
  sway *= 1.0 + gust * 1.6;
  float gap = gust * 0.075 * hang * (1.0 - uOpen);

  // How far each panel reaches from its edge: to the middle when closed, a tenth when open.
  float reach = mix(0.506, 0.1, uOpen);
  // Fewer folds across a narrow window, so each keeps the width of real cloth.
  float folds = mix(7.5, 6.0, uOpen) * uFoldScale;
  float xl = reach - gap + sway;
  float xr = 1.0 - reach + gap + sway * 0.8;

  // The pointer's ripple, fading within a second.
  float aspect = uSize.x / uSize.y;
  float d = distance(vec2(uv.x * aspect, uv.y), vec2(uPointer.x * aspect, uPointer.y));
  float ripple = uPointer.z * exp(-d * d * 18.0) * sin(d * 34.0 - uTime * 9.0) * 0.45;

  // The hem lifts with a gust, more at the inner corner.
  vec4 left = vec4(0.0);
  vec4 right = vec4(0.0);
  if (uv.x < xl) {
    float s = uv.x / max(xl, 0.001);
    float hem = 1.0 - gust * 0.05 * s * (1.0 - uOpen);
    if (y < hem) left = panel(s, y, 0.0, ripple, folds);
  }
  if (uv.x > xr) {
    float s = (1.0 - uv.x) / max(1.0 - xr, 0.001);
    float hem = 1.0 - gust * 0.06 * s * (1.0 - uOpen);
    if (y < hem) right = panel(s, y, 0.37, ripple, folds);
  }
  float alpha = 1.0 - (1.0 - left.a) * (1.0 - right.a);
  vec3 color = (left.rgb * left.a + right.rgb * right.a) / max(left.a + right.a, 0.0001);
  // Bunched cloth is thicker.
  alpha = min(0.86, alpha * mix(1.0, 1.3, uOpen));
  // The weave: a fine grid in the cloth.
  alpha *= 1.0 + 0.09 * sin(px.x * 2.1) * sin(px.y * 2.1);
  // The rail: a thin rod across the window's top.
  float rod = 1.0 - smoothstep(0.005, 0.009, y);
  color = mix(color, uShade, rod);
  alpha = max(alpha, rod * 0.7);
  gl_FragColor = vec4(color * alpha, alpha);
}
`;

/** A theme color as the shader's RGB, by letting a 2D canvas read it. */
function rgb(name) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const ctx = document.createElement("canvas").getContext("2d");
  ctx.fillStyle = value || "gray";
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return [r / 255, g / 255, b / 255];
}

/** The WebGL objects of a canvas, kept so that the same canvas starts again on its context. */
const scenes = new WeakMap();

function sceneOf(canvas) {
  if (scenes.has(canvas)) return scenes.get(canvas);
  let renderer;
  try {
    renderer = new Renderer({
      canvas,
      dpr: Math.min(1.5, devicePixelRatio || 1),
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
    });
  } catch {
    return undefined;
  }
  const gl = renderer.gl;
  if (!gl) return undefined;
  gl.clearColor(0, 0, 0, 0);
  const program = new Program(gl, {
    vertex,
    fragment,
    uniforms: {
      uSize: { value: [1, 1] },
      uFoldScale: { value: 1 },
      uTime: { value: 0 },
      uOpen: { value: 0 },
      uPointer: { value: [0.5, 0.5, 0] },
      uLinen: { value: [0.95, 0.93, 0.89] },
      uShade: { value: [0.25, 0.2, 0.17] },
    },
  });
  const scene = { renderer, gl, program, mesh: new Mesh(gl, { geometry: new Triangle(gl), program }) };
  scenes.set(canvas, scene);
  return scene;
}

const running = new Map();

export function start(root) {
  for (const figure of within(root, "[data-sheer-window]")) {
    if (running.has(figure)) continue;
    const canvas = figure.querySelector("canvas[data-sheer]");
    const still = reduced();
    const scene = canvas ? sceneOf(canvas) : undefined;
    const cleanups = [];
    running.set(figure, () => {
      for (const undo of cleanups) undo();
    });

    if (!scene) {
      // No WebGL: the stylesheet's panels, drawn aside by the scroll.
      figure.setAttribute("data-sheer-css", "");
      cleanups.push(() => {
        figure.removeAttribute("data-sheer-css");
        figure.style.removeProperty("--sheer-open");
      });
      if (still) {
        figure.style.setProperty("--sheer-open", "1");
        continue;
      }
      const top = figure.getBoundingClientRect().top + scrollY;
      cleanups.push(
        scroll((progress) => figure.style.setProperty("--sheer-open", progress.toFixed(3)), {
          target: figure,
          offset: [`start ${Math.round(top)}px`, "center start"],
        }),
      );
      continue;
    }

    const { renderer, gl, program, mesh } = scene;
    const u = program.uniforms;
    u.uLinen.value = rgb("--color-base-100");
    u.uShade.value = rgb("--color-neutral");
    const resize = () => {
      const { width, height } = figure.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height);
      u.uSize.value = [width * renderer.dpr, height * renderer.dpr];
      u.uFoldScale.value = Math.min(1, Math.max(0.36, width / 1100));
    };
    const draw = () => renderer.render({ scene: mesh });
    resize();
    cleanups.push(() => {
      // Keep the context: the same canvas is drawn on again at the next start.
      gl.clear(gl.COLOR_BUFFER_BIT);
    });

    if (still) {
      // Reduced motion: one still frame, the panels gathered at both edges.
      u.uTime.value = 0;
      u.uOpen.value = 1;
      u.uPointer.value = [0.5, 0.5, 0];
      draw();
      const sizes = new ResizeObserver(() => {
        resize();
        draw();
      });
      sizes.observe(figure);
      cleanups.push(() => sizes.disconnect());
      continue;
    }

    // How far the panels are drawn aside, from the scroll: closed as the page opens, clear once
    // the window's middle reaches the top of the screen.
    let open = 0;
    let target = 0;
    const top = figure.getBoundingClientRect().top + scrollY;
    cleanups.push(
      scroll(
        (progress) => {
          target = progress;
        },
        { target: figure, offset: [`start ${Math.round(top)}px`, "center start"] },
      ),
    );

    // The pointer's ripple, on a screen with a mouse.
    let ripple = 0;
    if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const move = (event) => {
        const box = figure.getBoundingClientRect();
        u.uPointer.value[0] = (event.clientX - box.left) / box.width;
        u.uPointer.value[1] = (event.clientY - box.top) / box.height;
        ripple = Math.min(1, ripple + 0.08);
      };
      figure.addEventListener("pointermove", move, { passive: true });
      cleanups.push(() => figure.removeEventListener("pointermove", move));
    }

    const sizes = new ResizeObserver(resize);
    sizes.observe(figure);
    let frame;
    let seen = true;
    const began = performance.now();
    let last = began;
    const tick = (now) => {
      frame = undefined;
      if (!seen || document.hidden) return;
      frame = requestAnimationFrame(tick);
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      open += (target - open) * Math.min(1, dt * 6);
      ripple *= Math.exp(-dt * 3.2);
      u.uTime.value = (now - began) / 1000;
      u.uOpen.value = open;
      u.uPointer.value[2] = ripple;
      draw();
    };
    const resume = () => {
      if (!frame && seen && !document.hidden) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };
    const watch = new IntersectionObserver(([entry]) => {
      seen = entry.isIntersecting;
      resume();
    });
    watch.observe(figure);
    document.addEventListener("visibilitychange", resume);
    resume();
    cleanups.unshift(() => {
      if (frame) cancelAnimationFrame(frame);
      frame = undefined;
      seen = false;
      watch.disconnect();
      sizes.disconnect();
      document.removeEventListener("visibilitychange", resume);
    });
  }
}

export function stop(root) {
  for (const figure of within(root, "[data-sheer-window]")) {
    running.get(figure)?.();
    running.delete(figure);
  }
}
