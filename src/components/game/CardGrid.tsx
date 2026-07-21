import { motion } from "framer-motion";
import type { Card } from "@/lib/game-data";

type Props = {
  cards: Card[];
  onPick: (c: Card) => void;
  columns?: 2 | 3;
  selectedId?: string;
};

export function CardGrid({ cards, onPick, columns = 2, selectedId }: Props) {
  const cols = columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  return (
    <div className={`grid grid-cols-2 ${cols} gap-3 sm:gap-4 w-full`}>
      {cards.map((c, i) => {
        const isSelected = selectedId === c.id;
        return (
          <motion.button
            key={c.id}
            type="button"
            onClick={() => onPick(c)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className={`group relative overflow-hidden rounded-3xl bg-card p-5 sm:p-6 text-left aspect-[3/4] sm:aspect-[4/5] flex flex-col justify-between transition-all ${
              isSelected
                ? "border-2 border-primary shadow-[var(--shadow-soft)] ring-4 ring-primary/20"
                : "border border-border/60 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)]"
            }`}
          >
            <div className="text-4xl sm:text-5xl">{c.emoji}</div>
            <div className="font-display text-lg sm:text-xl leading-tight text-foreground">
              {c.label}
            </div>
            <div
              className={`absolute inset-0 pointer-events-none transition-opacity bg-gradient-to-br from-[oklch(0.9_0.09_55/0.25)] to-transparent ${
                isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            />
          </motion.button>
        );
      })}
    </div>
  );
}
