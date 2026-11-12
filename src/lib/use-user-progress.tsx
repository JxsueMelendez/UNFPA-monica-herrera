"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  SESSIONS_KEY,
  clearProgress,
  createSession as createSessionInStore,
  defaultProgress,
  getActiveSessionId,
  listSessions,
  readProgress,
  readSessionsStore,
  setActiveSession as persistActiveSession,
  writeProgress,
  writeSessionsStore,
} from "@/lib/storage";
import type {
  Game1Progress,
  Game2Progress,
  Game3Progress,
  GameKey,
  Session,
  UserProgress,
} from "@/lib/types";

interface ProgressContextValue {
  progress: UserProgress;
  isReady: boolean;
  completionCount: number;
  sessions: Session[];
  activeSessionId: string | null;
  setUserName: (name: string) => void;
  updateGame1: (patch: Partial<Game1Progress>) => void;
  updateGame2: (patch: Partial<Game2Progress>) => void;
  updateGame3: (patch: Partial<Game3Progress>) => void;
  resetGame: (game: GameKey) => void;
  resetAll: () => void;
  switchSession: (id: string) => void;
  createSession: (name: string) => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(() => structuredClone(defaultProgress));
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  const sync = useCallback(() => {
    const store = readSessionsStore();
    setSessions(Object.values(store.sessions).sort((a, b) => b.lastActiveAt.localeCompare(a.lastActiveAt)));
    setActiveSessionId(store.activeId);
    setProgress(store.activeId && store.sessions[store.activeId] ? store.sessions[store.activeId].progress : structuredClone(defaultProgress));
  }, []);

  useEffect(() => {
    sync();
    setIsReady(true);

    const handleStorage = (event: StorageEvent) => {
      if (event.key === SESSIONS_KEY || event.key === "brujula:progress:v1") sync();
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [sync]);

  useEffect(() => {
    if (!isReady) return;
    writeProgress(progress);
    setSessions((prev) => {
      if (!activeSessionId) return prev;
      const now = new Date().toISOString();
      return prev
        .map((s) => (s.id === activeSessionId ? { ...s, name: progress.userName || s.name, lastActiveAt: now, progress } : s))
        .sort((a, b) => b.lastActiveAt.localeCompare(a.lastActiveAt));
    });
  }, [progress, isReady, activeSessionId]);

  const switchSession = useCallback((id: string) => {
    const store = readSessionsStore();
    if (store.sessions[id]) {
      store.activeId = id;
      store.sessions[id].lastActiveAt = new Date().toISOString();
      writeSessionsStore(store);
      sync();
    }
  }, [sync]);

  const createSession = useCallback((name: string) => {
    createSessionInStore(name);
    sync();
  }, [sync]);

  const setUserName = useCallback((name: string) => {
    const cleanName = name.trim().slice(0, 32);
    setProgress((prev) => ({ ...prev, userName: cleanName }));
  }, []);

  const updateGame1 = useCallback((patch: Partial<Game1Progress>) => {
    setProgress((prev) => ({ ...prev, game1: { ...prev.game1, ...patch } }));
  }, []);

  const updateGame2 = useCallback((patch: Partial<Game2Progress>) => {
    setProgress((prev) => ({ ...prev, game2: { ...prev.game2, ...patch } }));
  }, []);

  const updateGame3 = useCallback((patch: Partial<Game3Progress>) => {
    setProgress((prev) => ({ ...prev, game3: { ...prev.game3, ...patch } }));
  }, []);

  const resetGame = useCallback((game: GameKey) => {
    setProgress((prev) => {
      if (game === "game1") return { ...prev, game1: structuredClone(defaultProgress.game1) };
      if (game === "game2") return { ...prev, game2: structuredClone(defaultProgress.game2) };
      return { ...prev, game3: structuredClone(defaultProgress.game3) };
    });
  }, []);

  const resetAll = useCallback(() => {
    clearProgress();
    sync();
  }, [sync]);

  const completionCount = useMemo(
    () => [progress.game1.completed, progress.game2.completed, progress.game3.completed].filter(Boolean).length,
    [progress.game1.completed, progress.game2.completed, progress.game3.completed],
  );

  const value = useMemo<ProgressContextValue>(
    () => ({ progress, isReady, completionCount, sessions, activeSessionId, setUserName, updateGame1, updateGame2, updateGame3, resetGame, resetAll, switchSession, createSession }),
    [progress, isReady, completionCount, sessions, activeSessionId, setUserName, updateGame1, updateGame2, updateGame3, resetGame, resetAll, switchSession, createSession],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useUserProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useUserProgress debe usarse dentro de <ProgressProvider>.");
  }
  return context;
}
