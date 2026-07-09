import { motion } from "framer-motion";

export function Compass({ spinning = true }: { spinning?: boolean }) {
  return (
    <div className="relative w-52 h-52 sm:w-64 sm:h-64">
      {/* Halo */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.95 0.08 55 / 0.6) 0%, transparent 65%)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Dial */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[oklch(0.98_0.03_75)] to-[oklch(0.9_0.07_55)] shadow-[var(--shadow-soft)] border border-white/70" />
      {/* Cardinal points */}
      <div className="absolute inset-4 rounded-full flex items-center justify-center">
        {["N", "E", "S", "O"].map((p, i) => (
          <span
            key={p}
            className="absolute text-xs font-semibold text-muted-foreground/80"
            style={{
              transform: `rotate(${i * 90}deg) translateY(-42%) rotate(-${i * 90}deg)`,
            }}
          >
            {p}
          </span>
        ))}
      </div>
      {/* Needle */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={spinning ? { rotate: [0, 380, 720, 1040, 1180] } : { rotate: 45 }}
        transition={
          spinning
            ? { duration: 4.5, ease: [0.22, 1, 0.36, 1] }
            : { duration: 0.6 }
        }
      >
        <div
          className="w-1.5 h-24 sm:h-28 rounded-full"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.7 0.18 30) 0%, oklch(0.7 0.18 30) 50%, oklch(0.55 0.03 260) 50%, oklch(0.55 0.03 260) 100%)",
          }}
        />
      </motion.div>
      {/* Center pin */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-foreground/80 shadow-inner" />
      </div>
    </div>
  );
}
