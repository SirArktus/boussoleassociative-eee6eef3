import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Screen({ children, keyId }: { children: ReactNode; keyId: string }) {
  return (
    <motion.div
      key={keyId}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-2xl mx-auto px-5 py-8 flex flex-col items-center"
    >
      {children}
    </motion.div>
  );
}

export function Whisper({ children }: { children: ReactNode }) {
  return (
    <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground/80 mb-3">
      {children}
    </p>
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
