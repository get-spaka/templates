// The candlelight (<figure class="candle" data-candlelight> holding the photo and a
// <canvas data-shader aria-hidden="true">, OGL): the figure's own <img> drawn as a texture,
// darkened to about 45%, with a warm pool of light in the theme's main color that follows
// the pointer with a slight lag, flickers and carries a fine grain. On a touch screen (and
// until the mouse moves) it drifts by itself over the room, above the name. Scrolling past zooms the photo slightly.
// Without WebGL, the same script sets --candle-x and --candle-y on the figure and the
// stylesheet's radial gradients do the darkening and the light (data-lit="css").
// With no script, under reduced motion and while editing: the photo as it is.
import { Mesh, Program, Renderer, Texture, Triangle } from "https://cdn.jsdelivr.net/npm/ogl@1.0.11/+esm";

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
uniform sampler2D tMap;
uniform vec2 uSize;
uniform vec2 uImage;
uniform vec2 uPointer;
uniform float uTime;
uniform float uZoom;
uniform float uLit;
uniform vec3 uLight;
uniform vec3 uNight;
varying vec2 vUv;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(float x) {
  float i = floor(x);
  float f = fract(x);
  return mix(hash(vec2(i, 0.0)), hash(vec2(i + 1.0, 0.0)), f * f * (3.0 - 2.0 * f));
}

void main() {
  // The photo covers the figure, as object-fit: cover does, zoomed by uZoom.
  float rs = uSize.x / uSize.y;
  float ri = uImage.x / uImage.y;
  vec2 scale = rs > ri ? vec2(1.0, ri / rs) : vec2(rs / ri, 1.0);
  vec2 uv = (vUv - 0.5) * scale / uZoom + 0.5;
  vec3 photo = texture2D(tMap, uv).rgb;

  vec2 px = vec2(gl_FragCoord.x, uSize.y - gl_FragCoord.y);
  float reach = max(uSize.x, uSize.y) * 0.34;
  float d = distance(px, uPointer) / reach;
  // A flame's flicker: two noises at different speeds, about 6% of the light's strength.
  float flicker = 1.0 + 0.06 * ((noise(uTime * 7.0) + noise(uTime * 2.3 + 11.0)) - 1.0);
  float light = clamp(exp(-d * d * 1.5) * flicker, 0.0, 1.0);

  // The room at about 45%; under the light the photo at full, warmed by the light's color.
  vec3 room = photo * 0.45;
  vec3 lit = mix(photo * 1.15, photo * uLight * 1.7, 0.3) + uLight * 0.05;
  vec3 color = mix(photo, mix(room, lit, light), uLit);
  // Night gathers at the foot, under the name.
  float foot = smoothstep(0.5, 1.0, 1.0 - vUv.y);
  color = mix(color, uNight, foot * 0.8);
  // A fine grain.
  color += (hash(px + fract(uTime) * 100.0) - 0.5) * 0.035;
  gl_FragColor = vec4(color, 1.0);
}
`;

/** A theme color as the shader's RGB, by letting a 2D canvas read it. */
function rgb(name) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const ctx = document.createElement("canvas").getContext("2d");
  ctx.fillStyle = value || "black";
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return [r / 255, g / 255, b / 255];
}

const loaded = (img) =>
  img.complete && img.naturalWidth
    ? Promise.resolve()
    : new Promise((done, fail) => {
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", fail, { once: true });
      });

const running = new Map();

/** The light's place: the pointer, eased; before the mouse moves, and on a touch screen,
    a slow drift over the middle of the room, above the name. */
function follower(fine) {
  let target;
  let current;
  let box = { left: 0, top: 0 };
  const onMove = (event) => {
    target = [event.clientX - box.left, event.clientY - box.top];
  };
  if (fine) window.addEventListener("pointermove", onMove, { passive: true });
  return {
    next(seconds, rect) {
      box = rect;
      const t = seconds * 0.35;
      const goal = target ?? [rect.width * (0.5 + 0.14 * Math.sin(t)), rect.height * (0.55 + 0.08 * Math.cos(t * 1.3))];
      current = current ?? goal;
      const ease = target ? 0.09 : 0.05;
      current = [current[0] + (goal[0] - current[0]) * ease, current[1] + (goal[1] - current[1]) * ease];
      return current;
    },
    stop() {
      window.removeEventListener("pointermove", onMove);
    },
  };
}

function startGL(figure, canvas, img) {
  let renderer;
  try {
    renderer = new Renderer({ canvas, dpr: Math.min(1.5, devicePixelRatio), antialias: false });
  } catch {
    return undefined;
  }
  const gl = renderer.gl;
  if (!gl) return undefined;
  const texture = new Texture(gl, { image: img, generateMipmaps: false });
  const program = new Program(gl, {
    vertex,
    fragment,
    uniforms: {
      tMap: { value: texture },
      uSize: { value: [1, 1] },
      uImage: { value: [img.naturalWidth, img.naturalHeight] },
      uPointer: { value: [0, 0] },
      uTime: { value: 0 },
      uZoom: { value: 1 },
      uLit: { value: 0 },
      uLight: { value: rgb("--color-primary") },
      uNight: { value: rgb("--color-neutral") },
    },
  });
  const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
  const dpr = renderer.dpr;
  const resize = () => {
    const { width, height } = figure.getBoundingClientRect();
    renderer.setSize(width, height);
    program.uniforms.uSize.value = [width * dpr, height * dpr];
  };
  resize();
  return {
    resize,
    draw(point, seconds, zoom, lit) {
      program.uniforms.uPointer.value = [point[0] * dpr, point[1] * dpr];
      program.uniforms.uTime.value = seconds;
      program.uniforms.uZoom.value = zoom;
      program.uniforms.uLit.value = lit;
      renderer.render({ scene: mesh });
    },
    stop() {
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
}

export function start(root) {
  if (reduced()) return;
  for (const figure of within(root, "[data-candlelight]")) {
    if (running.has(figure)) continue;
    const img = figure.querySelector("img");
    const canvas = figure.querySelector("canvas[data-shader]");
    if (!img) continue;
    let stopped = false;
    let teardown = () => {
      stopped = true;
    };
    running.set(figure, () => teardown());

    loaded(img)
      .then(() => {
        if (stopped) return;
        const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
        const gl = canvas ? startGL(figure, canvas, img) : undefined;
        figure.setAttribute("data-lit", gl ? "gl" : "css");
        const follow = follower(fine);
        const sizes = new ResizeObserver(() => gl?.resize());
        sizes.observe(figure);

        let visible = true;
        let frame;
        const seen = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          if (visible && !frame) frame = requestAnimationFrame(tick);
        });
        seen.observe(figure);

        const began = performance.now();
        let lit = 0;
        const tick = (time) => {
          frame = undefined;
          if (!visible) return;
          frame = requestAnimationFrame(tick);
          const box = figure.getBoundingClientRect();
          const seconds = (time - began) / 1000;
          const point = follow.next(seconds, box);
          // The light comes up over the first second and a half.
          lit = Math.min(1, lit + 1 / 90);
          // Scrolling past zooms the photo slightly.
          const past = Math.min(1, Math.max(0, -box.top / Math.max(1, box.height)));
          if (gl) gl.draw(point, seconds, 1 + past * 0.08, lit);
          else {
            figure.style.setProperty("--candle-x", `${point[0].toFixed(1)}px`);
            figure.style.setProperty("--candle-y", `${point[1].toFixed(1)}px`);
          }
        };
        frame = requestAnimationFrame(tick);

        teardown = () => {
          if (frame) cancelAnimationFrame(frame);
          visible = false;
          sizes.disconnect();
          seen.disconnect();
          follow.stop();
          gl?.stop();
          // A lost context cannot be drawn on again: the next start gets a fresh canvas.
          if (gl && canvas.isConnected) canvas.replaceWith(canvas.cloneNode());
          figure.removeAttribute("data-lit");
          figure.style.removeProperty("--candle-x");
          figure.style.removeProperty("--candle-y");
        };
      })
      .catch(() => running.delete(figure));
  }
}

export function stop(root) {
  for (const figure of within(root, "[data-candlelight]")) {
    running.get(figure)?.();
    running.delete(figure);
  }
}
