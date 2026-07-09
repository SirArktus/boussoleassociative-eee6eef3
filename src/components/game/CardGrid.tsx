import { motion } from "framer-motion";
import type { Card } from "@/lib/game-data";

type Props = {
  cards: Card[];
  onPick: (c: Card) => void;
  columns?: 2 | 3;
};

export function CardGrid({ cards, onPick, columns = 2 }: Props) {
  const cols = columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  return (
    <div className={`grid grid-cols-2 ${cols} gap-3 sm:gap-4 w-full`}>
      {cards.map((c, i) => (
        <motion.button
          key={c.id}
          type="button"
          onClick={() => onPick(c)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="group relative overflow-hidden rounded-3xl bg-card border border-border/60 p-5 sm:p-6 text-left aspect-[3/4] sm:aspect-[4/5] flex flex-col justify-between shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-shadow"
        >
          <div className="text-4xl sm:text-5xl">{c.emoji}</div>
          <div className="font-display text-lg sm:text-xl leading-tight text-foreground">
            {c.label}
          </div>
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-[oklch(0.9_0.09_55/0.25)] to-transparent" />
        </motion.button>
      ))}
    </div>
  );
}

export function DuoCards({
  a,
  b,
  onPick,
}: {
  a: Card;
  b: Card;
  onPick: (c: Card) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 w-full">
      {[a, b].map((c, i) => (
        <motion.button
          key={c.id}
          type="button"
          onClick={() => onPick(c)}
          initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="relative overflow-hidden rounded-3xl border border-border/60 p-6 aspect-[3/4] flex flex-col items-center justify-center text-center gap-4 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-shadow"
          style={{
            background:
              i === 0
                ? "linear-gradient(155deg, oklch(0.95 0.05 55), oklch(0.9 0.08 30))"
                : "linear-gradient(155deg, oklch(0.94 0.05 230), oklch(0.9 0.08 260))",
          }}
        >
          <div className="text-6xl sm:text-7xl">{c.emoji}</div>
          <div className="font-display text-xl sm:text-2xl text-foreground leading-tight">
            {c.label}
          </div>
        </motion.button>
      ))}
    </div>
  );
}
