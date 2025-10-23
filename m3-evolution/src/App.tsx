import Hero from './components/Hero';
import CarSection from './components/CarSection';
import Marquee from './components/Marquee';
import { cars } from './data/cars';

function App() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Hero />

      <Marquee text="M POWER • PRECISION ENGINEERING • MOTORSPORT HERITAGE" />

      {cars.map((car, index) => (
        <CarSection key={car.model} car={car} index={index} />
      ))}

      <Marquee text="PERFORMANCE • INNOVATION • EVOLUTION" reverse />

      {/* Footer */}
      <footer className="bg-black py-12 text-center border-t-2 border-gray-900">
        <div className="flex justify-center gap-1 mb-4">
          <div className="w-16 h-1.5 bg-m-blue transform -skew-x-12" />
          <div className="w-16 h-1.5 bg-m-purple transform -skew-x-12" />
          <div className="w-16 h-1.5 bg-m-red transform -skew-x-12" />
        </div>
        <p className="text-bmw-silver text-sm tracking-widest uppercase">
          Six Generations. One Legacy.
        </p>
        <p className="text-gray-600 text-xs mt-2">BMW M3 Evolution • 1986 - Present</p>
      </footer>
    </div>
  );
}

export default App;