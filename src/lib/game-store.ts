import { create } from "zustand";
import {
  addScores,
  emptyScores,
  cardsLove,
  cardsHate,
  cardsFuture,
  cardsFeel,
  cardsPower,
  dilemmas as allDilemmas,
  selectDilemmaIndices,
  type Card,
  type Scores,
} from "@/lib/game-data";

export type Step =
  | "welcome"
  | "intro"
  | "love"
  | "hate"
  | "future"
  | "feel"
  | "power"
  | "dilemmas"
  | "profile"
  | "assocList";

export type PickKey = "love" | "hate" | "future" | "feel" | "power";

type Selections = {
  love?: string;
  hate?: string;
  future?: string;
  feel?: string;
  power?: string;
  dilemmas: Record<number, string>; // key = index into allDilemmas
};

type State = {
  step: Step;
  dilemmaIndex: number; // index into dilemmaOrder
  dilemmaOrder: number[];
  selections: Selections;
  goto: (s: Step, di?: number) => void;
  setChoice: (key: PickKey, id: string) => void;
  setDilemmaChoice: (id: string) => void;
  next: () => void;
  prev: () => void;
  hasCurrentSelection: () => boolean;
  computeScores: () => Scores;
  reset: () => void;
};

const LINEAR: Step[] = [
  "intro",
  "love",
  "hate",
  "future",
  "feel",
  "power",
  "dilemmas",
  "profile",
  "assocList",
];

function cardById(list: Card[], id: string | undefined): Card | undefined {
  return id ? list.find((c) => c.id === id) : undefined;
}

function scoresFrom(sel: Selections, order: number[]): Scores {
  let s = emptyScores();
  const add = (c?: Card) => {
    if (c) s = addScores(s, c.scores);
  };
  add(cardById(cardsLove, sel.love));
  add(cardById(cardsHate, sel.hate));
  add(cardById(cardsFuture, sel.future));
  add(cardById(cardsFeel, sel.feel));
  add(cardById(cardsPower, sel.power));
  order.forEach((i) => {
    const d = allDilemmas[i];
    const picked = sel.dilemmas[i];
    if (!picked) return;
    if (picked === d.a.id) s = addScores(s, d.a.scores);
    else if (picked === d.b.id) s = addScores(s, d.b.scores);
  });
  return s;
}

const initialSelections = (): Selections => ({ dilemmas: {} });

export const useGame = create<State>((set, get) => ({
  step: "welcome",
  dilemmaIndex: 0,
  dilemmaOrder: [],
  selections: initialSelections(),

  goto: (step, di = 0) => set({ step, dilemmaIndex: di }),

  setChoice: (key, id) =>
    set((state) => ({ selections: { ...state.selections, [key]: id } })),

  setDilemmaChoice: (id) =>
    set((state) => {
      const dI = state.dilemmaOrder[state.dilemmaIndex];
      return {
        selections: {
          ...state.selections,
          dilemmas: { ...state.selections.dilemmas, [dI]: id },
        },
      };
    }),

  next: () => {
    const st = get();
    if (st.step === "power") {
      // Build the dilemma order based on scores collected so far.
      const preOrder: number[] = [];
      const preScores = scoresFrom(st.selections, preOrder);
      const order = selectDilemmaIndices(preScores, 4);
      set({ step: "dilemmas", dilemmaIndex: 0, dilemmaOrder: order });
      return;
    }
    if (st.step === "dilemmas") {
      if (st.dilemmaIndex + 1 < st.dilemmaOrder.length) {
        set({ dilemmaIndex: st.dilemmaIndex + 1 });
        return;
      }
      set({ step: "profile" });
      return;
    }
    const idx = LINEAR.indexOf(st.step);
    if (idx >= 0 && idx + 1 < LINEAR.length) {
      set({ step: LINEAR[idx + 1] });
    }
  },

  prev: () => {
    const st = get();
    if (st.step === "dilemmas") {
      if (st.dilemmaIndex > 0) {
        set({ dilemmaIndex: st.dilemmaIndex - 1 });
        return;
      }
      set({ step: "power" });
      return;
    }
    if (st.step === "profile") {
      set({
        step: "dilemmas",
        dilemmaIndex: Math.max(0, st.dilemmaOrder.length - 1),
      });
      return;
    }
    if (st.step === "assocList") {
      set({ step: "profile" });
      return;
    }
    if (st.step === "intro") {
      set({ step: "welcome" });
      return;
    }
    const idx = LINEAR.indexOf(st.step);
    if (idx > 0) set({ step: LINEAR[idx - 1] });
  },

  hasCurrentSelection: () => {
    const st = get();
    switch (st.step) {
      case "love":
        return !!st.selections.love;
      case "hate":
        return !!st.selections.hate;
      case "future":
        return !!st.selections.future;
      case "feel":
        return !!st.selections.feel;
      case "power":
        return !!st.selections.power;
      case "dilemmas": {
        const dI = st.dilemmaOrder[st.dilemmaIndex];
        return dI !== undefined && !!st.selections.dilemmas[dI];
      }
      default:
        return true;
    }
  },

  computeScores: () => {
    const st = get();
    return scoresFrom(st.selections, st.dilemmaOrder);
  },

  reset: () =>
    set({
      step: "intro",
      dilemmaIndex: 0,
      dilemmaOrder: [],
      selections: initialSelections(),
    }),
}));
