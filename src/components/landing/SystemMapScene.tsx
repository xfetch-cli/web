"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges, Grid, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import {
  useInView,
  useReducedMotion,
  useScenePalette,
  type ScenePalette,
} from "./three/scene";

type Props = {
  active: number;
  onActive: (index: number) => void;
};

const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const SLAB_COUNT = 4;
const SLAB_Y = [1.38, 0.68, -0.02, -0.72];
const SLAB_STEP = 0.7;
const SLAB_LABELS = [
  { num: "01", name: "CONFIG" },
  { num: "02", name: "PROBES" },
  { num: "03", name: "RENDERER" },
  { num: "04", name: "TERMINAL" },
];

const labelCache = new Map<string, THREE.CanvasTexture>();

function getSlabLabel(
  num: string,
  name: string,
  numColor: string,
  textColor: string,
): THREE.CanvasTexture {
  const key = `${numColor}:${textColor}:${num}:${name}`;
  const cached = labelCache.get(key);
  if (cached) return cached;

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.clearRect(0, 0, 512, 128);
    ctx.textBaseline = "middle";
    ctx.font = `700 52px ${MONO}`;
    ctx.fillStyle = numColor;
    ctx.fillText(num, 18, 66);
    ctx.font = `600 46px ${MONO}`;
    ctx.fillStyle = textColor;
    ctx.fillText(name, 96, 66);
    ctx.fillStyle = numColor;
    ctx.fillRect(18, 100, 470, 2);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  labelCache.set(key, texture);
  return texture;
}

function StudioEnvironment() {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const texture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    // eslint-disable-next-line react-hooks/immutability -- three.js scene graph is mutable by design
    scene.environment = texture;
    scene.environmentIntensity = 0.35;
    return () => {
      scene.environment = null;
      texture.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);

  return null;
}

function Aim() {
  const camera = useThree((state) => state.camera);
  useEffect(() => {
    camera.lookAt(0, 0.18, 0);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.updateProjectionMatrix();
    }
  }, [camera]);
  return null;
}

function Slab({
  index,
  y,
  active,
  onActive,
  palette,
}: {
  index: number;
  y: number;
  active: boolean;
  onActive: (index: number) => void;
  palette: ScenePalette;
}) {
  const group = useRef<THREE.Group>(null);
  const scale = useRef(1);
  const [hovered, setHovered] = useState(false);
  const label = SLAB_LABELS[index];

  const labelTexture = useMemo(
    () =>
      getSlabLabel(
        label.num,
        label.name,
        active ? palette.accent : palette.muted,
        palette.text,
      ),
    [label, active, palette.accent, palette.muted, palette.text],
  );

  useEffect(() => {
    if (!hovered) return;
    const previous = document.body.style.cursor;
    document.body.style.cursor = "pointer";
    return () => {
      document.body.style.cursor = previous;
    };
  }, [hovered]);

  useFrame((state, delta) => {
    const node = group.current;
    if (!node) return;
    const target = active ? 1.045 : hovered ? 1.02 : 1;
    scale.current = THREE.MathUtils.damp(scale.current, target, 9, delta);
    node.scale.setScalar(scale.current);
    node.position.y = THREE.MathUtils.damp(node.position.y, y + (active ? 0.06 : 0), 9, delta);

    const mesh = node.children[0] as THREE.Mesh | undefined;
    const material = mesh?.material as THREE.MeshStandardMaterial | undefined;
    if (material) {
      const pulse = active ? 0.032 + Math.sin(state.clock.elapsedTime * 1.8) * 0.012 : 0;
      material.emissiveIntensity = THREE.MathUtils.damp(
        material.emissiveIntensity,
        active ? pulse : hovered ? 0.05 : 0.02,
        8,
        delta,
      );
    }
  });

  const tint = active ? palette.accent : palette.cyan;

  return (
    <group
      ref={group}
      position={[0, y, 0]}
      onClick={(event) => {
        event.stopPropagation();
        onActive(index);
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <RoundedBox args={[3.9, 0.24, 1.9]} radius={0.09} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial
          color={active ? palette.surface3 : palette.surface2}
          emissive={tint}
          emissiveIntensity={active ? 0.032 : hovered ? 0.05 : 0.02}
          metalness={0.42}
          roughness={0.42}
        />
        <Edges color={active ? palette.accent : palette.line} threshold={20} />
      </RoundedBox>

      <mesh position={[0, 0.126, 0.47]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.05, 0.76]} />
        <meshBasicMaterial
          map={labelTexture}
          transparent
          opacity={active ? 1 : 0.7}
          toneMapped={false}
        />
      </mesh>

      <mesh position={[0, 0.126, 0.95]}>
        <boxGeometry args={[3.5, 0.016, 0.026]} />
        <meshBasicMaterial
          color={tint}
          transparent
          opacity={active ? 0.95 : 0.42}
          toneMapped={false}
        />
      </mesh>

      {active ? (
        <group position={[0, 0.126, 0]}>
          <mesh position={[0, 0, 0.93]}>
            <boxGeometry args={[3.72, 0.012, 0.02]} />
            <meshBasicMaterial color={palette.accent} toneMapped={false} />
          </mesh>
          <mesh position={[0, 0, -0.93]}>
            <boxGeometry args={[3.72, 0.012, 0.02]} />
            <meshBasicMaterial color={palette.accent} toneMapped={false} opacity={0.55} transparent />
          </mesh>
          <mesh position={[1.79, 0, 0]}>
            <boxGeometry args={[0.02, 0.012, 1.84]} />
            <meshBasicMaterial color={palette.accent} toneMapped={false} opacity={0.75} transparent />
          </mesh>
          <mesh position={[-1.79, 0, 0]}>
            <boxGeometry args={[0.02, 0.012, 1.84]} />
            <meshBasicMaterial color={palette.accent} toneMapped={false} opacity={0.75} transparent />
          </mesh>
        </group>
      ) : null}
    </group>
  );
}

function DataPackets({ palette, reduced }: { palette: ScenePalette; reduced: boolean }) {
  const packets = useRef<Array<THREE.Mesh | null>>([]);

  useFrame((state) => {
    if (reduced) return;
    const time = state.clock.elapsedTime * 0.28;
    packets.current.forEach((mesh, index) => {
      if (!mesh) return;
      const progress = (time + index * 0.34) % 1;
      mesh.position.y = 1.38 - progress * 2.3;
      mesh.position.x = 0.2;
      mesh.position.z = 0.55;
      const scale = 0.8 + Math.sin(progress * Math.PI) * 0.7;
      mesh.scale.setScalar(scale);
    });
  });

  return (
    <>
      {[0, 1, 2].map((index) => (
        <mesh
          key={index}
          ref={(node) => {
            packets.current[index] = node;
          }}
          position={[0.2, 1.38 - index * 0.7, 0.55]}
        >
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshBasicMaterial
            color={palette.cyan}
            transparent
            opacity={0.95}
            toneMapped={false}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </>
  );
}

function Connectors({ palette }: { palette: ScenePalette }) {
  return (
    <group>
      {Array.from({ length: SLAB_COUNT - 1 }, (_, index) => {
        const top = SLAB_Y[index];
        const bottom = SLAB_Y[index + 1];
        const mid = (top + bottom) / 2;
        return (
          <group key={index}>
            <mesh position={[0.2, mid, 0.55]}>
              <boxGeometry args={[0.035, SLAB_STEP - 0.24, 0.035]} />
              <meshStandardMaterial
                color={palette.cyan}
                emissive={palette.cyan}
                emissiveIntensity={0.8}
                transparent
                opacity={0.7}
              />
            </mesh>
            <mesh position={[-1.1, mid, 0.2]}>
              <boxGeometry args={[0.02, SLAB_STEP - 0.24, 0.02]} />
              <meshBasicMaterial color={palette.cyan} transparent opacity={0.28} />
            </mesh>
            <mesh position={[-1.1, mid, 0.2]}>
              <sphereGeometry args={[0.045, 12, 12]} />
              <meshBasicMaterial color={palette.cyan} transparent opacity={0.8} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function SandboxPlane({ palette }: { palette: ScenePalette }) {
  const nodes: Array<[number, number, string]> = [
    [0.95, 0.55, "plugin"],
    [0.35, 0.5, "effect"],
    [-0.25, 0.45, "extension"],
  ];

  return (
    <group position={[3.35, 0.32, -0.1]}>
      <RoundedBox args={[0.14, 3.05, 1.9]} radius={0.05} smoothness={3}>
        <meshPhysicalMaterial
          color={palette.surface}
          emissive={palette.violet}
          emissiveIntensity={0.12}
          transparent
          opacity={0.48}
          metalness={0.25}
          roughness={0.32}
          clearcoat={1}
          clearcoatRoughness={0.2}
        />
        <Edges color={palette.violet} threshold={20} />
      </RoundedBox>
      <mesh position={[0.02, 0, 0]}>
        <boxGeometry args={[0.06, 2.9, 1.75]} />
        <meshBasicMaterial
          color={palette.violet}
          wireframe
          transparent
          opacity={0.08}
          toneMapped={false}
        />
      </mesh>
      {nodes.map(([y, z, key]) => (
        <group key={key} position={[0.12, y, z]}>
          <mesh>
            <sphereGeometry args={[0.085, 20, 20]} />
            <meshStandardMaterial
              color={palette.violet}
              emissive={palette.violet}
              emissiveIntensity={0.9}
              metalness={0.2}
              roughness={0.35}
            />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshBasicMaterial
              color={palette.violet}
              transparent
              opacity={0.12}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function BasePlate({ palette }: { palette: ScenePalette }) {
  return (
    <group position={[0, -1.27, 0]}>
      <RoundedBox args={[5.2, 0.12, 2.7]} radius={0.06} smoothness={4}>
        <meshStandardMaterial
          color={palette.surface2}
          metalness={0.5}
          roughness={0.48}
          transparent
          opacity={0.9}
        />
        <Edges color={palette.line} threshold={20} />
      </RoundedBox>
      <mesh position={[0, 0.065, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.1, 64]} />
        <meshBasicMaterial
          color={palette.cyan}
          transparent
          opacity={0.04}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function World({
  active,
  onActive,
  palette,
  reduced,
}: {
  active: number;
  onActive: (index: number) => void;
  palette: ScenePalette;
  reduced: boolean;
}) {
  const world = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

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
    const node = world.current;
    if (!node) return;
    const idle = reduced ? 0 : Math.sin(state.clock.elapsedTime * 0.24) * 0.035;
    const targetY = (reduced ? 0 : pointer.current.x * 0.1) + idle;
    const targetX = reduced ? 0 : pointer.current.y * 0.05;
    node.rotation.y = THREE.MathUtils.damp(node.rotation.y, targetY, 3, delta);
    node.rotation.x = THREE.MathUtils.damp(node.rotation.x, targetX, 3, delta);
  });

  return (
    <group ref={world}>
      <ambientLight intensity={0.62} />
      <directionalLight position={[5, 8, 4]} intensity={1.6} color={palette.text} />
      <pointLight position={[-4, 2.4, -3]} intensity={16} distance={14} color={palette.cyan} />
      <pointLight position={[4.5, 2, -2]} intensity={14} distance={13} color={palette.violet} />

      <Grid
        position={[0, -1.42, 0]}
        args={[10, 10]}
        cellSize={0.4}
        cellThickness={0.5}
        cellColor={palette.muted}
        sectionSize={2}
        sectionThickness={0.8}
        sectionColor={palette.cyan}
        fadeDistance={11}
        fadeStrength={1.5}
        infiniteGrid
        followCamera={false}
      />

      <BasePlate palette={palette} />

      {SLAB_Y.map((y, index) => (
        <Slab
          key={index}
          index={index}
          y={y}
          active={active === index}
          onActive={onActive}
          palette={palette}
        />
      ))}

      <Connectors palette={palette} />
      <DataPackets palette={palette} reduced={reduced} />

      <mesh position={[2.65, 0.68, 0.35]}>
        <boxGeometry args={[1.35, 0.03, 0.03]} />
        <meshStandardMaterial
          color={palette.violet}
          emissive={palette.violet}
          emissiveIntensity={0.7}
          transparent
          opacity={0.65}
        />
      </mesh>
      <SandboxPlane palette={palette} />

      <mesh position={[0, 1.38, 0.55]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.35, 0.012, 8, 96]} />
        <meshBasicMaterial color={palette.line} transparent opacity={0.35} />
      </mesh>

      <StudioEnvironment />
    </group>
  );
}

export default function SystemMapScene({ active, onActive }: Props) {
  const wrapper = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapper);
  const palette = useScenePalette();
  const reduced = useReducedMotion();

  return (
    <div ref={wrapper} className="xf-map-3d" aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        frameloop={inView ? "always" : "never"}
        camera={{ position: [7, 5.2, 8.9], fov: 31 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearAlpha(0);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
        }}
      >
        <Aim />
        <World active={active} onActive={onActive} palette={palette} reduced={reduced} />
      </Canvas>
    </div>
  );
}
