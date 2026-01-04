import { useParams, Link, Navigate } from 'react-router-dom';
import { Section } from '../components/UI/Section';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { getCharacterBySlug } from '../data/characters';
import { Flame, Zap, Shield, ArrowLeft } from 'lucide-react';

export const CharacterDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const character = slug ? getCharacterBySlug(slug) : undefined;

  if (!character) {
    return <Navigate to="/characters" replace />;
  }

  const statIcons = {
    attack: Flame,
    speed: Zap,
    defense: Shield,
  };

  const statColors = {
    green: 'bg-[#00FF9C]',
    blue: 'bg-[#3B82F6]',
    red: 'bg-[#FF3B3B]',
  };

  return (
    <>
      <Section className="pt-8 pb-16">
        <Link to="/characters" className="inline-flex items-center gap-2 text-[#00FF9C] hover:text-[#00FF9C]/80 transition-colors mb-8">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-bold uppercase tracking-wider text-sm">Back to Characters</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative">
            <div className={`absolute inset-0 ${statColors[character.accentColor]} opacity-20 blur-3xl rounded-lg`} />
            <img
              src={character.image}
              alt={character.name}
              className="relative w-full rounded-lg"
            />
          </div>

          <div>
            <h1 className={`text-5xl md:text-6xl font-black mb-3 uppercase tracking-tight ${
              character.accentColor === 'green' ? 'text-[#00FF9C]' :
              character.accentColor === 'blue' ? 'text-[#3B82F6]' :
              'text-[#FF3B3B]'
            }`}>
              {character.name}
            </h1>
            <p className="text-[#9CA3AF] text-xl uppercase tracking-wider font-bold mb-4">
              {character.title}
            </p>
            <p className="text-[#E5E7EB] text-2xl font-bold italic mb-8">
              "{character.tagline}"
            </p>
            <p className="text-[#9CA3AF] text-lg">
              {character.flavorText}
            </p>
          </div>
        </div>
      </Section>

      <Section title="Origin Story" className="bg-[#14161A]/50">
        <div className="max-w-4xl mx-auto space-y-6">
          {character.lore.map((paragraph, index) => (
            <p key={index} className="text-[#E5E7EB] text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      <Section title="Combat Profile">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(character.stats).map(([stat, value]) => {
              const Icon = statIcons[stat as keyof typeof statIcons];
              return (
                <Card key={stat} accentColor={character.accentColor}>
                  <div className="text-center">
                    <Icon className={`w-10 h-10 mx-auto mb-4 ${
                      character.accentColor === 'green' ? 'text-[#00FF9C]' :
                      character.accentColor === 'blue' ? 'text-[#3B82F6]' :
                      'text-[#FF3B3B]'
                    }`} />
                    <h3 className="text-xl font-bold uppercase mb-4 tracking-wide">
                      {stat}
                    </h3>
                    <div className="w-full bg-[#0B0D10] rounded-full h-3 mb-2">
                      <div
                        className={`h-3 rounded-full ${statColors[character.accentColor]} transition-all duration-1000`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <p className="text-[#9CA3AF] text-sm font-bold">
                      {value > 85 ? 'EXCEPTIONAL' : value > 70 ? 'HIGH' : value > 55 ? 'MODERATE' : 'BALANCED'}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </Section>

      <Section title="Signature Abilities" className="bg-[#14161A]/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card accentColor={character.accentColor}>
              <div className="mb-4">
                <span className="text-xs uppercase tracking-wider font-bold text-[#9CA3AF]">
                  Special Ability
                </span>
              </div>
              <h3 className={`text-2xl font-black uppercase mb-4 ${
                character.accentColor === 'green' ? 'text-[#00FF9C]' :
                character.accentColor === 'blue' ? 'text-[#3B82F6]' :
                'text-[#FF3B3B]'
              }`}>
                {character.abilities.special.name}
              </h3>
              <p className="text-[#E5E7EB] mb-4 leading-relaxed">
                {character.abilities.special.description}
              </p>
              {character.abilities.special.flavor && (
                <p className="text-[#9CA3AF] italic text-sm border-l-2 border-[#00FF9C] pl-4">
                  {character.abilities.special.flavor}
                </p>
              )}
            </Card>

            <Card accentColor={character.accentColor}>
              <div className="mb-4">
                <span className="text-xs uppercase tracking-wider font-bold text-[#9CA3AF]">
                  Ultimate Ability
                </span>
              </div>
              <h3 className={`text-2xl font-black uppercase mb-4 ${
                character.accentColor === 'green' ? 'text-[#00FF9C]' :
                character.accentColor === 'blue' ? 'text-[#3B82F6]' :
                'text-[#FF3B3B]'
              }`}>
                {character.abilities.ultimate.name}
              </h3>
              <p className="text-[#E5E7EB] mb-4 leading-relaxed">
                {character.abilities.ultimate.description}
              </p>
              {character.abilities.ultimate.flavor && (
                <p className="text-[#9CA3AF] italic text-sm border-l-2 border-[#FF3B3B] pl-4">
                  {character.abilities.ultimate.flavor}
                </p>
              )}
            </Card>
          </div>
        </div>
      </Section>

      <Section title="How They Fight">
        <div className="max-w-3xl mx-auto">
          <Card accentColor={character.accentColor}>
            <h3 className={`text-xl font-black uppercase mb-4 tracking-wide ${
              character.accentColor === 'green' ? 'text-[#00FF9C]' :
              character.accentColor === 'blue' ? 'text-[#3B82F6]' :
              'text-[#FF3B3B]'
            }`}>
              {character.playstyle.type}
            </h3>
            <p className="text-[#E5E7EB] text-lg leading-relaxed">
              {character.playstyle.description}
            </p>
          </Card>
        </div>
      </Section>

      <Section className="bg-[#14161A]/50 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[#E5E7EB] text-lg mb-8">
            Ready to master {character.name.split(' ').pop()}?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/characters">
              <Button variant="secondary">Back to Characters</Button>
            </Link>
            <Link to="/waitlist">
              <Button variant="primary">Join the Waitlist</Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
};
