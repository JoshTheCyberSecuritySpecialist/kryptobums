import { Section } from '../components/UI/Section';

export const Leaderboard = () => {
  return (
    <Section
      title="Global Leaderboard"
      subtitle="Who rules the arena?"
    >
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-[#E5E7EB] text-lg leading-relaxed">
          This is the Leaderboard page for KryptoBums. Here, players will see global rankings,
          top fighters, win rates, and competitive statistics. Climb the ladder and prove
          yourself against the best.
        </p>
        <p className="text-[#9CA3AF] mt-6">
          Leaderboard system and competitive rankings coming soon.
        </p>
      </div>
    </Section>
  );
};
