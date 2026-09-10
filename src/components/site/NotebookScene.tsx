"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * WebGL hero: a gently tumbling field of paper planes, pencils and index
 * cards — the notebook-motif counterpart to a generic "floating shapes"
 * hero. Everything is built from primitive geometry (no external models),
 * seeded deterministically so the scene is identical on every load, and
 * autorotates with a light pointer-parallax.
 */

// Deterministic PRNG so the scene layout never shifts between loads.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const ACCENTS = ["#2f52b0", "#c1544a", "#3d7a54"]; // primary, margin, mint-ish

function PaperPlane({ position, rotation, scale, color }: { position: [number, number, number]; rotation: [number, number, number]; scale: number; color: string }) {
  // Two triangles hinged along a crease — a minimal folded-paper-plane silhouette.
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const verts = new Float32Array([
      0, 0, 0.5, -0.5, -0.1, -0.5, 0, 0.12, -0.35, // left wing
      0, 0, 0.5, 0, 0.12, -0.35, 0.5, -0.1, -0.5, // right wing
    ]);
    geo.setAttribute("position", new THREE.BufferAttribute(verts, 3));
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh position={position} rotation={rotation} scale={scale} geometry={geometry}>
      <meshStandardMaterial color={color} side={THREE.DoubleSide} roughness={0.85} metalness={0} />
    </mesh>
  );
}

function Pencil({ position, rotation, scale, color }: { position: [number, number, number]; rotation: [number, number, number]; scale: number; color: string }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1.1, 6]} />
        <meshStandardMaterial color="#e8c98a" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.62, 0]}>
        <coneGeometry args={[0.05, 0.16, 6]} />
        <meshStandardMaterial color="#3a2a1a" roughness={0.6} />
      </mesh>
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.12, 6]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
    </group>
  );
}

function IndexCardMesh({ position, rotation, scale }: { position: [number, number, number]; rotation: [number, number, number]; scale: number }) {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[0.8, 0.55]} />
      <meshStandardMaterial color="#fffdf5" roughness={0.9} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Field() {
  const group = useRef<THREE.Group>(null);
  const rng = useMemo(() => mulberry32(7), []);

  const planes = useMemo(
    () =>
      Array.from({ length: 6 }, () => ({
        position: [(rng() - 0.5) * 5, (rng() - 0.5) * 3.4, (rng() - 0.5) * 2.6] as [number, number, number],
        rotation: [rng() * Math.PI, rng() * Math.PI, rng() * Math.PI] as [number, number, number],
        scale: 0.9 + rng() * 0.7,
        color: ACCENTS[Math.floor(rng() * ACCENTS.length)],
        speed: 0.1 + rng() * 0.15,
      })),
    [rng],
  );

  const pencils = useMemo(
    () =>
      Array.from({ length: 5 }, () => ({
        position: [(rng() - 0.5) * 5.4, (rng() - 0.5) * 3.4, (rng() - 0.5) * 2.6] as [number, number, number],
        rotation: [rng() * Math.PI, rng() * Math.PI, rng() * Math.PI] as [number, number, number],
        scale: 0.7 + rng() * 0.5,
        color: ACCENTS[Math.floor(rng() * ACCENTS.length)],
        speed: 0.08 + rng() * 0.12,
      })),
    [rng],
  );

  const cards = useMemo(
    () =>
      Array.from({ length: 4 }, () => ({
        position: [(rng() - 0.5) * 5.6, (rng() - 0.5) * 3.2, (rng() - 0.5) * 2.4] as [number, number, number],
        rotation: [rng() * Math.PI, rng() * Math.PI, rng() * Math.PI] as [number, number, number],
        scale: 0.8 + rng() * 0.4,
        speed: 0.06 + rng() * 0.1,
      })),
    [rng],
  );

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.06;
      // gentle pointer parallax, layered on top of the autorotation
      const targetX = state.pointer.y * 0.15;
      const targetY = group.current.rotation.y + state.pointer.x * 0.2;
      group.current.rotation.x += (targetX - group.current.rotation.x) * 0.03;
      group.current.rotation.y += (targetY - group.current.rotation.y) * 0.03;
    }
    group.current?.children.forEach((child, i) => {
      child.rotation.x += delta * (0.15 + (i % 3) * 0.05);
      child.rotation.z += delta * 0.08;
      child.position.y += Math.sin(state.clock.elapsedTime * 0.4 + i) * 0.0008;
    });
  });

  return (
    <group ref={group}>
      {planes.map((p, i) => (
        <PaperPlane key={`p${i}`} position={p.position} rotation={p.rotation} scale={p.scale} color={p.color} />
      ))}
      {pencils.map((p, i) => (
        <Pencil key={`c${i}`} position={p.position} rotation={p.rotation} scale={p.scale} color={p.color} />
      ))}
      {cards.map((c, i) => (
        <IndexCardMesh key={`i${i}`} position={c.position} rotation={c.rotation} scale={c.scale} />
      ))}
    </group>
  );
}

export default function NotebookScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.75} color="#fff4da" />
      <directionalLight position={[3, 4, 5]} intensity={1.1} color="#fff4da" />
      <directionalLight position={[-4, -2, -3]} intensity={0.35} color="#c9d8ff" />
      <Field />
    </Canvas>
  );
}
