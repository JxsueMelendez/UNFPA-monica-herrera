import type { Session, SessionsStore, UserProgress } from "@/lib/types";

export const STORAGE_KEY = "brujula:progress:v1";
export const SESSIONS_KEY = "brujula:sessions:v2";

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

const emptyStore: SessionsStore = { activeId: null, sessions: {} };

function asSession(value: unknown): Session | null {
  const data = asRecord(value);
  if (!data || typeof data.id !== "string") return null;
  const progress = normalizeProgress(data.progress);
  const name = asString(data.name, progress.userName || "Sesión");
  const createdAt = asString(data.createdAt, new Date().toISOString());
  const lastActiveAt = asString(data.lastActiveAt, createdAt);
  return { id: data.id, name, createdAt, lastActiveAt, progress: { ...progress, userName: progress.userName || name } };
}

function normalizeStore(raw: unknown): SessionsStore {
  const data = asRecord(raw);
  if (!data) return structuredClone(emptyStore);
  const sessionsRaw = asRecord(data.sessions) ?? {};
  const sessions: Record<string, Session> = {};
  for (const [id, value] of Object.entries(sessionsRaw)) {
    const session = asSession({ ...(asRecord(value) ?? {}), id: (asRecord(value)?.id as string) ?? id });
    if (session) sessions[session.id] = session;
  }
  const activeId = typeof data.activeId === "string" && sessions[data.activeId] ? data.activeId : Object.keys(sessions)[0] ?? null;
  return { activeId, sessions };
}

export function readSessionsStore(): SessionsStore {
  if (typeof window === "undefined") return structuredClone(emptyStore);
  try {
    const rawSessions = window.localStorage.getItem(SESSIONS_KEY);
    if (rawSessions) return normalizeStore(JSON.parse(rawSessions) as unknown);

    const rawLegacy = window.localStorage.getItem(STORAGE_KEY);
    if (rawLegacy) {
      const progress = normalizeProgress(JSON.parse(rawLegacy) as unknown);
      const now = new Date().toISOString();
      const id = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `session-${Date.now()}`;
      const session: Session = { id, name: progress.userName || "Sesión 1", createdAt: now, lastActiveAt: progress.updatedAt ?? now, progress };
      const store = { activeId: id, sessions: { [id]: session } };
      writeSessionsStore(store);
      try { window.localStorage.removeItem(STORAGE_KEY); } catch {}
      return store;
    }
  } catch {}
  return structuredClone(emptyStore);
}

export function writeSessionsStore(store: SessionsStore) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SESSIONS_KEY, JSON.stringify(store));
  } catch {}
}

export function readProgress(): UserProgress {
  const store = readSessionsStore();
  if (!store.activeId || !store.sessions[store.activeId]) return structuredClone(defaultProgress);
  return normalizeProgress(store.sessions[store.activeId].progress);
}

export function writeProgress(progress: UserProgress) {
  if (typeof window === "undefined") return;
  const store = readSessionsStore();
  const now = new Date().toISOString();
  let activeId = store.activeId;
  if (!activeId || !store.sessions[activeId]) {
    activeId = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `session-${Date.now()}`;
    store.sessions[activeId] = { id: activeId, name: progress.userName || "Sesión", createdAt: now, lastActiveAt: now, progress: structuredClone(defaultProgress) };
    store.activeId = activeId;
  }
  const prev = store.sessions[activeId];
  store.sessions[activeId] = {
    ...prev,
    name: progress.userName || prev.name || "Sesión",
    lastActiveAt: now,
    progress: normalizeProgress({ ...progress, updatedAt: now }),
  };
  writeSessionsStore(store);
}

export function clearProgress() {
  if (typeof window === "undefined") return;
  const store = readSessionsStore();
  if (store.activeId) {
    delete store.sessions[store.activeId];
    store.activeId = Object.keys(store.sessions)[0] ?? null;
    writeSessionsStore(store);
  }
}

export function listSessions(): Session[] {
  return Object.values(readSessionsStore().sessions).sort((a, b) => b.lastActiveAt.localeCompare(a.lastActiveAt));
}

export function getActiveSessionId() {
  return readSessionsStore().activeId;
}

export function setActiveSession(id: string) {
  const store = readSessionsStore();
  if (store.sessions[id]) {
    store.activeId = id;
    writeSessionsStore(store);
  }
}

export function createSession(name: string): string {
  const store = readSessionsStore();
  const now = new Date().toISOString();
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `session-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const cleanName = name.trim().slice(0, 32);
  const progress = { ...structuredClone(defaultProgress), userName: cleanName };
  store.sessions[id] = {
    id,
    name: cleanName || "Sesión",
    createdAt: now,
    lastActiveAt: now,
    progress,
  };
  store.activeId = id;
  writeSessionsStore(store);
  return id;
}

export function hasProgress(progress: UserProgress) {
  return Boolean(
    progress.userName ||
      progress.game1.cardsAnswered > 0 ||
      progress.game2.flagsIdentified > 0 ||
      progress.game3.decisionsHistory.length > 0,
  );
}
