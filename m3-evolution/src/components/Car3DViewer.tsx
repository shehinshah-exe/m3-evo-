import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

// New component to load the GLTF model
function Model({ 
  path, 
  scale, 
  position 
}: { 
  path: string, 
  scale?: number, 
  position?: [number, number, number] 
}) {
  const { scene } = useGLTF(path);
  
  // Use provided scale/position, or defaults if not provided
  const modelScale = scale || 1;
  const modelPosition = position || [0, 0, 0];

  return <primitive object={scene} scale={modelScale} position={modelPosition} />;
}

// Your original placeholder component
function PlaceholderCar() {
  return (
    <group>
      {/* Car body */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2, 1, 4]} />
        <meshStandardMaterial
          color="#2a2a2a"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>
      {/* M-colored accent stripe (kept for fun) */}
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[2.1, 0.05, 4.1]} />
        <meshStandardMaterial color="#1C69D4" emissive="#1C69D4" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 1.05, 0]}>
        <boxGeometry args={[2.1, 0.05, 4.1]} />
        <meshStandardMaterial color="#B02A8F" emissive="#B02A8F" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 1.0, 0]}>
        <boxGeometry args={[2.1, 0.05, 4.1]} />
        <meshStandardMaterial color="#E4002B" emissive="#E4002B" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}


interface Car3DViewerProps {
  modelPath?: string; 
  carName: string;
  scale?: number; // <-- ADDED
  position?: [number, number, number]; // <-- ADDED
}

function Car3DViewer({ modelPath, carName, scale, position }: Car3DViewerProps) {
  return (
    <div className="w-full h-96 md:h-[500px] rounded-lg overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800">
      <Canvas>
        <PerspectiveCamera makeDefault position={[5, 2, 5]} />

        {/* Lighting setup for metallic look */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#1C69D4" />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#B02A8F" />
        <directionalLight position={[0, 10, -10]} intensity={0.6} color="#E4002B" />
        <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffffff" />

        <Suspense fallback={null}>
          {/* Environment for reflections with a dramatic preset */}
          <Environment preset="night" />

          {/* Conditionally render the Model if modelPath exists.
            Otherwise, render the PlaceholderCar.
          */}
          {modelPath ? (
            <Model path={modelPath} scale={scale} position={position} /> 
          ) : (
            <PlaceholderCar />
          )}

          {/* Ground shadow plane (Kept from original) */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
            <planeGeometry args={[10, 10]} />
            <shadowMaterial opacity={0.3} />
          </mesh>
        </Suspense>

        {/* Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={10}
          maxPolarAngle={Math.PI / 2}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>

      <div className="text-center mt-2 text-sm text-bmw-silver">
        <span className="font-bold">{carName}</span> • Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
}

export default Car3DViewer;