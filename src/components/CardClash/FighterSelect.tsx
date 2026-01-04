import { charactersData, Character } from '../../data/characters';
import { CharacterCard } from '../Characters/CharacterCard';
import { TutorialHighlight } from './TutorialHighlight';
import { useTutorial } from '../../context/TutorialContext';

interface FighterSelectProps {
  onSelectFighter: (fighter: Character) => void;
}

export const FighterSelect = ({ onSelectFighter }: FighterSelectProps) => {
  const { tutorialState } = useTutorial();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-[#00FF9C] text-4xl font-black uppercase tracking-tight mb-4">
          Choose Your Fighter
        </h2>
        <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto">
          Select your champion for Card Clash. Each fighter brings their own unique style to the battlefield.
        </p>
      </div>

      <TutorialHighlight active={tutorialState.isActive && tutorialState.currentStep === 'fighter-select'}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {charactersData.map(character => (
            <div key={character.id} className="transform transition-all hover:scale-105">
              <CharacterCard
                slug={character.slug}
                image={character.image}
                name={character.name}
                title={character.title}
                tagline={character.tagline}
                flavorText={character.flavorText}
                accentColor={character.accentColor}
              />
              <button
                onClick={() => onSelectFighter(character)}
                className="w-full mt-4 px-6 py-3 bg-[#00FF9C] text-[#14161A] font-black uppercase tracking-wider rounded-lg hover:bg-[#4ADE80] transition-all border-2 border-[#00FF9C] hover:shadow-lg hover:shadow-[#00FF9C]/50"
              >
                Select {character.name}
              </button>
            </div>
          ))}
        </div>
      </TutorialHighlight>
    </div>
  );
};
