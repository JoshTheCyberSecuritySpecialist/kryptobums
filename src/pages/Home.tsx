import { Link } from 'react-router-dom';
import { Section } from '../components/UI/Section';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { CharactersPreview } from '../components/Characters/CharactersPreview';
import { Swords, Target, Shield, Zap, Users, TrendingUp } from 'lucide-react';

export const Home = () => {
  return (
    <>
      <Section className="min-h-[70vh] flex items-center justify-center text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-[#00FF9C] mb-6 text-5xl md:text-7xl font-black tracking-tight">
            KRYPTOBUMS
          </h1>
          <p className="text-[#00FF9C] text-2xl md:text-3xl font-bold mb-6 uppercase tracking-wide">
            Forgotten. Unbreakable. Unstoppable.
          </p>
          <p className="text-[#E5E7EB] text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
            A Smash Bros–style arena fighter where forgotten street legends battle for survival, dominance, and respect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/characters">
              <Button variant="primary">View Characters</Button>
            </Link>
            <Link to="/waitlist">
              <Button variant="secondary">Join the Waitlist</Button>
            </Link>
          </div>
        </div>
      </Section>

      <Section title="What Is KryptoBums?" className="bg-[#14161A]/50">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#E5E7EB] text-lg mb-6 leading-relaxed text-center">
            KryptoBums is a fast-paced arena fighting game inspired by classic Smash Bros–style combat.
          </p>
          <p className="text-[#E5E7EB] text-lg mb-6 leading-relaxed text-center">
            Players choose from a roster of forgotten street legends — survivors who were ignored, underestimated, and left behind — and throw them into chaotic, close-quarters arenas.
          </p>
          <p className="text-[#00FF9C] text-xl font-bold mb-8 text-center">
            Victory isn't about money. It's about skill, timing, and adaptability.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            <Card accentColor="green">
              <div className="flex items-start gap-3">
                <Swords className="w-6 h-6 text-[#00FF9C] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-1">Smash-Style Arena Combat</h4>
                  <p className="text-[#9CA3AF]">Fast, fluid, and chaotic battles in tight arenas</p>
                </div>
              </div>
            </Card>
            <Card accentColor="blue">
              <div className="flex items-start gap-3">
                <Users className="w-6 h-6 text-[#3B82F6] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-1">Unique Characters</h4>
                  <p className="text-[#9CA3AF]">Signature abilities and distinct fighting styles</p>
                </div>
              </div>
            </Card>
            <Card accentColor="green">
              <div className="flex items-start gap-3">
                <Zap className="w-6 h-6 text-[#00FF9C] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-1">Fast Matches</h4>
                  <p className="text-[#9CA3AF]">Designed for replayability and competitive intensity</p>
                </div>
              </div>
            </Card>
            <Card accentColor="blue">
              <div className="flex items-start gap-3">
                <Target className="w-6 h-6 text-[#3B82F6] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-1">Skill-Based Progression</h4>
                  <p className="text-[#9CA3AF]">Master the mechanics, climb the ranks</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      <CharactersPreview />

      <Section title="Why KryptoBums Is Different" className="bg-[#14161A]/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card accentColor="green">
              <div className="flex items-start gap-3">
                <Shield className="w-8 h-8 text-[#00FF9C] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-xl mb-2">No Pay-to-Win Mechanics</h4>
                  <p className="text-[#9CA3AF]">Your wallet doesn't determine your strength in the arena</p>
                </div>
              </div>
            </Card>
            <Card accentColor="blue">
              <div className="flex items-start gap-3">
                <Target className="w-8 h-8 text-[#3B82F6] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-xl mb-2">Skill Determines Outcomes</h4>
                  <p className="text-[#9CA3AF]">Master timing, positioning, and combos to dominate</p>
                </div>
              </div>
            </Card>
            <Card accentColor="green">
              <div className="flex items-start gap-3">
                <Users className="w-8 h-8 text-[#00FF9C] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-xl mb-2">Balanced Roster</h4>
                  <p className="text-[#9CA3AF]">Characters are powerful but fair—no broken builds</p>
                </div>
              </div>
            </Card>
            <Card accentColor="blue">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-8 h-8 text-[#3B82F6] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-xl mb-2">Rewards Mastery</h4>
                  <p className="text-[#9CA3AF]">Built to reward dedication, strategy, and improvement</p>
                </div>
              </div>
            </Card>
          </div>
          <p className="text-[#00FF9C] text-2xl font-bold text-center">
            If you win, you earned it.
          </p>
        </div>
      </Section>

      <Section title="Phase 1 Is Just the Beginning">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#E5E7EB] text-lg mb-6 leading-relaxed">
            Phase 1 introduces the core arena, the first fighters, and the foundation of progression.
          </p>
          <p className="text-[#E5E7EB] text-lg mb-6 leading-relaxed">
            Future phases expand characters, arenas, events, and competitive systems — without compromising fairness.
          </p>
        </div>
      </Section>

      <Section className="bg-[#14161A]/50 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[#00FF9C] text-4xl md:text-5xl font-black mb-4">
            Step Into the Arena.
          </h2>
          <p className="text-[#E5E7EB] text-xl mb-10">
            Join early and witness the rise of the forgotten.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/waitlist">
              <Button variant="primary">Join the Waitlist</Button>
            </Link>
            <Link to="/characters">
              <Button variant="secondary">View Characters</Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
};
