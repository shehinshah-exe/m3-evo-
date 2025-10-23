export interface CarSpecs {
  engine: string;
  power: string;
  acceleration: string;
  weight: string;
}

export interface Car {
  model: string;
  year: string;
  description: string;
  image: string;
  modelPath?: string;
  scale?: number; 
  position?: [number, number, number]; 
  specs: CarSpecs;
}

export const cars: Car[] = [
  {
    model: 'E30 M3',
    year: '1986 - 1991',
    description: 'The legend that started it all. Born from motorsport, the E30 M3 was designed to dominate touring car racing and became an icon of automotive engineering.',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&q=80',
    modelPath: '/models/e30.glb', 
    specs: {
      engine: '2.3L I4',
      power: '200 HP',
      acceleration: '6.5s',
      weight: '2,866 lbs'
    }
  },
  {
    model: 'E36 M3',
    year: '1992 - 1999',
    description: 'The evolution. More refined, more powerful, and more accessible. The E36 brought M3 performance to a wider audience while maintaining its racing pedigree.',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
    modelPath: '/models/e36.glb', 
    scale: 0.5, 
    position: [0, -1, 0], 
    specs: {
      engine: '3.2L I6',
      power: '240 HP',
      acceleration: '5.5s',
      weight: '3,219 lbs'
    }
  },
  {
    model: 'E46 M3',
    year: '2000 - 2006',
    description: 'The naturally aspirated king. With its screaming inline-six and perfect balance, many consider the E46 M3 the purest driving experience in M3 history.',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80',
    modelPath: '/models/e46.glb', 
    specs: {
      engine: '3.2L I6',
      power: '333 HP',
      acceleration: '4.8s',
      weight: '3,415 lbs'
    }
  },
  {
    model: 'E92 M3',
    year: '2007 - 2013',
    description: 'The V8 beast. BMW went bold with a high-revving V8, creating a soundtrack and driving experience that defined a generation of performance cars.',
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&q=80',
    modelPath: '/models/e92.glb', 
    scale: 1.5, // <-- ADDED
    position: [0, -1, 0], // <-- ADDED
    specs: {
      engine: '4.0L V8',
      power: '414 HP',
      acceleration: '4.3s',
      weight: '3,704 lbs'
    }
  },
  {
    model: 'F80 M3',
    year: '2014 - 2020',
    description: 'The turbo era begins. Twin turbos brought massive torque and efficiency, pushing the M3 into a new realm of performance while maintaining its aggressive character.',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
    modelPath: '/models/f80.glb', 
    scale: 1.5, // <-- ADDED
    position: [0, -1, 0], // <-- ADDED
    specs: {
      engine: '3.0L I6 Twin-Turbo',
      power: '425 HP',
      acceleration: '3.9s',
      weight: '3,530 lbs'
    }
  },
  {
    model: 'G80 M3',
    year: '2021 - Present',
    description: 'The controversial new face. Bold design meets cutting-edge technology. The most powerful, most advanced M3 ever built continues to push boundaries.',
    image: 'https://images.unsplash.com/photo-1617531653520-bd788a235e2d?w=800&q=80',
    specs: {
      engine: '3.0L I6 Twin-Turbo',
      power: '503 HP',
      acceleration: '3.4s',
      weight: '3,840 lbs'
    }
  }
];