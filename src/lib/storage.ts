import type { UserProgress } from "@/lib/types";

export const STORAGE_KEY = "brujula:progress:v1";

export const defaultProgress: UserProgress = {
  userName: "",
  game1: {
    completed: false,
    score: 0,
    cardsAnswered: 0,
    answeredIds: [],
  },
  game2: {
    completed: false,
    score: 0,
    flagsIdentified: 0,
    flaggedIds: [],
  },
  game3: {
    completed: false,
    currentChapter: 1,
    decisionsHistory: [],
  },
};

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function asNumber(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function asBoolean(value: unknown, fallback: boolean) {
  return typeof value === "boolean" ? value : fallback;
}

function asString(value: unknown, fallback: string) {
  return typeof value === "string" ? value : fallback;
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

/**
 * Normaliza cualquier dato leído de localStorage para que la aplicación
 * nunca se rompa por un objeto incompleto o una versión anterior.
 */
export function normalizeProgress(raw: unknown): UserProgress {
  const data = asRecord(raw);
  if (!data) return structuredClone(defaultProgress);

  const game1 = asRecord(data.game1);
  const game2 = asRecord(data.game2);
  const game3 = asRecord(data.game3);
  const stats = asRecord(game3?.stats);

  return {
    userName: asString(data.userName, ""),
    game1: {
      completed: asBoolean(game1?.completed, false),
      score: asNumber(game1?.score, 0),
      cardsAnswered: asNumber(game1?.cardsAnswered, 0),
      answeredIds: asStringArray(game1?.answeredIds),
    },
    game2: {
      completed: asBoolean(game2?.completed, false),
      score: asNumber(game2?.score, 0),
      flagsIdentified: asNumber(game2?.flagsIdentified, 0),
      flaggedIds: asStringArray(game2?.flaggedIds),
    },
    game3: {
      completed: asBoolean(game3?.completed, false),
      currentChapter: asNumber(game3?.currentChapter, 1),
      decisionsHistory: asStringArray(game3?.decisionsHistory),
      currentNodeId:
        typeof game3?.currentNodeId === "string"
          ? game3.currentNodeId
          : undefined,
      stats: stats
        ? {
            autonomy: asNumber(stats.autonomy, 5),
            wellbeing: asNumber(stats.wellbeing, 5),
            goals: asNumber(stats.goals, 5),
            support: asNumber(stats.support, 5),
          }
        : undefined,
      endingId:
        typeof game3?.endingId === "string" ? game3.endingId : undefined,
    },
    updatedAt:
      typeof data.updatedAt === "string" ? data.updatedAt : undefined,
  };
}

export function readProgress(): UserProgress {
  if (typeof window === "undefined") return structuredClone(defaultProgress);

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(defaultProgress);
    return normalizeProgress(JSON.parse(raw) as unknown);
  } catch {
    return structuredClone(defaultProgress);
  }
}

export function writeProgress(progress: UserProgress) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...progress, updatedAt: new Date().toISOString() }),
    );
  } catch {
    // Si el navegador bloquea localStorage, la sesión sigue funcionando en memoria.
  }
}

export function clearProgress() {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Silencioso por la misma razón que writeProgress.
  }
}

export function hasProgress(progress: UserProgress) {
  return Boolean(
    progress.userName ||
      progress.game1.cardsAnswered > 0 ||
      progress.game2.flagsIdentified > 0 ||
      progress.game3.decisionsHistory.length > 0,
  );
}
