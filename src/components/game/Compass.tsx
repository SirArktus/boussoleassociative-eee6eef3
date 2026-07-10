import { motion } from "framer-motion";

export function Compass({ spinning = true }: { spinning?: boolean }) {
  return (
    <div className="relative w-52 h-52 sm:w-64 sm:h-64 flex items-center justify-center">
      {/* Halo Glow */}
      <motion.div
        className="absolute w-48 h-48 sm:w-60 sm:h-60 rounded-full"
        style={{
          background: "linear-gradient(to top right, var(--peach), var(--sky))",
          filter: "blur(24px)",
        }}
        animate={{
          opacity: [0.35, 0.55, 0.35],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main Disk */}
      <div className="relative w-44 h-44 sm:w-56 sm:h-56 bg-white/40 backdrop-blur-md border-4 border-white/60 rounded-full shadow-[var(--shadow-soft)] flex items-center justify-center">
        {/* Decorative tick marks */}
        <div className="absolute inset-3 sm:inset-4 rounded-full border border-foreground/5" />

        {/* Cardinal points — N/S */}
        <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between items-center text-foreground/60 font-bold tracking-widest text-base sm:text-lg">
          <span className="pt-1">N</span>
          <span className="pb-1">S</span>
        </div>

        {/* Cardinal points — E/O */}
        <div className="absolute inset-0 p-4 sm:p-5 flex justify-between items-center text-foreground/60 font-bold tracking-widest text-base sm:text-lg">
          <span className="pl-1">O</span>
          <span className="pr-1">E</span>
        </div>

        {/* Compass Needle */}
        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          animate={spinning ? { rotate: 360 } : { rotate: 45 }}
          transition={
            spinning
              ? { duration: 15, repeat: Infinity, ease: "linear" }
              : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
          }
        >
          <div className="relative flex flex-col items-center">
            {/* North half (coral) */}
            <div
              className="w-0 h-0 drop-shadow-sm"
              style={{
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderBottom: "80px solid oklch(0.75 0.15 40)",
              }}
            />
            {/* South half (slate) */}
            <div
              className="w-0 h-0 drop-shadow-sm"
              style={{
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderTop: "80px solid oklch(0.28 0.05 260 / 0.2)",
              }}
            />
          </div>
        </motion.div>

        {/* Center Pin */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-white rounded-full shadow-sm flex items-center justify-center">
            <div className="w-2 h-2 bg-foreground rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
