import { useState, useEffect } from 'react';

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

  // Stripe animation based on scroll (0-100%)
  const stripeProgress = Math.min(scrollY / heroHeight, 1);
  
  // Each stripe comes in at different times
  const redStripeOffset = Math.max(0, (stripeProgress - 0) * 100); // Starts immediately
  const purpleStripeOffset = Math.max(0, (stripeProgress - 0.15) * 100); // Slight delay
  const blueStripeOffset = Math.max(0, (stripeProgress - 0.3) * 100); // More delay

  // Logo fades in faster and sooner
  const logoOpacity = Math.max(0, Math.min(1, (stripeProgress - 0.3) * 4)); 
  const logoScale = Math.max(0.8, Math.min(1, 0.8 + (stripeProgress - 0.3) * 0.8));

  // Calculate color transition for M letter (after hero scroll is done)
  // NOTE: This color transition will now be applied to the 'EVOLUTION' text,
  // as the M logo itself has its fixed colors.
  const scrollProgress = Math.min(scrollY / (heroHeight * 7), 1); 

  const getStageColors = () => {
    if (scrollProgress < 0.33) {
      return { blue: '#1C69D4', purple: '#B02A8F', red: '#E4002B' };
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
    <section className="h-[500vh] relative"> 
      {/* Sticky container for the hero view */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        {/* Metallic graphite background - BRIGHTER */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800"></div>
        
        {/* Metallic shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gray-500 to-transparent opacity-20"></div>
        
        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Carbon fiber texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              rgba(255,255,255,0.1) 0px,
              transparent 2px,
              transparent 4px,
              rgba(255,255,255,0.1) 6px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(255,255,255,0.1) 0px,
              transparent 2px,
              transparent 4px,
              rgba(255,255,255,0.1) 6px
            )`,
          }}
        />

        {/* Diagonal M Color Stripes - Animated on scroll */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Red stripe - comes first */}
          <div
            className="absolute w-[250%] h-[120%] origin-top-left"
            style={{
              background: 'linear-gradient(to bottom, rgba(228, 0, 43, 0.95), rgba(228, 0, 43, 0.85))',
              transform: `translateX(-40%) translateY(${-150 + redStripeOffset * 1.5}%) rotate(60deg)`,
              top: '0%',
              left: '-25%',
            }}
          />

          {/* Purple stripe - comes second */}
          <div
            className="absolute w-[250%] h-[120%] origin-top-left"
            style={{
              background: 'linear-gradient(to bottom, rgba(176, 42, 143, 0.95), rgba(176, 42, 143, 0.85))',
              transform: `translateX(-40%) translateY(${-150 + purpleStripeOffset * 1.5}%) rotate(60deg)`,
              top: '0%',
              left: '-25%',
            }}
          />

          {/* Blue stripe - comes last */}
          <div
            className="absolute w-[250%] h-[120%] origin-top-left"
            style={{
              background: 'linear-gradient(to bottom, rgba(28, 105, 212, 0.95), rgba(28, 105, 212, 0.85))',
              transform: `translateX(-40%) translateY(${-150 + blueStripeOffset * 1.5}%) rotate(60deg)`,
              top: '0%',
              left: '-25%',
            }}
          />
        </div>

        {/* Content - Fades in after stripes */}
        <div
          className="relative z-10 text-center px-4 max-w-6xl mx-auto transition-all duration-700"
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale}) translateY(${(1 - logoOpacity) * 50}px)`,
          }}
        >
          {/* BMW Roundel Logo */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center">
              <div className="relative w-28 h-28 md:w-36 md:h-36">
                <div className="absolute inset-0 rounded-full border-[6px] border-white shadow-2xl"></div>
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-white"></div>
                  <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#1C69D4]"></div>
                  <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#1C69D4]"></div>
                  <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-white"></div>
                </div>
              </div>
            </div>
          </div>

          {/* M3 Logo (Image) */}
          <div className="mb-8">
            <img 
              src="/bmw-m-logo.png" 
              alt="BMW M3 Logo" 
              className="mx-auto" // Center the image
              style={{
                maxWidth: '600px', // Adjust size as needed
                width: '100%',
                height: 'auto',
                filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.3))',
              }}
            />
          </div>

          {/* EVOLUTION text */}
          <h2 
            className="font-heading text-5xl md:text-8xl tracking-[0.3em] uppercase mb-8 drop-shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${colors.blue}, ${colors.purple}, ${colors.red})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            EVOLUTION
          </h2>

          {/* Subtitle */}
          <p className="font-body text-xl md:text-2xl tracking-widest uppercase font-light text-white drop-shadow-lg">
            Six Generations of M Power
          </p>
        </div>

        {/* Top M stripe */}
        <div
          className="absolute top-0 left-0 w-full h-3 flex z-20"
          style={{ 
            opacity: logoOpacity,
            transform: `translateY(${scrollY * 0.2}px)` 
          }}
        >
          <div className="flex-1" style={{ backgroundColor: colors.blue }} />
          <div className="flex-1" style={{ backgroundColor: colors.purple }} />
          <div className="flex-1" style={{ backgroundColor: colors.red }} />
        </div>

        {/* Bottom M stripe */}
        <div
          className="absolute bottom-0 left-0 w-full h-3 flex z-20"
          style={{ 
            opacity: logoOpacity,
            transform: `translateY(${-scrollY * 0.2}px)` 
          }}
        >
          <div className="flex-1" style={{ backgroundColor: colors.blue }} />
          <div className="flex-1" style={{ backgroundColor: colors.purple }} />
          <div className="flex-1" style={{ backgroundColor: colors.red }} />
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 animate-bounce transition-opacity duration-300"
          style={{ opacity: Math.max(0, 1 - scrollY / 200) }}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-7 h-11 border-2 border-white rounded-full p-1.5 flex justify-center">
              <div className="w-1.5 h-3 bg-white rounded-full animate-pulse" />
            </div>
            <span className="font-tech text-xs text-white uppercase tracking-[0.2em]">Scroll</span>
          </div>
        </div>
      </div>
    </section>
  );
}

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