import { PlayerProfile, AIDecision, Difficulty } from '../types/ai';

const SYSTEM_PROMPT = `You are an AI opponent controller for a gritty arcade fighting game called KryptoBums.

Your job is to:
- Analyze player behavior
- Classify the player's fighting style
- Choose the opponent's NEXT action only

You do NOT:
- Control damage
- Control health
- Control visuals
- Speak to the player

You must play to win but still make occasional mistakes.
You are reactive, street-smart, and slightly dirty.`;

type OpenAIMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

type OpenAIRequest = {
  model: string;
  messages: OpenAIMessage[];
  temperature: number;
  response_format?: { type: 'json_object' };
};

type OpenAIResponse = {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
};

const FALLBACK_DECISIONS: AIDecision[] = [
  {
    playerStyle: "unknown",
    decision: "light_attack",
    confidence: 0.5,
    reasoning: "API unavailable, using fallback random action"
  },
  {
    playerStyle: "unknown",
    decision: "block",
    confidence: 0.5,
    reasoning: "API unavailable, using fallback random action"
  },
  {
    playerStyle: "unknown",
    decision: "heavy_attack",
    confidence: 0.5,
    reasoning: "API unavailable, using fallback random action"
  }
];

let lastDecision: AIDecision | null = null;
let lastCallTime = 0;
const DEBOUNCE_MS = 1000;

export async function getAIOpponentDecision(
  playerProfile: PlayerProfile,
  opponentHealth: number,
  difficulty: Difficulty = "normal"
): Promise<AIDecision> {
  const now = Date.now();
  if (now - lastCallTime < DEBOUNCE_MS && lastDecision) {
    return lastDecision;
  }

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    console.warn('OpenAI API key not found, using fallback AI');
    const fallback = FALLBACK_DECISIONS[Math.floor(Math.random() * FALLBACK_DECISIONS.length)];
    lastDecision = fallback;
    lastCallTime = now;
    return fallback;
  }

  try {
    const userPrompt = JSON.stringify({
      player: playerProfile,
      opponentHealth,
      difficulty
    }, null, 2);

    const requestBody: OpenAIRequest = {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' }
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data: OpenAIResponse = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No content in OpenAI response');
    }

    const decision: AIDecision = JSON.parse(content);

    if (!isValidDecision(decision)) {
      throw new Error('Invalid decision format from OpenAI');
    }

    lastDecision = decision;
    lastCallTime = now;
    return decision;

  } catch (error) {
    console.error('OpenAI API error:', error);
    const fallback = FALLBACK_DECISIONS[Math.floor(Math.random() * FALLBACK_DECISIONS.length)];
    lastDecision = fallback;
    lastCallTime = now;
    return fallback;
  }
}

function isValidDecision(decision: any): decision is AIDecision {
  const validActions = ["light_attack", "heavy_attack", "block", "dodge", "wait", "counter"];

  return (
    typeof decision === 'object' &&
    decision !== null &&
    typeof decision.playerStyle === 'string' &&
    typeof decision.decision === 'string' &&
    validActions.includes(decision.decision) &&
    typeof decision.confidence === 'number' &&
    typeof decision.reasoning === 'string'
  );
}
