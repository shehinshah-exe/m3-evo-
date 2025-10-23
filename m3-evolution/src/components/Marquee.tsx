interface MarqueeProps {
  text: string;
  reverse?: boolean;
}

function Marquee({ text, reverse = false }: MarqueeProps) {
  const marqueeText = `${text} • ${text} • ${text} • ${text} • ${text} • ${text} • ${text} • ${text}`;

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-m-blue via-m-purple to-m-red py-6">
      <div
        className={`flex whitespace-nowrap ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ width: 'fit-content' }}
      >
        <span className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white px-4">
          {marqueeText}
        </span>
        <span className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white px-4">
          {marqueeText}
        </span>
      </div>

      {/* M badge dots scattered */}
      <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-m-blue rounded-full transform -translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-m-purple rounded-full transform -translate-y-1/2" />
      <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-m-red rounded-full transform -translate-y-1/2" />
    </div>
  );
}

export default Marquee;
