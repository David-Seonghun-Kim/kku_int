const SCORE_KEY = "kku_int_scores";

export interface Scores {
  game1: number | null;
  game2: number | null;
  game3: number | null;
}

export function saveScore(game: keyof Scores, score: number): void {
  if (typeof window === "undefined") return;
  const current = getScores();
  current[game] = score;
  sessionStorage.setItem(SCORE_KEY, JSON.stringify(current));
}

export function getScores(): Scores {
  if (typeof window === "undefined") return { game1: null, game2: null, game3: null };
  const raw = sessionStorage.getItem(SCORE_KEY);
  if (!raw) return { game1: null, game2: null, game3: null };
  try {
    return JSON.parse(raw) as Scores;
  } catch {
    return { game1: null, game2: null, game3: null };
  }
}

export function getTotalScore(): number {
  const scores = getScores();
  return (scores.game1 ?? 0) + (scores.game2 ?? 0) + (scores.game3 ?? 0);
}

export function clearScores(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SCORE_KEY);
}
