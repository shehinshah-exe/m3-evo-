interface MarqueeProps {
  text: string;
  reverse?: boolean;
}

function Marquee({ text, reverse = false }: MarqueeProps) {
  const animationStyle = {
    animation: reverse 
      ? 'marqueeReverse 40s linear infinite' 
      : 'marquee 40s linear infinite',
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-m-blue via-m-purple to-m-red py-6">
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0%); }
          }
          
          @keyframes marqueeReverse {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
      
      <div className="flex">
        <div
          className="flex whitespace-nowrap"
          style={animationStyle}
        >
          <span className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white px-4">
            {text} • {text} • {text} • {text} • {text} • {text} • {text} • {text}
          </span>
          <span className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white px-4">
            {text} • {text} • {text} • {text} • {text} • {text} • {text} • {text}
          </span>
        </div>
      </div>

      {/* M badge dots scattered */}
      <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-m-blue rounded-full transform -translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-m-purple rounded-full transform -translate-y-1/2" />
      <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-m-red rounded-full transform -translate-y-1/2" />
    </div>
  );
}

export default Marquee;