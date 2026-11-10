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
  STORAGE_KEY,
  clearProgress,
  defaultProgress,
  readProgress,
  writeProgress,
} from "@/lib/storage";
import type {
  Game1Progress,
  Game2Progress,
  Game3Progress,
  GameKey,
  UserProgress,
} from "@/lib/types";

interface ProgressContextValue {
  progress: UserProgress;
  isReady: boolean;
  completionCount: number;
  setUserName: (name: string) => void;
  updateGame1: (patch: Partial<Game1Progress>) => void;
  updateGame2: (patch: Partial<Game2Progress>) => void;
  updateGame3: (patch: Partial<Game3Progress>) => void;
  resetGame: (game: GameKey) => void;
  resetAll: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(() =>
    structuredClone(defaultProgress),
  );
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setProgress(readProgress());
    setIsReady(true);

    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) setProgress(readProgress());
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    if (isReady) writeProgress(progress);
  }, [progress, isReady]);

  const setUserName = useCallback((name: string) => {
    const cleanName = name.trim().slice(0, 32);
    setProgress((prev) => ({ ...prev, userName: cleanName }));
  }, []);

  const updateGame1 = useCallback((patch: Partial<Game1Progress>) => {
    setProgress((prev) => ({
      ...prev,
      game1: { ...prev.game1, ...patch },
    }));
  }, []);

  const updateGame2 = useCallback((patch: Partial<Game2Progress>) => {
    setProgress((prev) => ({
      ...prev,
      game2: { ...prev.game2, ...patch },
    }));
  }, []);

  const updateGame3 = useCallback((patch: Partial<Game3Progress>) => {
    setProgress((prev) => ({
      ...prev,
      game3: { ...prev.game3, ...patch },
    }));
  }, []);

  const resetGame = useCallback((game: GameKey) => {
    setProgress((prev) => {
      if (game === "game1") {
        return { ...prev, game1: structuredClone(defaultProgress.game1) };
      }
      if (game === "game2") {
        return { ...prev, game2: structuredClone(defaultProgress.game2) };
      }
      return { ...prev, game3: structuredClone(defaultProgress.game3) };
    });
  }, []);

  const resetAll = useCallback(() => {
    clearProgress();
    setProgress(structuredClone(defaultProgress));
  }, []);

  const completionCount = useMemo(
    () =>
      [progress.game1.completed, progress.game2.completed, progress.game3.completed].filter(
        Boolean,
      ).length,
    [progress.game1.completed, progress.game2.completed, progress.game3.completed],
  );

  const value = useMemo<ProgressContextValue>(
    () => ({
      progress,
      isReady,
      completionCount,
      setUserName,
      updateGame1,
      updateGame2,
      updateGame3,
      resetGame,
      resetAll,
    }),
    [
      progress,
      isReady,
      completionCount,
      setUserName,
      updateGame1,
      updateGame2,
      updateGame3,
      resetGame,
      resetAll,
    ],
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
