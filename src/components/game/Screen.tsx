import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function AppHeader() {
  return (
    <div className="fixed top-0 left-0 right-0 z-20 py-4 text-center pointer-events-none">
      <span className="font-display text-sm sm:text-base tracking-wide text-muted-foreground/80">
        La boussole associative
      </span>
    </div>
  );
}

export function Screen({
  children,
  keyId,
}: {
  children: ReactNode;
  keyId: string;
}) {
  return (
    <motion.div
      key={keyId}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-2xl mx-auto px-5 pt-20 pb-10 flex flex-col items-center"
    >
      {children}
    </motion.div>
  );
}

export function Title({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-center text-foreground leading-[1.1] mb-2">
      {children}
    </h1>
  );
}

export function Sub({ children }: { children: ReactNode }) {
  return (
    <p className="text-center text-muted-foreground max-w-md mb-8 text-base sm:text-lg">
      {children}
    </p>
  );
}

export function NavBar({
  onPrev,
  onNext,
  nextDisabled = false,
  nextLabel = "Suivant",
  showPrev = true,
  showNext = true,
  prevLabel = "Précédent",
}: {
  onPrev?: () => void;
  onNext?: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
  showPrev?: boolean;
  showNext?: boolean;
  prevLabel?: string;
}) {
  return (
    <div className="mt-10 flex items-center justify-between w-full max-w-md gap-4">
      {showPrev ? (
        <button
          type="button"
          onClick={onPrev}
          className="rounded-full py-3 px-5 font-medium border border-border/70 bg-card/70 backdrop-blur text-foreground hover:bg-card transition-colors"
        >
          ← {prevLabel}
        </button>
      ) : (
        <span />
      )}
      {showNext ? (
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className="rounded-full py-3 px-6 font-semibold text-primary-foreground shadow-[var(--shadow-card)] disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.78 0.15 40), oklch(0.72 0.16 25))",
          }}
        >
          {nextLabel} →
        </button>
      ) : (
        <span />
      )}
    </div>
  );
}
