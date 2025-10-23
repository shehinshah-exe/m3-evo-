import { useState, useEffect } from 'react';
import { cars } from '../data/cars';

function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  const heroOpacity = Math.max(0, 1 - scrollY / heroHeight);
  
  // Calculate color transition based on scroll
  // 0-33%: Full color
  // 33-66%: Transition to silver
  // 66-100%: Transition to white
  const scrollProgress = Math.min(scrollY / (heroHeight * 2), 1);
  
  const getStageColors = () => {
    if (scrollProgress < 0.33) {
      // Stage 1: Full M colors
      return {
        blue: '#1C69D4',
        purple: '#B02A8F',
        red: '#E4002B'
      };
    } else if (scrollProgress < 0.66) {
      // Stage 2: Transition to silver/chrome
      const progress = (scrollProgress - 0.33) / 0.33;
      return {
        blue: interpolateColor('#1C69D4', '#A8A8A8', progress),
        purple: interpolateColor('#B02A8F', '#C0C0C0', progress),
        red: interpolateColor('#E4002B', '#B8B8B8', progress)
      };
    } else {
      // Stage 3: Transition to white
      const progress = (scrollProgress - 0.66) / 0.34;
      return {
        blue: interpolateColor('#A8A8A8', '#FFFFFF', progress),
        purple: interpolateColor('#C0C0C0', '#FFFFFF', progress),
        red: interpolateColor('#B8B8B8', '#FFFFFF', progress)
      };
    }
  };

  const colors = getStageColors();

  return (
    <section className="h-screen relative flex items-center justify-center overflow-hidden bg-black">
      {/* M-colored gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-900" />
      
      {/* M stripe pattern background - evolving colors */}
      <div 
        className="absolute top-0 left-0 w-full h-2 flex transition-colors duration-300"
      >
        <div className="flex-1" style={{ backgroundColor: colors.blue }} />
        <div className="flex-1" style={{ backgroundColor: colors.purple }} />
        <div className="flex-1" style={{ backgroundColor: colors.red }} />
      </div>
      
      <div 
        className="absolute bottom-0 left-0 w-full h-2 flex transition-colors duration-300"
      >
        <div className="flex-1" style={{ backgroundColor: colors.blue }} />
        <div className="flex-1" style={{ backgroundColor: colors.purple }} />
        <div className="flex-1" style={{ backgroundColor: colors.red }} />
      </div>

      {/* Parallax car images */}
      <div 
        className="absolute inset-0 z-0"
        style={{ opacity: heroOpacity }}
      >
        {cars.map((car, index) => (
          <img
            key={index}
            src={car.image}
            alt={car.model}
            className="absolute top-1/2 left-1/2 w-4/5 max-w-4xl opacity-20"
            style={{
              transform: `translate(-50%, -50%) translateY(${scrollY * (index + 1) * 0.15}px) scale(${1 - index * 0.05})`,
              zIndex: cars.length - index
            }}
          />
        ))}
      </div>

      {/* Title with evolving M badge */}
      <div className="relative z-10 text-center px-4" style={{ opacity: heroOpacity }}>
        {/* M badge inspired top accent - evolving */}
        <div className="flex items-center justify-center gap-1 mb-8">
          <div 
            className="w-16 h-1.5 transform -skew-x-12 transition-colors duration-300"
            style={{ backgroundColor: colors.blue }}
          />
          <div 
            className="w-16 h-1.5 transform -skew-x-12 transition-colors duration-300"
            style={{ backgroundColor: colors.purple }}
          />
          <div 
            className="w-16 h-1.5 transform -skew-x-12 transition-colors duration-300"
            style={{ backgroundColor: colors.red }}
          />
        </div>
        
        {/* BMW M style logo */}
        <div className="mb-6">
          <span className="text-6xl md:text-8xl font-black tracking-tighter text-white">
            BMW
          </span>
        </div>

        <h1 className="text-8xl md:text-[12rem] font-black tracking-tighter leading-none mb-4">
          <span 
            className="transition-all duration-300"
            style={{
              background: `linear-gradient(90deg, ${colors.blue}, ${colors.purple}, ${colors.red})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            M3
          </span>
        </h1>
        
        <h2 className="text-4xl md:text-6xl font-black tracking-wider uppercase text-white mb-4">
          EVOLUTION
        </h2>
        
        <p className="text-lg md:text-xl tracking-widest uppercase font-bold text-bmw-silver">
          Six Generations of M Power
        </p>

        {/* M badge inspired bottom accent - evolving */}
        <div className="flex items-center justify-center gap-1 mt-8">
          <div 
            className="w-16 h-1.5 transform -skew-x-12 transition-colors duration-300"
            style={{ backgroundColor: colors.blue }}
          />
          <div 
            className="w-16 h-1.5 transform -skew-x-12 transition-colors duration-300"
            style={{ backgroundColor: colors.purple }}
          />
          <div 
            className="w-16 h-1.5 transform -skew-x-12 transition-colors duration-300"
            style={{ backgroundColor: colors.red }}
          />
        </div>
      </div>

      {/* M-colored ambient glows - also evolving */}
      <div 
        className="absolute top-1/4 left-0 w-96 h-96 rounded-full filter blur-3xl opacity-10 transition-colors duration-300"
        style={{ backgroundColor: colors.blue }}
      />
      <div 
        className="absolute top-1/4 right-0 w-96 h-96 rounded-full filter blur-3xl opacity-10 transition-colors duration-300"
        style={{ backgroundColor: colors.red }}
      />
      <div 
        className="absolute bottom-1/4 left-1/2 w-96 h-96 rounded-full filter blur-3xl opacity-10 transition-colors duration-300"
        style={{ backgroundColor: colors.purple }}
      />
    </section>
  );
}

// Helper function to interpolate between two hex colors
function interpolateColor(color1: string, color2: string, factor: number): string {
  const c1 = parseInt(color1.slice(1), 16);
  const c2 = parseInt(color2.slice(1), 16);
  
  const r1 = (c1 >> 16) & 0xff;
  const g1 = (c1 >> 8) & 0xff;
  const b1 = c1 & 0xff;
  
  const r2 = (c2 >> 16) & 0xff;
  const g2 = (c2 >> 8) & 0xff;
  const b2 = c2 & 0xff;
  
  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);
  
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export default Hero;