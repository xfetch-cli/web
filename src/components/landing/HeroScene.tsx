"use client";

import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges, Grid, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { HERO_ASCII_LOGO, HERO_PALETTE, HERO_ROWS } from "./hero-data";
import {
  seededRandom,
  useInView,
  useReducedMotion,
  useScenePalette,
  type ScenePalette,
} from "./three/scene";

const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const KEY_PITCH = 0.62;
const KEY_SIZE = 0.56;
const KEY_HEIGHT = 0.16;
const REST_Y = 0.32;
const PRESS_Y = 0.23;
const KEY_ROWS = [
  "`1234567890-=",
  "qwertyuiop[]\\",
  "asdfghjkl;'",
  "zxcvbnm,./",
];
const BOTTOM_KEYS = [
  { label: "ctrl", x: -3.8, width: 1.3, char: "" },
  { label: "xfetch", x: 0, width: 5.3, char: "xfetch " },
  { label: "enter", x: 3.8, width: 1.3, char: "" },
];
const SCREEN_W = 1592;
const SCREEN_H = 877;

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

const labelCache = new Map<string, THREE.CanvasTexture>();

function getLabelTexture(text: string, color: string): THREE.CanvasTexture {
  const cacheKey = `${color}:${text}`;
  const cached = labelCache.get(cacheKey);
  if (cached) return cached;

  const wide = text.length > 1;
  const width = wide ? 512 : 128;
  const height = 128;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = wide ? `600 60px ${MONO}` : `600 62px ${MONO}`;
    ctx.fillText(text, width / 2, height / 2 + 2);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  labelCache.set(cacheKey, texture);
  return texture;
}

function drawScreen(
  ctx: CanvasRenderingContext2D,
  typed: string,
  palette: ScenePalette,
) {
  const width = SCREEN_W;
  const height = SCREEN_H;
  const screen = {
    accent: palette.dark ? palette.accent : "#ffb27a",
    cyan: palette.dark ? palette.cyan : "#7dd3fc",
    success: palette.dark ? palette.success : "#7ee2b8",
    text: "#e8ecf5",
    muted: "#98a2b8",
  };
  ctx.clearRect(0, 0, width, height);
  roundedRect(ctx, 0, 0, width, height, 26);
  ctx.save();
  ctx.clip();

  // Desktop wallpaper
  const background = ctx.createLinearGradient(0, 0, 0, height);
  background.addColorStop(0, "#0a1020");
  background.addColorStop(0.55, "#070b14");
  background.addColorStop(1, "#05070d");
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);

  const warmGlow = ctx.createRadialGradient(180, 20, 0, 180, 20, 820);
  warmGlow.addColorStop(0, `${screen.accent}30`);
  warmGlow.addColorStop(0.5, `${screen.accent}0b`);
  warmGlow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = warmGlow;
  ctx.fillRect(0, 0, width, height);

  const coolGlow = ctx.createRadialGradient(width - 160, height, 0, width - 160, height, 700);
  coolGlow.addColorStop(0, `${screen.cyan}1a`);
  coolGlow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = coolGlow;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(148,163,184,0.045)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= width; x += 56) {
    ctx.beginPath();
    ctx.moveTo(x + 0.5, 0);
    ctx.lineTo(x + 0.5, height);
    ctx.stroke();
  }
  for (let y = 0; y <= height; y += 56) {
    ctx.beginPath();
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(width, y + 0.5);
    ctx.stroke();
  }

  // Desktop icons
  const iconColors = [screen.accent, screen.cyan, palette.violet];
  iconColors.forEach((color, index) => {
    roundedRect(ctx, 66, 150 + index * 52, 30, 30, 8);
    ctx.fillStyle = `${color}22`;
    ctx.fill();
    ctx.strokeStyle = `${color}66`;
    ctx.stroke();
    roundedRect(ctx, 74, 158 + index * 52, 14, 14, 4);
    ctx.fillStyle = `${color}99`;
    ctx.fill();
    ctx.fillStyle = "rgba(152,162,184,0.38)";
    roundedRect(ctx, 70, 188 + index * 52, 22, 3, 1.5);
    ctx.fill();
  });

  // Desktop X watermark
  ctx.save();
  ctx.globalAlpha = 0.07;
  ctx.font = `700 70px ${MONO}`;
  ctx.fillStyle = screen.accent;
  HERO_ASCII_LOGO.forEach((line, index) => {
    ctx.fillText(line, 1282, 220 + index * 70);
  });
  ctx.restore();

  // Desktop topbar
  ctx.fillStyle = "rgba(6,9,16,0.8)";
  ctx.fillRect(0, 0, width, 40);
  ctx.fillStyle = "rgba(255,255,255,0.08)";
  ctx.fillRect(0, 40, width, 1);

  roundedRect(ctx, 20, 11, 18, 18, 4);
  ctx.fillStyle = `${screen.muted}18`;
  ctx.fill();
  ctx.strokeStyle = `${screen.muted}44`;
  ctx.stroke();
  ctx.fillStyle = `${screen.muted}cc`;
  [
    [24, 15],
    [31, 15],
    [24, 22],
    [31, 22],
  ].forEach(([x, y]) => {
    roundedRect(ctx, x, y, 4, 4, 1);
    ctx.fill();
  });

  ctx.font = `600 15px ${MONO}`;
  ctx.fillStyle = "rgba(232,236,245,0.92)";
  ctx.fillText("X Linux", 48, 26);

  ctx.fillStyle = "rgba(152,162,184,0.45)";
  roundedRect(ctx, width - 176, 18, 48, 4, 2);
  ctx.fill();
  roundedRect(ctx, width - 120, 18, 24, 4, 2);
  ctx.fill();
  ctx.textAlign = "right";
  ctx.font = `500 14px ${MONO}`;
  ctx.fillStyle = "rgba(152,162,184,0.72)";
  ctx.fillText("22:15", width - 24, 26);
  ctx.textAlign = "left";

  // Floating terminal window
  const wx = 316;
  const wy = 174;
  const ww = 960;
  const wh = 530;

  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.65)";
  ctx.shadowBlur = 44;
  ctx.shadowOffsetY = 22;
  roundedRect(ctx, wx, wy, ww, wh, 22);
  ctx.fillStyle = "#090d17";
  ctx.fill();
  ctx.restore();

  const windowGlow = ctx.createLinearGradient(0, wy, 0, wy + wh);
  windowGlow.addColorStop(0, "#0d1424");
  windowGlow.addColorStop(1, "#070a12");

  ctx.save();
  roundedRect(ctx, wx, wy, ww, wh, 22);
  ctx.clip();
  ctx.fillStyle = windowGlow;
  ctx.fillRect(wx, wy, ww, wh);

  const windowWash = ctx.createRadialGradient(wx + 130, wy + 10, 0, wx + 130, wy + 10, 620);
  windowWash.addColorStop(0, `${screen.accent}18`);
  windowWash.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = windowWash;
  ctx.fillRect(wx, wy, ww, wh);

  // Window chrome
  ctx.fillStyle = "rgba(13,19,34,0.97)";
  ctx.fillRect(wx, wy, ww, 50);
  ctx.fillStyle = "rgba(255,255,255,0.1)";
  ctx.fillRect(wx, wy + 50, ww, 1);

  ["#ff5f56", "#ffbd2e", "#27c93f"].forEach((color, index) => {
    ctx.beginPath();
    ctx.arc(wx + 26 + index * 19, wy + 25, 5.5, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  });

  roundedRect(ctx, wx + 88, wy + 13, 26, 26, 7);
  ctx.fillStyle = `${screen.accent}1f`;
  ctx.fill();
  ctx.strokeStyle = `${screen.accent}66`;
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.font = `700 15px ${MONO}`;
  ctx.fillStyle = screen.accent;
  ctx.textAlign = "center";
  ctx.fillText("X", wx + 101, wy + 31);
  ctx.textAlign = "left";

  ctx.font = `600 20px ${MONO}`;
  ctx.fillStyle = "rgba(226,232,244,0.94)";
  ctx.fillText("xfetch — zsh", wx + 128, wy + 32);

  ctx.textAlign = "right";
  ctx.font = `500 15px ${MONO}`;
  ctx.fillStyle = "rgba(152,162,184,0.6)";
  ctx.fillText("v1.0.4", wx + ww - 24, wy + 31);
  ctx.textAlign = "left";

  // Window terminal content
  const contentTop = wy + 50;
  ctx.font = `700 30px ${MONO}`;
  ctx.fillStyle = screen.accent;
  HERO_ASCII_LOGO.forEach((line, index) => {
    ctx.fillText(line, wx + 34, contentTop + 46 + index * 30);
  });

  const startX = wx + 240;
  const startY = contentTop + 40;
  const lineHeight = 42;
  HERO_ROWS.forEach((row, index) => {
    const y = startY + index * lineHeight;
    ctx.font = `700 30px ${MONO}`;
    ctx.fillStyle = screen.cyan;
    ctx.fillText(row.key, startX, y);
    ctx.font = `500 30px ${MONO}`;
    ctx.fillStyle = screen.text;
    ctx.fillText(row.value, startX + 142, y);
  });

  const paletteY = startY + HERO_ROWS.length * lineHeight + 8;
  HERO_PALETTE.forEach((color, index) => {
    roundedRect(ctx, startX + index * 27, paletteY, 17, 17, 3);
    ctx.fillStyle = color;
    ctx.fill();
  });

  ctx.fillStyle = "rgba(148,163,184,0.14)";
  ctx.fillRect(wx + 30, wy + 360, ww - 60, 1);

  ctx.font = `700 30px ${MONO}`;
  ctx.fillStyle = screen.success;
  ctx.fillText("$", wx + 34, wy + 450);
  ctx.fillStyle = screen.text;
  const prompt = typed || "xfetch";
  ctx.fillText(prompt, wx + 64, wy + 450);
  const cursorX = wx + 64 + ctx.measureText(prompt).width + 8;
  ctx.fillStyle = screen.success;
  ctx.fillRect(cursorX, wy + 428, 13, 27);

  ctx.font = `500 16px ${MONO}`;
  ctx.fillStyle = "rgba(152,162,184,0.56)";
  ctx.fillText("hover or tap the keys below — every key types", wx + 34, wy + 500);

  ctx.restore();

  // Window border
  roundedRect(ctx, wx + 0.5, wy + 0.5, ww - 1, wh - 1, 22);
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Dock
  const dockX = width / 2 - 45;
  HERO_PALETTE.slice(0, 5).forEach((color, index) => {
    roundedRect(ctx, dockX + index * 20, height - 22, 10, 10, 3);
    ctx.fillStyle = `${color}99`;
    ctx.fill();
  });

  // Monitor scanlines
  for (let y = 44; y < height; y += 4) {
    ctx.fillStyle = "rgba(255,255,255,0.012)";
    ctx.fillRect(0, y, width, 1);
  }

  ctx.restore();
  roundedRect(ctx, 0.75, 0.75, width - 1.5, height - 1.5, 26);
  ctx.strokeStyle = "rgba(255,255,255,0.17)";
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

function makeScreenTexture(palette: ScenePalette, initial: string) {
  const canvas = document.createElement("canvas");
  canvas.width = SCREEN_W;
  canvas.height = SCREEN_H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2d context unavailable");

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 8;

  const draw = (typed: string) => {
    drawScreen(ctx, typed, palette);
    texture.needsUpdate = true;
  };
  draw(initial);

  return { texture, draw };
}

function makeShadowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2d context unavailable");
  const gradient = ctx.createRadialGradient(128, 64, 4, 128, 64, 120);
  gradient.addColorStop(0, "rgba(0,0,0,0.62)");
  gradient.addColorStop(0.55, "rgba(0,0,0,0.28)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 128);
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

function FitCamera() {
  const aspectRef = useRef(0);

  useFrame((state) => {
    const camera = state.camera;
    if (!(camera instanceof THREE.PerspectiveCamera)) return;
    const aspect = state.size.width / Math.max(state.size.height, 1);
    if (Math.abs(aspect - aspectRef.current) < 0.005) return;
    aspectRef.current = aspect;

    const portrait = aspect < 1.3;
    const medium = aspect < 1.85;

    if (portrait) {
      camera.position.set(0.2, 5.0, 13.0);
      camera.fov = 42;
    } else if (medium) {
      camera.position.set(0.45, 4.9, 12.8);
      camera.fov = 36;
    } else {
      camera.position.set(0.6, 5.0, 13.5);
      camera.fov = 32;
    }
    camera.lookAt(0, 1.5, -0.6);
    camera.updateProjectionMatrix();
  });

  return null;
}

function SceneEnvironment() {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const texture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    // eslint-disable-next-line react-hooks/immutability -- three.js scene graph is mutable by design
    scene.environment = texture;
    scene.environmentIntensity = 0.32;
    return () => {
      scene.environment = null;
      texture.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);

  return null;
}

function ParticleField({ palette, reduced }: { palette: ScenePalette; reduced: boolean }) {
  const points = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const count = 200;
    const rand = seededRandom(0x4b3d);
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (rand() - 0.5) * 17;
      positions[i * 3 + 1] = rand() * 5.2 - 0.2;
      positions[i * 3 + 2] = (rand() - 0.5) * 9;
    }
    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return buffer;
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state, delta) => {
    if (!points.current || reduced) return;
    points.current.rotation.y += delta * 0.012;
    points.current.position.y = Math.sin(state.clock.elapsedTime * 0.22) * 0.06;
  });

  return (
    <points ref={points} geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        size={0.028}
        sizeAttenuation
        color={palette.cyan}
        transparent
        opacity={0.42}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

type KeySpec = {
  id: string;
  label: string;
  char: string;
  x: number;
  z: number;
  width: number;
  wide?: boolean;
};

function buildKeys(): KeySpec[] {
  const keys: KeySpec[] = [];
  KEY_ROWS.forEach((row, r) => {
    const chars = row.split("");
    const half = (chars.length - 1) / 2;
    chars.forEach((char, c) => {
      keys.push({
        id: `${r}-${c}`,
        label: char,
        char,
        x: (c - half) * KEY_PITCH,
        z: (r - 1.5) * KEY_PITCH - 0.04,
        width: KEY_SIZE,
      });
    });
  });
  BOTTOM_KEYS.forEach((key, index) => {
    keys.push({
      id: `bottom-${index}`,
      label: key.label,
      char: key.char,
      x: key.x,
      z: 1.68,
      width: key.width,
      wide: true,
    });
  });
  return keys;
}

const KEYS = buildKeys();

function Key({
  spec,
  index,
  palette,
  onType,
  pressed,
  register,
}: {
  spec: KeySpec;
  index: number;
  palette: ScenePalette;
  onType: (text: string) => void;
  pressed: React.RefObject<Set<number>>;
  register: (index: number, group: THREE.Group | null) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const labelTexture = useMemo(
    () => (spec.label ? getLabelTexture(spec.label, palette.text) : null),
    [spec.label, palette.text],
  );
  const labelWidth = spec.wide ? Math.min(spec.width * 0.5, 2.9) : 0.46;

  useEffect(() => {
    register(index, group.current);
    return () => register(index, null);
  }, [index, register]);

  return (
    <group
      ref={group}
      position={[spec.x, REST_Y, spec.z]}
      onPointerOver={(event) => {
        event.stopPropagation();
        if (pressed.current?.has(index)) return;
        pressed.current?.add(index);
        if (spec.char) onType(spec.char);
      }}
      onPointerOut={() => pressed.current?.delete(index)}
      onClick={(event) => {
        event.stopPropagation();
        if (spec.char && !pressed.current?.has(index)) onType(spec.char);
      }}
    >
      <RoundedBox
        args={[spec.width, KEY_HEIGHT, KEY_SIZE]}
        radius={0.06}
        smoothness={3}
        castShadow
      >
        <meshStandardMaterial
          color={palette.surface3}
          emissive={palette.accent}
          emissiveIntensity={0.02}
          metalness={0.28}
          roughness={0.48}
        />
      </RoundedBox>
      {labelTexture ? (
        <mesh position={[0, KEY_HEIGHT / 2 + 0.003, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry
            args={[labelWidth, spec.wide ? labelWidth / 5.2 : labelWidth]}
          />
          <meshBasicMaterial map={labelTexture} transparent toneMapped={false} />
        </mesh>
      ) : null}
    </group>
  );
}

function Keyboard({
  palette,
  reduced,
  onType,
}: {
  palette: ScenePalette;
  reduced: boolean;
  onType: (text: string) => void;
}) {
  const groups = useRef<Array<THREE.Group | null>>([]);
  const pressed = useRef(new Set<number>());

  const register = useCallback((index: number, group: THREE.Group | null) => {
    groups.current[index] = group;
  }, []);

  useFrame((_, delta) => {
    groups.current.forEach((group, index) => {
      if (!group) return;
      const isPressed = pressed.current.has(index);
      group.position.y = THREE.MathUtils.damp(
        group.position.y,
        isPressed ? PRESS_Y : REST_Y,
        14,
        delta,
      );
      const targetScale = isPressed ? 1.045 : 1;
      const nextScale = THREE.MathUtils.damp(group.scale.x, targetScale, 12, delta);
      group.scale.setScalar(nextScale);
      const mesh = group.children[0] as THREE.Mesh | undefined;
      const material = mesh?.material as THREE.MeshStandardMaterial | undefined;
      if (material) {
        material.emissiveIntensity = THREE.MathUtils.damp(
          material.emissiveIntensity,
          isPressed ? (reduced ? 0.45 : 1.1) : 0.02,
          10,
          delta,
        );
      }
    });
  });

  return (
    <group position={[0, 0, 0.45]}>
      <RoundedBox args={[9.2, 0.24, 3.6]} radius={0.16} smoothness={4} position={[0, 0.12, 0.3]}>
        <meshStandardMaterial
          color={palette.surface}
          metalness={0.5}
          roughness={0.42}
          transparent
          opacity={0.98}
        />
        <Edges color={palette.line} threshold={20} />
      </RoundedBox>

      <mesh position={[0, 0.245, 2.14]}>
        <boxGeometry args={[8.7, 0.022, 0.034]} />
        <meshBasicMaterial color={palette.accent} toneMapped={false} />
      </mesh>

      {KEYS.map((spec, index) => (
        <Key
          key={spec.id}
          spec={spec}
          index={index}
          palette={palette}
          onType={onType}
          pressed={pressed}
          register={register}
        />
      ))}
    </group>
  );
}

function LaptopLid({
  texture,
  palette,
}: {
  texture: THREE.Texture;
  palette: ScenePalette;
}) {
  return (
    <group position={[0, 0.24, -1.05]} rotation={[-0.16, 0, 0]}>
      <RoundedBox args={[9.2, 5.2, 0.12]} radius={0.12} smoothness={4} position={[0, 2.6, 0]} castShadow>
        <meshStandardMaterial
          color={palette.surface}
          metalness={0.52}
          roughness={0.38}
        />
        <Edges color={palette.line} threshold={20} />
      </RoundedBox>
      <mesh position={[0, 2.6, 0.07]}>
        <planeGeometry args={[8.9, 4.9]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      <mesh position={[0, 2.6, -0.09]}>
        <planeGeometry args={[9.7, 5.7]} />
        <meshBasicMaterial
          color={palette.accent}
          transparent
          opacity={0.055}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh position={[0, 5.12, 0.075]}>
        <boxGeometry args={[0.5, 0.04, 0.015]} />
        <meshBasicMaterial color="#05070d" />
      </mesh>
      <mesh position={[0, 0.14, 0.07]}>
        <boxGeometry args={[8.6, 0.018, 0.02]} />
        <meshBasicMaterial color={palette.accent} transparent opacity={0.55} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.24, -1.05]}>
        <boxGeometry args={[8.4, 0.07, 0.07]} />
        <meshStandardMaterial color={palette.surface2} metalness={0.6} roughness={0.35} />
      </mesh>
    </group>
  );
}

function Mouse({ palette }: { palette: ScenePalette }) {
  return (
    <group position={[5.35, 0.16, 1.85]} rotation={[0, -0.18, 0]}>
      <RoundedBox args={[0.82, 0.27, 1.32]} radius={0.2} smoothness={5}>
        <meshStandardMaterial
          color={palette.surface}
          metalness={0.42}
          roughness={0.46}
        />
        <Edges color={palette.line} threshold={24} />
      </RoundedBox>
      <mesh position={[0, 0.145, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.065, 0.24]} />
        <meshBasicMaterial color={palette.cyan} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Desk({ palette }: { palette: ScenePalette }) {
  return (
    <group>
      <RoundedBox args={[15.6, 0.2, 6.6]} radius={0.18} smoothness={4} position={[0, -0.11, 0.35]}>
        <meshStandardMaterial
          color={palette.surface2}
          metalness={0.18}
          roughness={0.7}
          transparent
          opacity={0.94}
        />
        <Edges color={palette.line} threshold={20} />
      </RoundedBox>
      <Grid
        position={[0, 0.0, 0.35]}
        args={[22, 12]}
        cellSize={0.4}
        cellThickness={0.5}
        cellColor={palette.muted}
        sectionSize={2}
        sectionThickness={0.8}
        sectionColor={palette.cyan}
        fadeDistance={19}
        fadeStrength={1.5}
        infiniteGrid
        followCamera={false}
      />
    </group>
  );
}

function ContactShadow() {
  const texture = useMemo(() => makeShadowTexture(), []);
  useEffect(() => () => texture.dispose(), [texture]);

  return (
    <mesh position={[0, 0.012, 0.7]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[13.5, 5.6]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0.62}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

const LabStage = memo(function LabStage({
  palette,
  reduced,
  onType,
}: {
  palette: ScenePalette;
  reduced: boolean;
  onType?: (text: string) => void;
}) {
  const world = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const typedRef = useRef("");
  const dirtyRef = useRef(false);

  const screen = useMemo(() => makeScreenTexture(palette, ""), [palette]);
  useEffect(() => {
    screen.draw(typedRef.current);
    return () => screen.texture.dispose();
  }, [screen]);

  const typeText = useCallback(
    (text: string) => {
      typedRef.current = (typedRef.current + text).slice(-46);
      dirtyRef.current = true;
      onType?.(typedRef.current);
    },
    [onType],
  );

  useEffect(() => {
    if (reduced) return;
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  useFrame((state, delta) => {
    if (dirtyRef.current) {
      dirtyRef.current = false;
      screen.draw(typedRef.current);
    }
    const group = world.current;
    if (!group) return;
    const targetY = reduced ? 0 : pointer.current.x * 0.032;
    const targetX = reduced ? 0 : pointer.current.y * 0.016;
    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, targetY, 3, delta);
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, targetX, 3, delta);
    group.position.y = reduced ? 0 : Math.sin(state.clock.elapsedTime * 0.28) * 0.025;
  });

  return (
    <group ref={world}>
      <ambientLight intensity={0.48} />
      <directionalLight position={[5, 8, 5]} intensity={2.1} color={palette.text} />
      <pointLight
        position={[-5.6, 1.9, 2.2]}
        intensity={palette.dark ? 22 : 9}
        distance={15}
        color={palette.cyan}
      />
      <pointLight
        position={[5.8, 1.6, 1.2]}
        intensity={palette.dark ? 18 : 8}
        distance={14}
        color={palette.violet}
      />
      <pointLight
        position={[0, 2.1, -1.2]}
        intensity={palette.dark ? 10 : 4}
        distance={6}
        color={palette.accent}
      />

      <Desk palette={palette} />
      <ContactShadow />
      <ParticleField palette={palette} reduced={reduced} />
      <LaptopLid texture={screen.texture} palette={palette} />
      <Keyboard palette={palette} reduced={reduced} onType={typeText} />
      <Mouse palette={palette} />
    </group>
  );
});

export default function HeroScene({
  onType,
}: {
  onType?: (text: string) => void;
}) {
  const wrapper = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapper);
  const palette = useScenePalette();
  const reduced = useReducedMotion();

  return (
    <div ref={wrapper} className="xf-hero-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, 1.6]}
        frameloop={inView ? "always" : "never"}
        camera={{ position: [0.6, 5.0, 13.5], fov: 32 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearAlpha(0);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
        }}
      >
        <FitCamera />
        <SceneEnvironment />
        <LabStage palette={palette} reduced={reduced} onType={onType} />
      </Canvas>
    </div>
  );
}
