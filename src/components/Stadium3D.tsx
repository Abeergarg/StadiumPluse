'use client';

import { useRef, useMemo, Component, ReactNode, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Error boundary — WebGL failure shows a graceful SVG fallback ─── */
class CanvasBoundary extends Component<{ children: ReactNode }, { err: boolean }> {
  state = { err: false };
  static getDerivedStateFromError() { return { err: true }; }
  render() {
    if (this.state.err) return <Stadium2DFallback />;
    return this.props.children;
  }
}

/* ─── 2D SVG fallback when WebGL is unavailable ─── */
function Stadium2DFallback() {
  return (
    <div
      role="img"
      aria-label="Feroz Shah Kotla Stadium bird's-eye view"
      style={{
        width: '100%', height: 440, display: 'flex', alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(160deg,#eef2ff,#e0f2fe,#f0fdf4)',
        borderRadius: 18, border: '1px solid rgba(99,102,241,.2)',
        flexDirection: 'column', gap: 20,
        boxShadow: '0 8px 40px rgba(99,102,241,.12)',
      }}
    >
      <svg viewBox="0 0 320 220" width="320" height="220" aria-hidden="true"
        style={{ filter: 'drop-shadow(0 4px 20px rgba(99,102,241,.25))' }}>
        <ellipse cx="160" cy="110" rx="155" ry="105" fill="none" stroke="#6366f1" strokeWidth="22" opacity=".65"/>
        <ellipse cx="160" cy="110" rx="130" ry="83"  fill="none" stroke="#818cf8" strokeWidth="14" opacity=".55"/>
        <ellipse cx="160" cy="110" rx="105" ry="62"  fill="none" stroke="#a5b4fc" strokeWidth="10" opacity=".5"/>
        <ellipse cx="160" cy="110" rx="80"  ry="46"  fill="#16a34a" opacity=".85"/>
        <ellipse cx="160" cy="110" rx="22"  ry="22"  fill="none" stroke="#fff" strokeWidth="1.2" opacity=".7"/>
        <line x1="160" y1="64" x2="160" y2="156" stroke="#fff" strokeWidth="1.2" opacity=".7"/>
        <circle cx="160" cy="110" r="2.5" fill="#fff" opacity=".9"/>
        {[[69,34],[253,34],[69,186],[253,186]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="5" fill="#fef08a"
            style={{ filter:'drop-shadow(0 0 5px #fde047)' }} />
        ))}
        <circle cx="160" cy="110" r="8" fill="none" stroke="#059669" strokeWidth="1.5" opacity=".7">
          <animate attributeName="r" values="8;18;8" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values=".7;0;.7" dur="2s" repeatCount="indefinite"/>
        </circle>
      </svg>
      <div style={{ textAlign: 'center' }}>
        <div style={{ color:'#4f46e5', fontWeight:700, fontSize:'1rem', marginBottom:6 }}>🏟️ Feroz Shah Kotla Ground</div>
        <div style={{ color:'#64748b', fontSize:'.8rem' }}>Enable hardware acceleration for the interactive 3D view</div>
      </div>
    </div>
  );
}

/* ─── Ring tier (one stand level) ─── */
function Tier({ innerR, outerR, h, y, col }: {
  innerR: number; outerR: number; h: number; y: number; col: string;
}) {
  const geo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.absarc(0, 0, outerR, 0, Math.PI * 2, false);
    const hole = new THREE.Path();
    hole.absarc(0, 0, innerR, 0, Math.PI * 2, true);
    shape.holes.push(hole);
    return new THREE.ExtrudeGeometry(shape, { depth: h, bevelEnabled: false });
  }, [innerR, outerR, h]);

  return (
    <mesh geometry={geo} position={[0, y, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
      <meshStandardMaterial color={col} roughness={0.55} metalness={0.25} />
    </mesh>
  );
}

/* ─── Football pitch ─── */
function Pitch() {
  return (
    <group position={[0, 0, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[3.0, 128]} />
        <meshStandardMaterial color="#15803d" roughness={0.9} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[0.65, 0.69, 80]} />
        <meshStandardMaterial color="#ffffff" roughness={0.85} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[5.9, 0.04]} />
        <meshStandardMaterial color="#ffffff" roughness={0.85} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]}>
        <circleGeometry args={[0.07, 24]} />
        <meshStandardMaterial color="#ffffff" roughness={0.85} />
      </mesh>
    </group>
  );
}

/* ─── Floodlight mast ─── */
function Mast({ angle, r }: { angle: number; r: number }) {
  const x = Math.cos(angle) * r;
  const z = Math.sin(angle) * r;
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 2.5, 0]} castShadow>
        <cylinderGeometry args={[0.055, 0.075, 5, 8]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.15} />
      </mesh>
      {[-0.14, 0, 0.14].map((dx, i) => (
        <mesh key={i} position={[dx, 5.1, 0]}>
          <sphereGeometry args={[0.09, 8, 8]} />
          <meshStandardMaterial color="#fffbeb" emissive="#fffbeb" emissiveIntensity={4} />
        </mesh>
      ))}
      <pointLight position={[0, 5.1, 0]} intensity={10} distance={18} color="#fffacd" castShadow />
    </group>
  );
}

/* ─── Roof truss arch ─── */
function Arch({ angle }: { angle: number }) {
  return (
    <mesh
      position={[Math.cos(angle) * 5.5, 3.7, Math.sin(angle) * 5.5]}
      rotation={[0, -angle, 0]}
      castShadow
    >
      <torusGeometry args={[0.65, 0.04, 8, 32, Math.PI]} />
      <meshStandardMaterial color="#94a3b8" metalness={0.85} roughness={0.2} />
    </mesh>
  );
}

/* ─── Starfield ─── */
function Starfield() {
  const geo = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < 1600; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 55 + Math.random() * 20;
      positions.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      );
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return g;
  }, []);

  return (
    <points geometry={geo}>
      <pointsMaterial color="#c7d2fe" size={0.22} sizeAttenuation transparent opacity={0.75} />
    </points>
  );
}

/* ─── Crowd seats as InstancedMesh (1 draw call instead of 300) ─── */
const CROWD_COLORS = [
  new THREE.Color('#ef4444'),
  new THREE.Color('#3b82f6'),
  new THREE.Color('#f59e0b'),
  new THREE.Color('#10b981'),
  new THREE.Color('#e5e7eb'),
];

function CrowdDots() {
  const SEAT_COUNT = 300;
  const meshRef = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const dummy   = new THREE.Object3D();
    const colorArr = new Float32Array(SEAT_COUNT * 3);

    for (let i = 0; i < SEAT_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r     = 3.35 + Math.random() * 1.9;
      const tier  = Math.floor(Math.random() * 3);
      dummy.position.set(Math.cos(angle) * r, 0.45 + tier * 0.65, Math.sin(angle) * r);
      dummy.scale.setScalar(0.05);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      const col = CROWD_COLORS[Math.floor(Math.random() * CROWD_COLORS.length)];
      colorArr[i * 3]     = col.r;
      colorArr[i * 3 + 1] = col.g;
      colorArr[i * 3 + 2] = col.b;
    }

    mesh.geometry.setAttribute('color', new THREE.InstancedBufferAttribute(colorArr, 3));
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, SEAT_COUNT]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshStandardMaterial vertexColors roughness={0.8} />
    </instancedMesh>
  );
}

/* ─── Complete stadium group ─── */
function Stadium() {
  const ref         = useRef<THREE.Group>(null);
  const mastAngles  = useMemo(() => [Math.PI / 4, 3 * Math.PI / 4, 5 * Math.PI / 4, 7 * Math.PI / 4], []);
  const archAngles  = useMemo(() => Array.from({ length: 8 }, (_, i) => (i * Math.PI * 2) / 8), []);

  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.1; });

  return (
    <group ref={ref}>
      {/* Base */}
      <mesh position={[0, -0.6, 0]} receiveShadow>
        <cylinderGeometry args={[6.4, 7, 0.7, 128]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.7} metalness={0.15} />
      </mesh>
      {/* Outer facade */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[5.75, 5.95, 2.8, 128, 1, true]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.6} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>
      {/* Tiers */}
      <Tier innerR={3.1} outerR={4.3}  h={0.52} y={0.25} col="#1d4ed8" />
      <Tier innerR={3.5} outerR={4.85} h={0.52} y={0.9}  col="#2563eb" />
      <Tier innerR={3.8} outerR={5.4}  h={0.52} y={1.55} col="#3b82f6" />
      <Tier innerR={4.1} outerR={5.75} h={0.46} y={2.15} col="#818cf8" />
      {/* Roof canopy */}
      <mesh position={[0, 2.95, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.4, 6.1, 128]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.7} side={THREE.DoubleSide} />
      </mesh>
      {archAngles.map((a, i) => <Arch key={i} angle={a} />)}
      <Pitch />
      {mastAngles.map((a, i) => <Mast key={i} angle={a} r={5.85} />)}
      <CrowdDots />
    </group>
  );
}

/* ─── Main export ─── */
export default function Stadium3D() {
  return (
    <div
      role="img"
      aria-label="Interactive 3D stadium model — drag to rotate, scroll to zoom"
      style={{
        width: '100%', height: 440,
        borderRadius: 18, overflow: 'hidden',
        border: '1px solid rgba(99,102,241,.18)',
        background: 'linear-gradient(160deg,#1e1b4b,#0f172a,#0c1a2e)',
        boxShadow: '0 8px 40px rgba(99,102,241,.15)',
      }}
    >
      <CanvasBoundary>
        <Canvas
          shadows
          camera={{ position: [0, 7, 13], fov: 44 }}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            preserveDrawingBuffer: true,
            failIfMajorPerformanceCaveat: false,
          }}
          dpr={[1, 1.5]}
          frameloop="always"
          onCreated={({ gl }) => { gl.shadowMap.type = THREE.PCFShadowMap; }}
          aria-label="Interactive 3D stadium"
        >
          <color attach="background" args={['#060811']} />
          <ambientLight intensity={0.35} />
          <directionalLight
            position={[6, 12, 8]} intensity={1.8} castShadow
            shadow-mapSize-width={1024} shadow-mapSize-height={1024}
          />
          <pointLight position={[0, 8, 0]} intensity={0.7} color="#c7d2fe" />
          <Starfield />
          <Stadium />
          <OrbitControls
            enablePan={false} enableZoom
            minPolarAngle={Math.PI / 10} maxPolarAngle={Math.PI / 2.2}
            minDistance={7} maxDistance={22}
          />
          <Environment preset="night" />
        </Canvas>
      </CanvasBoundary>
    </div>
  );
}
