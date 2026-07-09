import { create } from "zustand";
import { addScores, emptyScores, type Scores } from "@/lib/game-data";

type Step =
  | "welcome"      // 1
  | "intro"        // 2
  | "love"         // 3
  | "hate"         // 4
  | "future"       // 5
  | "feel"         // 6
  | "power"        // 7
  | "compass1"     // 8
  | "dilemmas"     // 9
  | "compass2"     // 10
  | "profile"      // 11
  | "assocList"    // 12
  | "assocDetail"; // 13

type State = {
  step: Step;
  scores: Scores;
  dilemmaIndex: number;
  assocIndex: number;
  goto: (s: Step) => void;
  addScore: (s: Partial<Scores>) => void;
  nextDilemma: () => void;
  setAssocIndex: (i: number) => void;
  reset: () => void;
};

export const useGame = create<State>((set) => ({
  step: "welcome",
  scores: emptyScores(),
  dilemmaIndex: 0,
  assocIndex: 0,
  goto: (step) => set({ step }),
  addScore: (s) => set((st) => ({ scores: addScores(st.scores, s) })),
  nextDilemma: () => set((st) => ({ dilemmaIndex: st.dilemmaIndex + 1 })),
  setAssocIndex: (i) => set({ assocIndex: i }),
  reset: () =>
    set({ step: "intro", scores: emptyScores(), dilemmaIndex: 0, assocIndex: 0 }),
}));
