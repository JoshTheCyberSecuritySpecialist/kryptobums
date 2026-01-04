import { Section } from '../components/UI/Section';
import { CharacterCard } from '../components/Characters/CharacterCard';
import { charactersData } from '../data/characters';

export const Characters = () => {
  return (
    <>
      <Section
        title="Street Legends"
        subtitle="Meet the forgotten warriors who became something more"
      >
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-[#E5E7EB] text-lg leading-relaxed mb-4">
            The fighters of KryptoBums weren't chosen. They were forgotten.
          </p>
          <p className="text-[#E5E7EB] text-lg leading-relaxed mb-4">
            Each character is a myth born from the streets — shaped by chaos, hardened by survival, and transformed into something dangerous.
          </p>
          <p className="text-[#00FF9C] text-xl font-bold">
            These are not victims. They are survivors who transcended the streets and became legends.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        <div className="text-center mt-12">
          <p className="text-[#9CA3AF] text-sm">
            More fighters coming in future phases. Each with their own story, style, and path to the arena.
          </p>
        </div>
      </Section>
    </>
  );
};
