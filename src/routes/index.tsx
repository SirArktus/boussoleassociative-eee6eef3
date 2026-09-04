import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import "@/main-fonts";
import { useGame, type PickKey } from "@/lib/game-store";
import {
  cardsLove,
  cardsHate,
  cardsFuture,
  cardsFeel,
  type Card,
} from "@/lib/game-data";
import { Screen, Title, Sub, NavBar, AppHeader } from "@/components/game/Screen";
import { CardGrid } from "@/components/game/CardGrid";
import { Compass } from "@/components/game/Compass";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "La boussole associative — Trouve les associations qui te ressemblent",
      },
      {
        name: "description",
        content:
          "En 3 minutes, découvre les associations du Forum de Rezé faites pour toi. Pas d'inscription, juste quelques cartes à choisir.",
      },
      {
        property: "og:title",
        content:
          "La boussole associative — Trouve les associations qui te ressemblent",
      },
      {
        property: "og:description",
        content:
          "En 3 minutes, découvre les associations du Forum de Rezé faites pour toi. Pas d'inscription, juste quelques cartes à choisir.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GamePage,
});

function GamePage() {
  const step = useGame((s) => s.step);
  return (
    <main className="min-h-screen flex items-start justify-center">
      {step !== "welcome" && <AppHeader />}
      <AnimatePresence mode="wait">
        {step === "welcome" && <Welcome key="welcome" />}
        {step === "intro" && <Intro key="intro" />}
        {step === "love" && (
          <PickScreen key="love" stepKey="love" title="J'adore…" cards={cardsLove} />
        )}
        {step === "hate" && (
          <PickScreen key="hate" stepKey="hate" title="Je déteste…" cards={cardsHate} />
        )}
        {step === "future" && (
          <PickScreen
            key="future"
            stepKey="future"
            title="Dans un an, j'aimerais…"
            cards={cardsFuture}
            columns={3}
          />
        )}
        {step === "feel" && (
          <PickScreen
            key="feel"
            stepKey="feel"
            title="À la fin d'une activité, je veux ressentir…"
            cards={cardsFeel}
          />
        )}
        {step === "results" && <ResultsScreen key="results" />}
      </AnimatePresence>
    </main>
  );
}

// ---------- Écrans ----------

function Welcome() {
  const goto = useGame((s) => s.goto);
  useEffect(() => {
    const t = setTimeout(() => goto("intro"), 4500);
    return () => clearTimeout(t);
  }, [goto]);
  return (
    <Screen keyId="welcome">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8"
      >
        <Compass spinning />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="font-display text-4xl sm:text-5xl md:text-6xl text-center text-foreground leading-[1.05] mb-4"
      >
        La boussole associative
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="text-center text-muted-foreground max-w-md text-lg sm:text-xl"
      >
        Trouve les associations qui te ressemblent.
      </motion.p>
    </Screen>
  );
}

function Intro() {
  const next = useGame((s) => s.next);
  return (
    <Screen keyId="intro">
      <Title>En 3 minutes, je découvre les associations faites pour moi.</Title>
      <Sub>Pas d'inscription. Juste quelques cartes à choisir.</Sub>
      <div className="flex flex-col gap-3 w-full max-w-sm">
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={next}
          className="w-full rounded-full py-4 px-6 font-semibold text-primary-foreground shadow-[var(--shadow-soft)]"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.78 0.15 40), oklch(0.72 0.16 25))",
          }}
        >
          ✨ Lançons la recherche !
        </motion.button>
        <a
          href="https://www.reze.fr/que-faire-a-reze/vie-associative-2/annuaire-des-associations/"
          target="_blank"
          rel="noreferrer"
          className="w-full text-center rounded-full py-4 px-6 font-medium border border-border/70 bg-card/70 backdrop-blur text-foreground hover:bg-card transition-colors"
        >
          Je sais déjà ce que je veux
        </a>
      </div>
    </Screen>
  );
}

function PickScreen({
  stepKey,
  title,
  cards,
  columns = 2,
}: {
  stepKey: PickKey;
  title: string;
  cards: Card[];
  columns?: 2 | 3;
}) {
  const toggleChoice = useGame((s) => s.toggleChoice);
  const next = useGame((s) => s.next);
  const prev = useGame((s) => s.prev);
  const selectedIds = useGame((s) => s.selections[stepKey]);
  return (
    <Screen keyId={stepKey}>
      <Title>{title}</Title>
      <p className="text-sm text-muted-foreground/80 mt-2">
        Je peux choisir plusieurs cartes.
      </p>
      <div className="h-4" />
      <CardGrid
        cards={cards}
        columns={columns}
        selectedIds={selectedIds}
        onPick={(c) => toggleChoice(stepKey, c.id)}
      />
      <NavBar
        onPrev={prev}
        onNext={next}
        nextDisabled={selectedIds.length === 0}
        nextLabel={stepKey === "feel" ? "Voir mes associations" : "Suivant"}
      />
    </Screen>
  );
}

const MEDALS = ["🥇", "🥈", "🥉", "4.", "5."];

function ResultsScreen() {
  const compute = useGame((s) => s.results);
  const prev = useGame((s) => s.prev);
  const reset = useGame((s) => s.reset);
  const results = useMemo(() => compute(), [compute]);
  return (
    <Screen keyId="results">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Compass spinning={false} />
      </motion.div>
      <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground/80 mt-6 mb-2">
        Mes associations
      </p>
      <Title>Voici ce qui me ressemble.</Title>
      <Sub>Rendez-vous sur leur stand au Forum des associations.</Sub>

      <div className="space-y-3 w-full max-w-xl">
        {results.map((r, i) => (
          <motion.article
            key={r.nom}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full rounded-3xl bg-card border border-border/60 shadow-[var(--shadow-card)] p-5 flex items-center gap-4"
          >
            <span className="text-2xl w-9 shrink-0 text-center">{MEDALS[i]}</span>
            <h2 className="font-display text-xl sm:text-2xl text-foreground flex-1 leading-tight">
              {r.nom}
            </h2>
            <span className="text-sm font-medium px-3 py-1 rounded-full bg-accent/60 text-accent-foreground whitespace-nowrap">
              Stand {r.stand}
            </span>
          </motion.article>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3 justify-center w-full">
        <button
          onClick={prev}
          className="rounded-full py-3 px-6 font-medium border border-border/70 bg-card/70 backdrop-blur text-foreground hover:bg-card transition-colors"
        >
          ← Précédent
        </button>
        <button
          onClick={reset}
          className="rounded-full py-3 px-6 font-medium text-muted-foreground hover:text-foreground"
        >
          ↻ Rejouer
        </button>
      </div>
    </Screen>
  );
}
