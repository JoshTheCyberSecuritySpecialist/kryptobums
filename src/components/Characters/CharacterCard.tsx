import { Link } from 'react-router-dom';
import { Button } from '../UI/Button';

interface CharacterCardProps {
  slug: string;
  image: string;
  name: string;
  title: string;
  tagline: string;
  flavorText: string;
  accentColor?: 'green' | 'blue' | 'red';
}

export const CharacterCard = ({
  slug,
  image,
  name,
  title,
  tagline,
  flavorText,
  accentColor = 'green',
}: CharacterCardProps) => {
  const accentColors = {
    green: 'border-[#00FF9C] hover:shadow-[0_0_30px_rgba(0,255,156,0.4)]',
    blue: 'border-[#3B82F6] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]',
    red: 'border-[#FF3B3B] hover:shadow-[0_0_30px_rgba(255,59,59,0.4)]',
  };

  const nameColors = {
    green: 'text-[#00FF9C]',
    blue: 'text-[#3B82F6]',
    red: 'text-[#FF3B3B]',
  };

  return (
    <div
      className={`
        bg-[#14161A] border-2 ${accentColors[accentColor]}
        rounded-lg overflow-hidden
        transition-all duration-300
        hover:scale-105 hover:-translate-y-2
        group cursor-pointer
      `}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14161A] via-[#14161A]/60 to-transparent" />
      </div>

      <div className="p-6">
        <h3 className={`text-2xl md:text-3xl font-black mb-1 uppercase tracking-tight ${nameColors[accentColor]}`}>
          {name}
        </h3>
        <p className="text-[#9CA3AF] text-sm uppercase tracking-wider font-bold mb-4">
          {title}
        </p>

        <p className="text-[#E5E7EB] text-lg font-bold mb-3 italic">
          "{tagline}"
        </p>

        <p className="text-[#9CA3AF] text-sm mb-6 leading-relaxed">
          {flavorText}
        </p>

        <Link to={`/characters/${slug}`}>
          <Button variant="primary" className="w-full">
            View Fighter
          </Button>
        </Link>
      </div>
    </div>
  );
};
