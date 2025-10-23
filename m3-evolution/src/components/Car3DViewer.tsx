import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Suspense } from 'react';

interface Car3DViewerProps {
  modelPath?: string;
  carName: string;
}

function Car3DViewer({ modelPath, carName }: Car3DViewerProps) {
  return (
    <div className="w-full h-96 md:h-[500px] rounded-lg overflow-hidden bg-gradient-to-br from-gray-900 to-blue-900">
      <Canvas>
        <PerspectiveCamera makeDefault position={[5, 2, 5]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        
        <Suspense fallback={null}>
          {/* Environment for reflections */}
          <Environment preset="sunset" />
          
          {/* Placeholder - we'll add the actual model here */}
          <mesh>
            <boxGeometry args={[2, 1, 4]} />
            <meshStandardMaterial color="#0066b1" metalness={0.8} roughness={0.2} />
          </mesh>
        </Suspense>
        
        {/* Controls */}
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={10}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
      
      <div className="text-center mt-2 text-sm opacity-50">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
}

export default Car3DViewer;