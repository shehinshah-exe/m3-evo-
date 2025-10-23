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

  // Different parallax speeds for layers
  const bgParallax = scrollY * 0.5;
  const midParallax = scrollY * 0.7;
  const foregroundParallax = scrollY * 0.3;

  // Calculate color transition based on scroll
  const scrollProgress = Math.min(scrollY / (heroHeight * 2), 1);

  const getStageColors = () => {
    if (scrollProgress < 0.33) {
      return {
        blue: '#1C69D4',
        purple: '#B02A8F',
        red: '#E4002B'
      };
    } else if (scrollProgress < 0.66) {
      const progress = (scrollProgress - 0.33) / 0.33;
      return {
        blue: interpolateColor('#1C69D4', '#A8A8A8', progress),
        purple: interpolateColor('#B02A8F', '#C0C0C0', progress),
        red: interpolateColor('#E4002B', '#B8B8B8', progress)
      };
    } else {
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
      {/* Animated background gradient - slowest parallax */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-900"
        style={{
          transform: `translateY(${bgParallax}px)`,
        }}
      />

      {/* Grid pattern overlay for depth */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px',
          transform: `translateY(${bgParallax * 0.3}px)`,
        }}
      />

      {/* M stripe pattern background - evolving colors */}
      <div
        className="absolute top-0 left-0 w-full h-2 flex transition-colors duration-300"
        style={{
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      >
        <div className="flex-1" style={{ backgroundColor: colors.blue }} />
        <div className="flex-1" style={{ backgroundColor: colors.purple }} />
        <div className="flex-1" style={{ backgroundColor: colors.red }} />
      </div>

      <div
        className="absolute bottom-0 left-0 w-full h-2 flex transition-colors duration-300"
        style={{
          transform: `translateY(${-scrollY * 0.2}px)`,
        }}
      >
        <div className="flex-1" style={{ backgroundColor: colors.blue }} />
        <div className="flex-1" style={{ backgroundColor: colors.purple }} />
        <div className="flex-1" style={{ backgroundColor: colors.red }} />
      </div>

      {/* Parallax car images - multiple layers */}
      <div className="absolute inset-0 z-0">
        {/* Background layer - slowest */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
            opacity: heroOpacity * 0.15,
          }}
        >
          <img
            src={cars[0].image}
            alt={cars[0].model}
            className="absolute top-1/2 left-1/2 w-full max-w-6xl transform -translate-x-1/2 -translate-y-1/2 scale-125 blur-sm"
          />
        </div>

        {/* Mid-background layer */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translateY(${scrollY * 0.35}px)`,
            opacity: heroOpacity * 0.25,
          }}
        >
          <img
            src={cars[2].image}
            alt={cars[2].model}
            className="absolute top-1/2 left-1/2 w-4/5 max-w-5xl transform -translate-x-1/2 -translate-y-1/2 scale-110"
          />
        </div>

        {/* Foreground layer - fastest */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0002})`,
            opacity: heroOpacity * 0.3,
          }}
        >
          <img
            src={cars[5].image}
            alt={cars[5].model}
            className="absolute top-1/2 left-1/2 w-4/5 max-w-4xl transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>

      {/* Floating M-colored particles/glows with parallax */}
      <div
        className="absolute top-1/4 left-0 w-96 h-96 rounded-full filter blur-3xl opacity-10 transition-all duration-300"
        style={{
          backgroundColor: colors.blue,
          transform: `translate(${scrollY * 0.15}px, ${scrollY * 0.25}px)`,
        }}
      />
      <div
        className="absolute top-1/4 right-0 w-96 h-96 rounded-full filter blur-3xl opacity-10 transition-all duration-300"
        style={{
          backgroundColor: colors.red,
          transform: `translate(${-scrollY * 0.15}px, ${scrollY * 0.3}px)`,
        }}
      />
      <div
        className="absolute bottom-1/4 left-1/2 w-96 h-96 rounded-full filter blur-3xl opacity-10 transition-all duration-300"
        style={{
          backgroundColor: colors.purple,
          transform: `translate(-50%, ${scrollY * 0.2}px)`,
        }}
      />

      {/* Diagonal M-stripe accent lines with parallax */}
      <div
        className="absolute top-1/3 -left-48 w-96 h-1 transform -rotate-45"
        style={{
          background: `linear-gradient(90deg, transparent, ${colors.blue}, transparent)`,
          transform: `rotate(-45deg) translateX(${scrollY * 0.4}px)`,
          opacity: heroOpacity * 0.3,
        }}
      />
      <div
        className="absolute top-2/3 -right-48 w-96 h-1 transform rotate-45"
        style={{
          background: `linear-gradient(90deg, transparent, ${colors.red}, transparent)`,
          transform: `rotate(45deg) translateX(${-scrollY * 0.4}px)`,
          opacity: heroOpacity * 0.3,
        }}
      />

      {/* Title with parallax - moves slower than scroll */}
      <div
        className="relative z-10 text-center px-4"
        style={{
          opacity: heroOpacity,
          transform: `translateY(${scrollY * 0.4}px)`,
        }}
      >
        {/* M badge inspired top accent - with parallax */}
        <div
          className="flex items-center justify-center gap-1 mb-8"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          <div
            className="w-16 h-1.5 transform -skew-x-12 transition-all duration-300"
            style={{
              backgroundColor: colors.blue,
              width: `${64 - scrollY * 0.05}px`,
            }}
          />
          <div
            className="w-16 h-1.5 transform -skew-x-12 transition-all duration-300"
            style={{
              backgroundColor: colors.purple,
              width: `${64 - scrollY * 0.05}px`,
            }}
          />
          <div
            className="w-16 h-1.5 transform -skew-x-12 transition-all duration-300"
            style={{
              backgroundColor: colors.red,
              width: `${64 - scrollY * 0.05}px`,
            }}
          />
        </div>

        {/* BMW M style logo - subtle parallax */}
        <div
          className="mb-6"
          style={{
            transform: `translateY(${scrollY * 0.35}px) scale(${1 - scrollY * 0.0005})`,
          }}
        >
          <span className="text-6xl md:text-8xl font-black tracking-tighter text-white">
            BMW
          </span>
        </div>

        {/* M3 Title - hero element with dramatic parallax */}
        <h1
          className="text-8xl md:text-[12rem] font-black tracking-tighter leading-none mb-4"
          style={{
            transform: `translateY(${scrollY * 0.25}px) scale(${1 + scrollY * 0.0003})`,
          }}
        >
          <span
            className="transition-all duration-300"
            style={{
              background: `linear-gradient(90deg, ${colors.blue}, ${colors.purple}, ${colors.red})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            M3
          </span>
        </h1>

        {/* EVOLUTION text */}
        <h2
          className="text-4xl md:text-6xl font-black tracking-wider uppercase text-white mb-4"
          style={{
            transform: `translateY(${scrollY * 0.45}px)`,
          }}
        >
          EVOLUTION
        </h2>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl tracking-widest uppercase font-bold text-bmw-silver"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          Six Generations of M Power
        </p>

        {/* M badge inspired bottom accent */}
        <div
          className="flex items-center justify-center gap-1 mt-8"
          style={{
            transform: `translateY(${scrollY * 0.55}px)`,
          }}
        >
          <div
            className="w-16 h-1.5 transform -skew-x-12 transition-all duration-300"
            style={{
              backgroundColor: colors.blue,
              width: `${64 - scrollY * 0.05}px`,
            }}
          />
          <div
            className="w-16 h-1.5 transform -skew-x-12 transition-all duration-300"
            style={{
              backgroundColor: colors.purple,
              width: `${64 - scrollY * 0.05}px`,
            }}
          />
          <div
            className="w-16 h-1.5 transform -skew-x-12 transition-all duration-300"
            style={{
              backgroundColor: colors.red,
              width: `${64 - scrollY * 0.05}px`,
            }}
          />
        </div>
      </div>

      {/* Scroll indicator with bounce animation */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce"
        style={{ opacity: Math.max(0, 1 - scrollY / 100) }}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-10 border-2 border-bmw-silver rounded-full p-1">
            <div className="w-1 h-3 bg-bmw-silver rounded-full mx-auto animate-pulse" />
          </div>
          <span className="text-xs text-bmw-silver uppercase tracking-wider">Scroll</span>
        </div>
      </div>
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
