import { create } from "zustand";
import {
  cardsLove,
  cardsHate,
  cardsFuture,
  cardsFeel,
  calculerScores,
  type Card,
  type Criterion,
  type Result,
} from "@/lib/game-data";

export type Step =
  | "welcome"
  | "intro"
  | "love"
  | "hate"
  | "future"
  | "feel"
  | "results";

export type PickKey = "love" | "hate" | "future" | "feel";

type Selections = Record<PickKey, string[]>;

type State = {
  step: Step;
  selections: Selections;
  goto: (s: Step) => void;
  toggleChoice: (key: PickKey, id: string) => void;
  next: () => void;
  prev: () => void;
  hasCurrentSelection: () => boolean;
  results: () => Result[];
  reset: () => void;
};

const LINEAR: Step[] = ["intro", "love", "hate", "future", "feel", "results"];

const initialSelections = (): Selections => ({
  love: [],
  hate: [],
  future: [],
  feel: [],
});

function criteriaOf(cards: Card[], ids: string[]): Criterion[] {
  return cards.filter((c) => ids.includes(c.id)).map((c) => c.criterion);
}

export const useGame = create<State>((set, get) => ({
  step: "welcome",
  selections: initialSelections(),

  goto: (step) => set({ step }),

  toggleChoice: (key, id) =>
    set((state) => {
      const current = state.selections[key];
      const nextList = current.includes(id)
        ? current.filter((x) => x !== id)
        : [...current, id];
      return { selections: { ...state.selections, [key]: nextList } };
    }),

  next: () => {
    const st = get();
    const idx = LINEAR.indexOf(st.step);
    if (idx >= 0 && idx + 1 < LINEAR.length) set({ step: LINEAR[idx + 1] });
  },

  prev: () => {
    const st = get();
    if (st.step === "intro") {
      set({ step: "welcome" });
      return;
    }
    const idx = LINEAR.indexOf(st.step);
    if (idx > 0) set({ step: LINEAR[idx - 1] });
  },

  hasCurrentSelection: () => {
    const st = get();
    const key = st.step as PickKey;
    if (key in st.selections) return st.selections[key].length > 0;
    return true;
  },

  results: () => {
    const sel = get().selections;
    const directs: Criterion[] = [
      ...criteriaOf(cardsLove, sel.love),
      ...criteriaOf(cardsFuture, sel.future),
      ...criteriaOf(cardsFeel, sel.feel),
    ];
    const detestes = criteriaOf(cardsHate, sel.hate);
    return calculerScores(directs, detestes, 5);
  },

  reset: () => set({ step: "intro", selections: initialSelections() }),
}));
