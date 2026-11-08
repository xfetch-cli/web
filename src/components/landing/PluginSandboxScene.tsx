"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import {
  useInView,
  useReducedMotion,
  useScenePalette,
  type ScenePalette,
} from "./three/scene";

const RING_TILTS: Array<[number, number, number]> = [
  [0.55, 0.2, 0.35],
  [1.25, -0.35, -0.55],
  [0.25, 0.85, 0.2],
];

function StudioEnvironment() {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const texture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    // eslint-disable-next-line react-hooks/immutability -- three.js scene graph is mutable by design
    scene.environment = texture;
    scene.environmentIntensity = 0.38;
    return () => {
      scene.environment = null;
      texture.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);

  return null;
}

function Rings({ palette, reduced }: { palette: ScenePalette; reduced: boolean }) {
  const groups = useRef<Array<THREE.Group | null>>([]);
  const colors = [palette.accent, palette.cyan, palette.violet];

  useFrame((state, delta) => {
    if (reduced) return;
    groups.current.forEach((group, index) => {
      if (!group) return;
      group.rotation.z += delta * (0.18 + index * 0.06);
      group.rotation.x += delta * (0.03 + index * 0.015);
    });
  });

  return (
    <>
      {RING_TILTS.map((tilt, index) => {
        const color = colors[index % colors.length];
        const radius = 1.4 + index * 0.16;
        return (
          <group
            key={index}
            ref={(node) => {
              groups.current[index] = node;
            }}
            rotation={tilt}
          >
            <mesh>
              <torusGeometry args={[radius, 0.006, 8, 128]} />
              <meshBasicMaterial
                color={color}
                transparent
                opacity={0.5}
                toneMapped={false}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
            <mesh position={[radius, 0, 0]}>
              <sphereGeometry args={[0.055, 16, 16]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={1.5}
                metalness={0.2}
                roughness={0.3}
              />
            </mesh>
          </group>
        );
      })}
    </>
  );
}

function Sandbox({ palette, reduced }: { palette: ScenePalette; reduced: boolean }) {
  const core = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!reduced && core.current) {
      core.current.rotation.y += delta * 0.35;
      core.current.rotation.x += delta * 0.12;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.06;
      core.current.scale.setScalar(pulse);
    }
  });

  return (
    <group>
      <group rotation={[0.06, 0.22, 0]}>
        <RoundedBox args={[1.95, 1.95, 1.95]} radius={0.14} smoothness={5}>
          <meshPhysicalMaterial
            color={palette.surface2}
            metalness={0.28}
            roughness={0.12}
            clearcoat={1}
            clearcoatRoughness={0.08}
            transparent
            opacity={0.22}
            emissive={palette.violet}
            emissiveIntensity={0.05}
            depthWrite={false}
          />
          <Edges color={palette.violet} threshold={20} />
        </RoundedBox>

        <mesh>
          <boxGeometry args={[1.96, 1.96, 1.96]} />
          <meshBasicMaterial visible={false} />
          <Edges color={palette.violet} threshold={15} />
        </mesh>

        <mesh scale={1.06}>
          <boxGeometry args={[1.95, 1.95, 1.95]} />
          <meshBasicMaterial
            color={palette.cyan}
            wireframe
            transparent
            opacity={0.08}
            toneMapped={false}
          />
        </mesh>
      </group>

      <mesh ref={core}>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial
          color={palette.violet}
          emissive={palette.violet}
          emissiveIntensity={1.1}
          metalness={0.55}
          roughness={0.22}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshBasicMaterial
          color={palette.violet}
          transparent
          opacity={0.05}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh position={[0, -1.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.38, 0.008, 8, 128]} />
        <meshBasicMaterial color={palette.violet} transparent opacity={0.55} toneMapped={false} />
      </mesh>

      <mesh position={[0, -1.19, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.55, 64]} />
        <meshBasicMaterial
          color={palette.violet}
          transparent
          opacity={0.06}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <Rings palette={palette} reduced={reduced} />
    </group>
  );
}

function World({
  palette,
  reduced,
}: {
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
    const idle = reduced ? 0 : Math.sin(state.clock.elapsedTime * 0.32) * 0.03;
    const targetY = (reduced ? 0 : pointer.current.x * 0.18) + idle;
    const targetX = reduced ? 0 : pointer.current.y * 0.1;
    node.rotation.y = THREE.MathUtils.damp(node.rotation.y, targetY, 3, delta);
    node.rotation.x = THREE.MathUtils.damp(node.rotation.x, targetX, 3, delta);
  });

  return (
    <group ref={world}>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={1.7} color={palette.text} />
      <pointLight position={[3, 2, 3]} intensity={22} distance={9} color={palette.violet} />
      <pointLight position={[-3, 1.4, 2]} intensity={14} distance={8} color={palette.cyan} />

      <Sandbox palette={palette} reduced={reduced} />
      <StudioEnvironment />
    </group>
  );
}

export default function PluginSandboxScene() {
  const wrapper = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapper);
  const palette = useScenePalette();
  const reduced = useReducedMotion();

  return (
    <div ref={wrapper} className="xf-sandbox-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, 1.7]}
        frameloop={inView ? "always" : "never"}
        camera={{ position: [3.2, 2.7, 4.7], fov: 36 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearAlpha(0);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
        }}
      >
        <World palette={palette} reduced={reduced} />
      </Canvas>
    </div>
  );
}
