import { motion } from "framer-motion";
import type { Card } from "@/lib/game-data";

type Props = {
  cards: Card[];
  onPick: (c: Card) => void;
  selectedIds?: string[];
};

export function CardGrid({ cards, onPick, selectedIds = [] }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full">
      {cards.map((c, i) => {
        const isSelected = selectedIds.includes(c.id);
        const isOrphan = i === cards.length - 1 && cards.length % 3 === 1;
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
            className={`group relative overflow-hidden rounded-2xl bg-card p-2.5 sm:p-3 text-left aspect-square flex flex-col items-center justify-center gap-1 text-center transition-all ${
              isOrphan ? "col-start-2" : ""
            } ${
              isSelected
                ? "border-2 border-primary shadow-[var(--shadow-soft)] ring-4 ring-primary/20"
                : "border border-border/60 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)]"
            }`}
          >
            <div className="text-2xl sm:text-3xl">{c.emoji}</div>
            <div className="font-display text-xs sm:text-sm leading-tight text-foreground">
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
