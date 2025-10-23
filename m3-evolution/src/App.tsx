import Hero from './components/Hero';
import CarSection from './components/CarSelection';
import { cars } from './data/cars';

function App() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Hero />
      
      {cars.map((car, index) => (
        <CarSection key={car.model} car={car} index={index} />
      ))}
    </div>
  );
}

export default App;