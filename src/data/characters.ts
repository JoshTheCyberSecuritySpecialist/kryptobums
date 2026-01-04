import shaniquaImage from '../assets/shaniqua_methhead.png';
import bonnieImage from '../assets/crackhead_bonnie.png';
import bobbyImage from '../assets/crackhead_bobb_y.png';

export interface Character {
  id: string;
  slug: string;
  name: string;
  title: string;
  tagline: string;
  flavorText: string;
  image: string;
  accentColor: 'green' | 'blue' | 'red';
  lore: string[];
  stats: {
    attack: number;
    speed: number;
    defense: number;
  };
  abilities: {
    special: {
      name: string;
      description: string;
      flavor?: string;
    };
    ultimate: {
      name: string;
      description: string;
      flavor?: string;
    };
  };
  playstyle: {
    type: string;
    description: string;
  };
}

export const charactersData: Character[] = [
  {
    id: 'shaniqua',
    slug: 'shaniqua',
    name: 'Super Methhead Shaniqua',
    title: 'The Firebrand',
    tagline: 'Burn it down. Then dance in the ashes.',
    flavorText: 'Raw power. Explosive rage. Zero fear.',
    image: shaniquaImage,
    accentColor: 'red',
    lore: [
      'They called her unstable. They called her dangerous. They called her a lost cause. She proved them all right—and made them regret it.',
      'Shaniqua was never meant to survive. Abandoned by a system that saw her as disposable, she carved out an existence in the forgotten corners of the city where heat meant life and fire meant power. Where others saw destruction, she saw transformation.',
      'The streets forged her into something they never expected—a force of nature wrapped in fury and determination. Every setback became fuel. Every dismissal became kindling. By the time the world noticed her again, it was already burning.',
      'In the arena, she doesn\'t just fight. She erupts. Her opponents don\'t face a person—they face a wildfire with a vendetta. And when the smoke clears, only Shaniqua is left standing, grinning through the ashes.',
    ],
    stats: {
      attack: 95,
      speed: 70,
      defense: 60,
    },
    abilities: {
      special: {
        name: 'Flash Ignition',
        description: 'Unleashes a devastating close-range explosion that damages and knocks back nearby enemies. Creates a brief zone of fire damage.',
        flavor: 'Everything burns. Everyone learns.',
      },
      ultimate: {
        name: 'Ashfall Reign',
        description: 'Summons a meteor storm across the arena, dealing massive area damage and leaving burning zones that persist for several seconds.',
        flavor: 'The sky falls. The ground burns. Nowhere is safe.',
      },
    },
    playstyle: {
      type: 'High-Damage Brawler',
      description: 'Shaniqua thrives in close-quarters chaos. Her explosive power punishes opponents who get too close, and her abilities control space through area denial. She\'s high-risk, high-reward—commit to the fight or get burned trying to escape. Master her timing, and you become an unstoppable force of destruction.',
    },
  },
  {
    id: 'bonnie',
    slug: 'bonnie',
    name: 'Super Crackhead Bonnie',
    title: 'The Voltage Queen',
    tagline: 'Chaos looks better when it smiles back.',
    flavorText: 'Fast hands. Faster strikes. Total control.',
    image: bonnieImage,
    accentColor: 'blue',
    lore: [
      'Bonnie doesn\'t do anything slowly. Not talking. Not moving. Not fighting. The world tried to slow her down—lock her up, medicate her, forget her. It didn\'t work. She became faster.',
      'They mistook her energy for madness. They mistook her speed for recklessness. They were wrong on both counts. Bonnie sees the world in frames others miss—the split-second opening, the moment of hesitation, the instant before impact.',
      'She learned to channel chaos into precision. Every erratic movement is calculated. Every wild strike lands exactly where she wants it. The electricity crackling around her isn\'t just for show—it\'s a reminder that she\'s always one step ahead, always in control, even when she looks out of it.',
      'In the arena, opponents think they can predict her. They think they can keep up. They\'re always wrong. By the time they realize what\'s happening, Bonnie\'s already won—and she\'s smiling the whole time.',
    ],
    stats: {
      attack: 75,
      speed: 95,
      defense: 55,
    },
    abilities: {
      special: {
        name: 'Static Rush',
        description: 'Dashes forward in a lightning-fast strike, passing through enemies and dealing electric damage. Can chain multiple rushes in quick succession.',
        flavor: 'Blink and you miss it. Blink again and you\'re already down.',
      },
      ultimate: {
        name: 'Neon Overload',
        description: 'Supercharges Bonnie\'s entire body with electricity, dramatically increasing movement speed and attack rate while releasing damaging lightning arcs to nearby enemies.',
        flavor: 'When the lights go out, she lights up the arena.',
      },
    },
    playstyle: {
      type: 'Fast Rushdown Fighter',
      description: 'Bonnie is all about relentless speed and overwhelming offense. She excels at closing gaps instantly and maintaining constant pressure. Her mobility makes her hard to pin down, and her electric abilities let her control space while staying aggressive. Master her flow, and opponents never get a chance to breathe.',
    },
  },
  {
    id: 'bobby',
    slug: 'bobby',
    name: 'Super Crackhead Bobby',
    title: 'The Streetstorm',
    tagline: 'They left him nothing. He made it power.',
    flavorText: 'Unpredictable movement. Relentless pressure.',
    image: bobbyImage,
    accentColor: 'green',
    lore: [
      'Bobby never had a plan B. Life took everything from him before he was old enough to understand what losing meant. No family. No home. No safety net. Just the streets and whatever he could make of them.',
      'Where others broke, Bobby adapted. He learned to move like the wind—unpredictable, relentless, impossible to pin down. He learned to fight like a storm—building momentum with every strike, growing stronger the longer the battle raged.',
      'They underestimated him because he had nothing. They didn\'t realize that having nothing meant he had nothing to lose. Every fight became personal. Every victory proved he was more than the world said he was.',
      'In the arena, Bobby doesn\'t follow patterns. He creates chaos and thrives in it. His opponents can\'t predict him because he doesn\'t predict himself. He flows, adapts, and overwhelms. By the time they understand his rhythm, the fight is already over.',
    ],
    stats: {
      attack: 80,
      speed: 85,
      defense: 65,
    },
    abilities: {
      special: {
        name: 'Blackout Frenzy',
        description: 'Enters a heightened state of aggression, increasing attack speed and movement for a short duration. Each successful hit extends the duration.',
        flavor: 'Once he starts, he doesn\'t stop.',
      },
      ultimate: {
        name: 'Streetstorm',
        description: 'Unleashes a devastating flurry of strikes that builds in intensity, culminating in a powerful finishing blow that launches enemies across the arena.',
        flavor: 'The storm doesn\'t ask permission. It just takes over.',
      },
    },
    playstyle: {
      type: 'Relentless Pressure Fighter',
      description: 'Bobby is a momentum-based fighter who gets stronger the longer he stays on the offensive. He excels at maintaining aggression and punishing defensive play. His unpredictable movement patterns make him hard to read, and his ability to extend combos rewards skilled players who can maintain pressure. Keep the storm going, and victory is inevitable.',
    },
  },
];

export const getCharacterBySlug = (slug: string): Character | undefined => {
  return charactersData.find((char) => char.slug === slug);
};
