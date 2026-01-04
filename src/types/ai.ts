export type PlayerProfile = {
  recentActions: string[];
  hitAccuracy: number;
  dodgesUsed: number;
  itemsUsed: string[];
  idleTimeMs: number;
};

export type AIDecision = {
  playerStyle: string;
  decision: "light_attack" | "heavy_attack" | "block" | "dodge" | "wait" | "counter";
  confidence: number;
  reasoning: string;
};

export type Difficulty = "easy" | "normal" | "hard";
