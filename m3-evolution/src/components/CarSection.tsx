import { useState, useEffect, useRef } from 'react';
import { Car } from '../data/cars';
import Car3DViewer from './Car3DViewer';

interface CarSectionProps {
  car: Car;
  index: number;
}

function CarSection({ car, index }: CarSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isEven = index % 2 === 0;

  // Alternate between M colors for backgrounds
  const bgClass = isEven
    ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800'
    : 'bg-gradient-to-br from-black via-gray-900 to-black';

  // Get M color accent based on index
  const getMColor = (idx: number) => {
    const colors = ['m-blue', 'm-purple', 'm-red'];
    return colors[idx % 3];
  };

  const accentColor = getMColor(index);

  return (
    <section
      ref={sectionRef}
      className={`min-h-screen flex items-center justify-center px-4 md:px-8 py-16 relative overflow-hidden ${bgClass}`}
    >
      {/* M-colored ambient glows */}
      <div className={`absolute top-0 left-0 w-96 h-96 bg-${accentColor} rounded-full filter blur-3xl opacity-10`} />
      <div className={`absolute bottom-0 right-0 w-96 h-96 bg-${accentColor} rounded-full filter blur-3xl opacity-10`} />

      <div
        className={`max-w-7xl w-full grid md:grid-cols-2 gap-8 md:gap-16 items-center transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        {isEven ? (
          <>
            <Car3DViewer 
              carName={car.model} 
              modelPath={car.modelPath}
              scale={car.scale}
              position={car.position}
            />
            <CarInfo car={car} accentColor={accentColor} />
          </>
        ) : (
          <>
            <CarInfo car={car} accentColor={accentColor} />
            <Car3DViewer 
              carName={car.model} 
              modelPath={car.modelPath}
              scale={car.scale}
              position={car.position}
            />
          </>
        )}
      </div>
    </section>
  );
}

interface CarInfoProps {
  car: Car;
  accentColor: string;
}

function CarInfo({ car, accentColor }: CarInfoProps) {
  return (
    <div>
      {/* M badge accent */}
      <div className="flex gap-1 mb-4">
        <div className="w-12 h-1 bg-m-blue transform -skew-x-12" />
        <div className="w-12 h-1 bg-m-purple transform -skew-x-12" />
        <div className="w-12 h-1 bg-m-red transform -skew-x-12" />
      </div>

      <h2 className={`text-4xl md:text-6xl font-black text-${accentColor} tracking-wider mb-2 uppercase`}>
        {car.model}
      </h2>
      <div className="text-lg md:text-xl text-bmw-silver mb-6 tracking-wide">
        {car.year}
      </div>
      <p className="text-base md:text-lg leading-relaxed mb-8 opacity-90">
        {car.description}
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className={`bg-gray-900/50 p-4 rounded-lg border-l-4 border-${accentColor}`}>
          <div className="text-xs md:text-sm text-bmw-silver uppercase tracking-wider mb-1">
            Engine
          </div>
          <div className="text-lg md:text-xl font-bold">
            {car.specs.engine}
          </div>
        </div>

        <div className={`bg-gray-900/50 p-4 rounded-lg border-l-4 border-${accentColor}`}>
          <div className="text-xs md:text-sm text-bmw-silver uppercase tracking-wider mb-1">
            Power
          </div>
          <div className="text-lg md:text-xl font-bold">
            {car.specs.power}
          </div>
        </div>

        <div className={`bg-gray-900/50 p-4 rounded-lg border-l-4 border-${accentColor}`}>
          <div className="text-xs md:text-sm text-bmw-silver uppercase tracking-wider mb-1">
            0-60 MPH
          </div>
          <div className="text-lg md:text-xl font-bold">
            {car.specs.acceleration}
          </div>
        </div>

        <div className={`bg-gray-900/50 p-4 rounded-lg border-l-4 border-${accentColor}`}>
          <div className="text-xs md:text-sm text-bmw-silver uppercase tracking-wider mb-1">
            Weight
          </div>
          <div className="text-lg md:text-xl font-bold">
            {car.specs.weight}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarSection;