import { useState, useEffect, useRef } from 'react';
import { Car } from '../data/cars';
import Car3DViewer from './Car3DViewer';

interface CarSectionProps {
  car: Car;
  index: number;
}

function CarSelection({ car, index }: CarSectionProps) {
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
  const bgClass = isEven 
    ? 'bg-gradient-to-br from-gray-900 to-blue-900' 
    : 'bg-gradient-to-br from-blue-900 to-gray-800';

  return (
    <section 
      ref={sectionRef}
      className={`min-h-screen flex items-center justify-center px-4 md:px-8 py-16 relative overflow-hidden ${bgClass}`}
    >
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-10" />

      <div 
        className={`max-w-7xl w-full grid md:grid-cols-2 gap-8 md:gap-16 items-center transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        {isEven ? (
          <>
            <Car3DViewer carName={car.model} />
            <CarInfo car={car} />
          </>
        ) : (
          <>
            <CarInfo car={car} />
            <Car3DViewer carName={car.model} />
          </>
        )}
      </div>
    </section>
  );
}

interface CarInfoProps {
  car: Car;
}

function CarInfo({ car }: CarInfoProps) {
  return (
    <div>
      <h2 className="text-4xl md:text-6xl font-black text-blue-400 tracking-wider mb-2 uppercase">
        {car.model}
      </h2>
      <div className="text-lg md:text-xl opacity-70 mb-6 tracking-wide">
        {car.year}
      </div>
      <p className="text-base md:text-lg leading-relaxed mb-8 opacity-90">
        {car.description}
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-500">
          <div className="text-xs md:text-sm opacity-70 uppercase tracking-wider mb-1">
            Engine
          </div>
          <div className="text-lg md:text-xl font-bold">
            {car.specs.engine}
          </div>
        </div>

        <div className="bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-500">
          <div className="text-xs md:text-sm opacity-70 uppercase tracking-wider mb-1">
            Power
          </div>
          <div className="text-lg md:text-xl font-bold">
            {car.specs.power}
          </div>
        </div>

        <div className="bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-500">
          <div className="text-xs md:text-sm opacity-70 uppercase tracking-wider mb-1">
            0-60 MPH
          </div>
          <div className="text-lg md:text-xl font-bold">
            {car.specs.acceleration}
          </div>
        </div>

        <div className="bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-500">
          <div className="text-xs md:text-sm opacity-70 uppercase tracking-wider mb-1">
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

export default CarSelection;