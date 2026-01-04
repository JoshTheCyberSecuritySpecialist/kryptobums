import { Link } from 'react-router-dom';
import { Section } from '../UI/Section';
import { Button } from '../UI/Button';
import { CharacterCard } from './CharacterCard';
import { charactersData } from '../../data/characters';

export const CharactersPreview = () => {
  return (
    <>
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-[#00FF9C] text-4xl md:text-5xl font-black mb-4 uppercase">
            The Forgotten Legends
          </h2>
          <p className="text-[#E5E7EB] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            They were ignored by the world. Now the world can't ignore them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {charactersData.map((character) => (
            <CharacterCard
              key={character.id}
              slug={character.slug}
              image={character.image}
              name={character.name}
              title={character.title}
              tagline={character.tagline}
              flavorText={character.flavorText}
              accentColor={character.accentColor}
            />
          ))}
        </div>

        <div className="text-center">
          <p className="text-[#E5E7EB] text-lg mb-6 leading-relaxed">
            Each legend has a story. Each story ends in the arena.
          </p>
          <Link to="/characters">
            <Button variant="primary">Meet the Fighters</Button>
          </Link>
        </div>
      </Section>
    </>
  );
};
