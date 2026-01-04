import { Section } from '../components/UI/Section';
import { Card } from '../components/UI/Card';
import { DiagramPlaceholder } from '../components/UI/DiagramPlaceholder';
import { AlertTriangle } from 'lucide-react';

export const Whitepaper = () => {
  return (
    <>
      <Section className="pt-8 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-[#00FF9C] text-5xl md:text-6xl font-black mb-4 uppercase tracking-tight">
            Whitepaper
          </h1>
          <p className="text-[#9CA3AF] text-xl mb-8">
            Game Economy, Tokenomics, and Systems Architecture
          </p>
          <p className="text-[#E5E7EB] text-lg leading-relaxed">
            Version 1.0 — Phase 1 Design Document
          </p>
        </div>
      </Section>

      <Section id="introduction" title="1. Introduction" className="bg-[#14161A]/50">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-[#E5E7EB] text-lg leading-relaxed">
            The play-to-earn gaming model has repeatedly failed to deliver on its promise. Games marketed as earning opportunities attract extractive players, not competitive ones. Early token liquidity enables bot farms and exploits. Infinite emissions collapse economies. Pay-to-win mechanics destroy competitive integrity.
          </p>
          <p className="text-[#E5E7EB] text-lg leading-relaxed">
            KryptoBums takes a different approach. We prioritize gameplay first, economy second. Competitive integrity is non-negotiable. Token rewards are performance-based and skill-gated. The economy supports the game—not the other way around.
          </p>
          <p className="text-[#E5E7EB] text-lg leading-relaxed">
            This document outlines the technical architecture of KryptoBums' phased economic model, the $KBUM utility token, anti-cheat systems, and the rationale behind our off-chain-first approach.
          </p>
          <Card accentColor="green">
            <h3 className="text-[#00FF9C] text-xl font-bold mb-3">Core Principles</h3>
            <ul className="space-y-2 text-[#E5E7EB]">
              <li className="flex items-start gap-3">
                <span className="text-[#00FF9C] font-bold">•</span>
                <span>Game-first design: Competitive balance over token value</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00FF9C] font-bold">•</span>
                <span>Skill-based rewards: Performance determines earnings, not investment</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00FF9C] font-bold">•</span>
                <span>Economy supports gameplay: Rewards enhance retention, not speculation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00FF9C] font-bold">•</span>
                <span>Anti-cheat first: Economic controls prevent exploitation</span>
              </li>
            </ul>
          </Card>
        </div>
      </Section>

      <Section id="what-is-kbum" title="2. What Is $KBUM?">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-[#E5E7EB] text-lg leading-relaxed">
            $KBUM is a utility reward token earned through gameplay performance in KryptoBums. It is not required to play the game. It does not grant competitive advantages. It is not marketed as an investment.
          </p>
          <p className="text-[#E5E7EB] text-lg leading-relaxed">
            $KBUM functions as a progression and participation mechanism. Players earn $KBUM by winning matches, achieving performance milestones, and participating in competitive events. $KBUM can be spent on character unlocks, cosmetic items, event access, and other non-competitive utilities.
          </p>
          <Card accentColor="blue">
            <h3 className="text-[#3B82F6] text-xl font-bold mb-3">$KBUM Utility</h3>
            <ul className="space-y-2 text-[#E5E7EB]">
              <li className="flex items-start gap-3">
                <span className="text-[#3B82F6] font-bold">✓</span>
                <span>Character unlocks and progression</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#3B82F6] font-bold">✓</span>
                <span>Cosmetic skins and customization</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#3B82F6] font-bold">✓</span>
                <span>Competitive event participation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#3B82F6] font-bold">✓</span>
                <span>Seasonal pass access</span>
              </li>
            </ul>
          </Card>
          <Card accentColor="red">
            <h3 className="text-[#FF3B3B] text-xl font-bold mb-3">What $KBUM Is NOT</h3>
            <ul className="space-y-2 text-[#E5E7EB]">
              <li className="flex items-start gap-3">
                <span className="text-[#FF3B3B] font-bold">✗</span>
                <span>An investment vehicle or security</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF3B3B] font-bold">✗</span>
                <span>A pay-to-win mechanism</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF3B3B] font-bold">✗</span>
                <span>A guaranteed earnings program</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF3B3B] font-bold">✗</span>
                <span>Required to access core gameplay</span>
              </li>
            </ul>
          </Card>
        </div>
      </Section>

      <Section id="phase-1" title="3. Phase 1 Economy (Off-Chain)" className="bg-[#14161A]/50">
        <div className="max-w-4xl mx-auto space-y-6">
          <h3 className="text-[#00FF9C] text-2xl font-bold">Phase 1 — Off-Chain Reward Ledger</h3>
          <p className="text-[#E5E7EB] text-lg leading-relaxed">
            Phase 1 operates entirely off-chain. $KBUM balances exist as database records maintained by server-authoritative logic. All transactions are atomic and validated through backend systems. No blockchain integration exists during this phase.
          </p>
          <p className="text-[#E5E7EB] text-lg leading-relaxed">
            This approach provides critical advantages: economic tuning without smart contract risk, immediate anti-cheat enforcement, rapid iteration on reward balancing, and zero gas costs for players.
          </p>
          <Card accentColor="green">
            <h3 className="text-[#00FF9C] text-xl font-bold mb-4">Phase 1 Match-to-Reward Flow</h3>
            <ol className="space-y-3 text-[#E5E7EB]">
              <li className="flex items-start gap-3">
                <span className="text-[#00FF9C] font-bold">1.</span>
                <span>Player completes a match and achieves a performance score</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00FF9C] font-bold">2.</span>
                <span>Client submits match result to backend with cryptographic signature</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00FF9C] font-bold">3.</span>
                <span>Backend validates match integrity and timing constraints</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00FF9C] font-bold">4.</span>
                <span>Anti-cheat filters analyze submission patterns and behavioral anomalies</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00FF9C] font-bold">5.</span>
                <span>If valid, $KBUM reward is calculated and ledger is updated atomically</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00FF9C] font-bold">6.</span>
                <span>Updated balance is returned to client for display</span>
              </li>
            </ol>
          </Card>
          <DiagramPlaceholder title="Phase 1 — Off-Chain $KBUM Flow" />
          <p className="text-[#E5E7EB] text-lg leading-relaxed">
            Server authority is mandatory. Client-side validation cannot be trusted. All economic state must be verified and controlled by backend systems before on-chain migration is safe.
          </p>
        </div>
      </Section>

      <Section id="anti-cheat" title="4. Match Validation & Anti-Cheat">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-[#E5E7EB] text-lg leading-relaxed">
            Anti-cheat systems must exist before token liquidity. Economic exploits are far more damaging than gameplay cheats. KryptoBums implements multiple layers of validation to prevent reward manipulation.
          </p>
          <Card accentColor="blue">
            <h3 className="text-[#3B82F6] text-xl font-bold mb-4">Anti-Cheat Layers</h3>
            <div className="space-y-4 text-[#E5E7EB]">
              <div>
                <h4 className="font-bold text-lg mb-2">Wallet Identity Verification</h4>
                <p className="text-[#9CA3AF]">
                  Players must verify wallet ownership before earning. Wallet signatures are validated server-side. One wallet per player account.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Match Timing Validation</h4>
                <p className="text-[#9CA3AF]">
                  Match duration, action timing, and input patterns are analyzed. Impossible timings are rejected. Statistical outliers are flagged.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Cooldown Enforcement</h4>
                <p className="text-[#9CA3AF]">
                  Players cannot earn unlimited rewards instantly. Per-match cooldowns prevent rapid farming. Daily soft caps reduce incentive for automation.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Reward Caps</h4>
                <p className="text-[#9CA3AF]">
                  Rewards scale with skill but are capped per session. Diminishing returns after soft caps. Hard caps prevent exploitation.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Duplicate Submission Prevention</h4>
                <p className="text-[#9CA3AF]">
                  Match IDs are tracked and validated. Replay attacks are detected. Submissions from multiple clients for the same match are rejected.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Behavioral Pattern Analysis</h4>
                <p className="text-[#9CA3AF]">
                  Machine learning models detect abnormal patterns. Bot-like behavior is flagged for review. Suspected accounts are temporarily restricted.
                </p>
              </div>
            </div>
          </Card>
          <DiagramPlaceholder title="$KBUM Anti-Cheat & Validation Pipeline" />
          <p className="text-[#E5E7EB] text-lg leading-relaxed">
            These systems are not optional. They are foundational. Without them, economic collapse is inevitable. Anti-cheat must be proven and battle-tested before on-chain migration.
          </p>
        </div>
      </Section>

      <Section id="tokenomics" title="5. Tokenomics Overview" className="bg-[#14161A]/50">
        <div className="max-w-4xl mx-auto space-y-6">
          <h3 className="text-[#00FF9C] text-2xl font-bold">$KBUM Tokenomics Overview</h3>
          <p className="text-[#E5E7EB] text-lg leading-relaxed">
            $KBUM follows a controlled emission model designed for long-term sustainability. There is no infinite minting. There is no upfront public sale. Emissions are tied directly to gameplay activity and adjusted based on economic health.
          </p>
          <p className="text-[#E5E7EB] text-lg leading-relaxed">
            Supply growth is intentionally slow. Rewards are distributed based on competitive performance, not participation alone. The economy prioritizes retention of skilled players over speculative traders.
          </p>
          <Card accentColor="green">
            <h3 className="text-[#00FF9C] text-xl font-bold mb-3">Economic Design Principles</h3>
            <ul className="space-y-2 text-[#E5E7EB]">
              <li className="flex items-start gap-3">
                <span className="text-[#00FF9C] font-bold">•</span>
                <span>Controlled emission tied to active player base</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00FF9C] font-bold">•</span>
                <span>No upfront token sale or private investor allocation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00FF9C] font-bold">•</span>
                <span>Skill-based distribution prevents passive farming</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00FF9C] font-bold">•</span>
                <span>Sinks are balanced against emissions for stability</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00FF9C] font-bold">•</span>
                <span>Admin-controlled tuning during early phases</span>
              </li>
            </ul>
          </Card>
          <p className="text-[#E5E7EB] text-lg leading-relaxed">
            This model is not designed for short-term speculation. It is designed to support a competitive game that lasts for years.
          </p>
        </div>
      </Section>

      <Section id="supply-emission" title="6. Supply & Emission Model">
        <div className="max-w-4xl mx-auto space-y-6">
          <h3 className="text-[#00FF9C] text-2xl font-bold">Supply & Emissions</h3>
          <p className="text-[#E5E7EB] text-lg leading-relaxed">
            Phase 1 begins with zero circulating supply. All $KBUM exists only off-chain as database entries. Phase 2 introduces on-chain minting through a controlled claim process. Emissions are capped per season and adjusted based on player activity.
          </p>
          <Card accentColor="blue">
            <h3 className="text-[#3B82F6] text-xl font-bold mb-4">Emission Structure</h3>
            <div className="space-y-4 text-[#E5E7EB]">
              <div>
                <h4 className="font-bold text-lg mb-2">Phase 1: Off-Chain Only</h4>
                <p className="text-[#9CA3AF]">
                  Initial circulating supply: 0. All balances are database records. No blockchain interaction.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Phase 2: Claim-Based On-Chain Minting</h4>
                <p className="text-[#9CA3AF]">
                  Players can claim off-chain balance to mint on-chain tokens. Claims are rate-limited. Backend verifies eligibility before minting.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Per-Match Reward Caps</h4>
                <p className="text-[#9CA3AF]">
                  Individual match rewards are capped based on performance tier. High skill is rewarded but not infinitely.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Daily Soft Caps</h4>
                <p className="text-[#9CA3AF]">
                  Rewards diminish after daily thresholds. Encourages distributed play rather than grinding.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Seasonal Emission Targets</h4>
                <p className="text-[#9CA3AF]">
                  Total emissions are planned per competitive season. Adjustments are made based on active player count and economic health.
                </p>
              </div>
            </div>
          </Card>
          <p className="text-[#E5E7EB] text-lg leading-relaxed">
            There is no fixed maximum supply initially. Governance mechanisms may introduce supply caps in future phases. Early flexibility is required to prevent economic death spirals and adapt to player behavior.
          </p>
          <p className="text-[#E5E7EB] text-lg leading-relaxed">
            Admin-controlled tuning exists during Phase 1 and early Phase 2. This is intentional. Decentralized governance before economic stability is reckless.
          </p>
        </div>
      </Section>

      <Section id="distribution" title="7. Token Distribution (Future Phases)" className="bg-[#14161A]/50">
        <div className="max-w-4xl mx-auto space-y-6">
          <h3 className="text-[#00FF9C] text-2xl font-bold">Planned Token Distribution</h3>
          <p className="text-[#E5E7EB] text-lg leading-relaxed">
            When on-chain migration begins, $KBUM will be distributed across multiple categories. Specific percentages are not finalized, as they will be adjusted based on Phase 1 economic data.
          </p>
          <Card accentColor="green">
            <h3 className="text-[#00FF9C] text-xl font-bold mb-4">Distribution Categories</h3>
            <div className="space-y-4 text-[#E5E7EB]">
              <div>
                <h4 className="font-bold text-lg mb-2">Player Rewards (Primary Allocation)</h4>
                <p className="text-[#9CA3AF]">
                  The majority of supply is reserved for player earnings. Distributed based on competitive performance over multiple seasons.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Ecosystem Treasury</h4>
                <p className="text-[#9CA3AF]">
                  Reserved for long-term development, anti-cheat operations, and economic stabilization mechanisms.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Event Rewards</h4>
                <p className="text-[#9CA3AF]">
                  Allocated for competitive tournaments, community events, and seasonal challenges.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Development & Maintenance</h4>
                <p className="text-[#9CA3AF]">
                  Covers ongoing development costs, server infrastructure, and anti-cheat system improvements.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Community Incentives</h4>
                <p className="text-[#9CA3AF]">
                  Supports content creators, community moderators, and ecosystem contributors.
                </p>
              </div>
            </div>
          </Card>
          <p className="text-[#E5E7EB] text-lg leading-relaxed">
            There is no private investor allocation. There is no early access advantage. Player rewards are the dominant allocation category. This is non-negotiable.
          </p>
        </div>
      </Section>

      <Section id="sinks" title="8. Token Sinks & Economic Balance">
        <div className="max-w-4xl mx-auto space-y-6">
          <h3 className="text-[#00FF9C] text-2xl font-bold">$KBUM Utility & Sinks</h3>
          <p className="text-[#E5E7EB] text-lg leading-relaxed">
            Emissions without sinks lead to hyperinflation. $KBUM is designed with multiple utility sinks that remove tokens from circulation. These sinks counter emissions and stabilize long-term value.
          </p>
          <Card accentColor="blue">
            <h3 className="text-[#3B82F6] text-xl font-bold mb-4">Token Sinks</h3>
            <div className="space-y-4 text-[#E5E7EB]">
              <div>
                <h4 className="font-bold text-lg mb-2">Character Unlocks</h4>
                <p className="text-[#9CA3AF]">
                  New fighters can be unlocked with $KBUM. Tokens are burned on purchase.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Cosmetic Skins</h4>
                <p className="text-[#9CA3AF]">
                  Visual customization options require $KBUM. Skins do not affect gameplay balance.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Event Access</h4>
                <p className="text-[#9CA3AF]">
                  Premium competitive events may require $KBUM entry fees. Fees are partially redistributed as prizes.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Seasonal Passes</h4>
                <p className="text-[#9CA3AF]">
                  Seasonal progression systems may require $KBUM for premium tier access.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Competitive Entry Fees (Future)</h4>
                <p className="text-[#9CA3AF]">
                  High-stakes tournament entry may require $KBUM stakes. Prize pools are funded by entry fees.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Optional Burns or Lockups</h4>
                <p className="text-[#9CA3AF]">
                  Future mechanisms may include voluntary burns for cosmetic effects or staking for governance weight.
                </p>
              </div>
            </div>
          </Card>
          <DiagramPlaceholder title="$KBUM Sinks & Economic Balance" />
          <p className="text-[#E5E7EB] text-lg leading-relaxed">
            Sinks are not optional. They are mandatory for economic health. Without them, $KBUM becomes worthless over time. Sink design is as important as emission design.
          </p>
        </div>
      </Section>

      <Section id="phase-2" title="9. Phase 2 On-Chain Migration (Solana)" className="bg-[#14161A]/50">
        <div className="max-w-4xl mx-auto space-y-6">
          <h3 className="text-[#00FF9C] text-2xl font-bold">Phase 2 — On-Chain Integration</h3>
          <p className="text-[#E5E7EB] text-lg leading-relaxed">
            Phase 2 introduces optional on-chain token claims. Players can convert their off-chain $KBUM balance into on-chain SPL tokens on Solana. This process is controlled, rate-limited, and reversible.
          </p>
          <Card accentColor="green">
            <h3 className="text-[#00FF9C] text-xl font-bold mb-4">Phase 2 Claim Flow</h3>
            <ol className="space-y-3 text-[#E5E7EB]">
              <li className="flex items-start gap-3">
                <span className="text-[#00FF9C] font-bold">1.</span>
                <span>Player initiates claim request from verified wallet</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00FF9C] font-bold">2.</span>
                <span>Backend validates off-chain balance and eligibility</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00FF9C] font-bold">3.</span>
                <span>Rate-limiting checks confirm claim is within allowed frequency</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00FF9C] font-bold">4.</span>
                <span>Backend signs transaction and initiates on-chain minting</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00FF9C] font-bold">5.</span>
                <span>On-chain tokens are minted to player wallet</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00FF9C] font-bold">6.</span>
                <span>Off-chain balance is reduced by claimed amount</span>
              </li>
            </ol>
          </Card>
          <DiagramPlaceholder title="Phase 2 — On-Chain $KBUM Claim Flow" />
          <p className="text-[#E5E7EB] text-lg leading-relaxed">
            On-chain migration is optional. Players who prefer off-chain balances can continue using them for in-game utilities. The off-chain ledger remains authoritative. This hybrid model reduces risk and maintains flexibility.
          </p>
          <p className="text-[#E5E7EB] text-lg leading-relaxed">
            Claims may be rate-limited to prevent liquidity shocks. Early Phase 2 will include stricter limits that gradually relax as economic stability is proven.
          </p>
        </div>
      </Section>

      <Section id="why-it-works" title="10. Why This Model Works">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-[#E5E7EB] text-lg leading-relaxed">
            Most play-to-earn games fail because they prioritize token price over gameplay. They launch with immediate liquidity, attracting bots and exploiters. They implement pay-to-win mechanics that drive away competitive players. They use infinite emissions that guarantee economic collapse.
          </p>
          <p className="text-[#E5E7EB] text-lg leading-relaxed">
            KryptoBums inverts this model. Gameplay comes first. Competitive integrity is protected. Anti-cheat is proven before liquidity. Emissions are controlled and skill-based. The economy supports the game, not speculation.
          </p>
          <Card accentColor="blue">
            <h3 className="text-[#3B82F6] text-xl font-bold mb-4">Why Phased Decentralization Works</h3>
            <div className="space-y-4 text-[#E5E7EB]">
              <div>
                <h4 className="font-bold text-lg mb-2">Off-Chain Phase Proves Economics</h4>
                <p className="text-[#9CA3AF]">
                  Economic models can be tested and tuned without smart contract risk or gas costs. Failures are cheap and reversible.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Anti-Cheat Must Come First</h4>
                <p className="text-[#9CA3AF]">
                  Exploits destroy on-chain economies instantly. Off-chain systems allow rapid detection and response before tokens have liquidity.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Skill-Based Rewards Retain Players</h4>
                <p className="text-[#9CA3AF]">
                  Competitive players stay engaged when skill determines outcomes. Passive farmers leave when automation is unprofitable.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Controlled Emissions Prevent Collapse</h4>
                <p className="text-[#9CA3AF]">
                  Infinite emissions guarantee hyperinflation. Controlled emissions allow sustainable long-term growth.
                </p>
              </div>
            </div>
          </Card>
          <p className="text-[#E5E7EB] text-lg leading-relaxed">
            Pure on-chain play-to-earn has failed repeatedly. This hybrid model addresses its fundamental flaws while preserving the benefits of decentralization where appropriate.
          </p>
        </div>
      </Section>

      <Section id="disclaimer" title="11. Disclaimer" className="bg-[#14161A]/50">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card accentColor="red">
            <div className="flex items-start gap-4 mb-4">
              <AlertTriangle className="w-8 h-8 text-[#FF3B3B] flex-shrink-0" />
              <h3 className="text-[#FF3B3B] text-2xl font-bold">Important Disclaimer</h3>
            </div>
            <div className="space-y-4 text-[#E5E7EB]">
              <p>
                KryptoBums is a gameplay-first product. $KBUM is a utility token earned through competitive performance. It is not marketed as an investment. There are no guaranteed earnings.
              </p>
              <p>
                The economy described in this document is experimental and subject to change. Reward rates, emission caps, and economic parameters will be tuned based on player activity and economic health.
              </p>
              <p>
                Token value may fluctuate significantly or become worthless. Players should not expect financial returns. Participation should be motivated by gameplay enjoyment, not profit.
              </p>
              <p>
                This document does not constitute financial advice. Players are responsible for their own decisions. KryptoBums makes no guarantees about future token utility, liquidity, or value.
              </p>
              <p>
                Anti-cheat systems are designed to prevent exploitation but are not perfect. Detected violations may result in account restrictions or balance resets without appeal.
              </p>
              <p>
                On-chain migration timing and implementation details are subject to change based on economic conditions and technical readiness.
              </p>
            </div>
          </Card>
        </div>
      </Section>

      <Section className="py-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#9CA3AF] text-sm">
            KryptoBums Whitepaper — Version 1.0 — Phase 1 Design Document
          </p>
          <p className="text-[#9CA3AF] text-sm mt-2">
            Subject to updates as the economy evolves and new phases are implemented.
          </p>
        </div>
      </Section>
    </>
  );
};
