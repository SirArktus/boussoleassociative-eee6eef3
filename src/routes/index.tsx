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
  cardsPower,
  dilemmas as allDilemmas,
  computeProfile,
  matchAssociations,
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
          "En 3 minutes, découvre les associations faites pour toi. Pas d'inscription, juste quelques cartes à choisir.",
      },
      {
        property: "og:title",
        content:
          "La boussole associative — Trouve les associations qui te ressemblent",
      },
      {
        property: "og:description",
        content:
          "En 3 minutes, découvre les associations faites pour toi. Pas d'inscription, juste quelques cartes à choisir.",
      },
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
        {step === "power" && (
          <PickScreen
            key="power"
            stepKey="power"
            title="Mon super pouvoir ?"
            cards={cardsPower}
          />
        )}
        {step === "dilemmas" && <DilemmasScreen key="dilemmas" />}
        {step === "profile" && <ProfileScreen key="profile" />}
        {step === "assocList" && <AssocFeed key="assocList" />}
      </AnimatePresence>
    </main>
  );
}

// ---------- Screens ----------

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
  const setChoice = useGame((s) => s.setChoice);
  const next = useGame((s) => s.next);
  const prev = useGame((s) => s.prev);
  const selectedId = useGame((s) => s.selections[stepKey]);
  return (
    <Screen keyId={stepKey}>
      <Title>{title}</Title>
      <div className="h-4" />
      <CardGrid
        cards={cards}
        columns={columns}
        selectedId={selectedId}
        onPick={(c) => setChoice(stepKey, c.id)}
      />
      <NavBar onPrev={prev} onNext={next} nextDisabled={!selectedId} />
    </Screen>
  );
}

function DilemmasScreen() {
  const idx = useGame((s) => s.dilemmaIndex);
  const order = useGame((s) => s.dilemmaOrder);
  const dilemmaSelections = useGame((s) => s.selections.dilemmas);
  const setDilemmaChoice = useGame((s) => s.setDilemmaChoice);
  const next = useGame((s) => s.next);
  const prev = useGame((s) => s.prev);

  const dIdx = order[idx];
  const d = dIdx !== undefined ? allDilemmas[dIdx] : undefined;
  if (!d) return null;
  const selectedId = dilemmaSelections[dIdx];
  const cards: Card[] = [d.a, d.b];

  return (
    <Screen keyId={`dilemma-${idx}`}>
      <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground/80 mb-3">
        {idx + 1} / {order.length}
      </p>
      <Title>Je préfère…</Title>
      <div className="h-4" />
      <CardGrid
        cards={cards}
        columns={2}
        selectedId={selectedId}
        onPick={(c) => setDilemmaChoice(c.id)}
      />
      <NavBar onPrev={prev} onNext={next} nextDisabled={!selectedId} />
    </Screen>
  );
}

function ProfileScreen() {
  const computeScores = useGame((s) => s.computeScores);
  const next = useGame((s) => s.next);
  const prev = useGame((s) => s.prev);
  const scores = computeScores();
  const profile = useMemo(() => computeProfile(scores), [scores]);
  return (
    <Screen keyId="profile">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Compass spinning={false} />
      </motion.div>
      <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground/80 mt-6 mb-2">
        Mon profil
      </p>
      <Title>{profile.title}</Title>
      <div className="mt-4 mb-2 space-y-1.5 text-center text-lg text-foreground/80 max-w-md">
        {profile.lines.map((l, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
          >
            {l}
          </motion.p>
        ))}
      </div>
      <NavBar onPrev={prev} onNext={next} nextLabel="Voir mes associations" />
    </Screen>
  );
}

function AssocFeed() {
  const computeScores = useGame((s) => s.computeScores);
  const prev = useGame((s) => s.prev);
  const reset = useGame((s) => s.reset);
  const scores = computeScores();
  const matches = useMemo(() => matchAssociations(scores), [scores]);
  return (
    <Screen keyId="assoc-feed">
      <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground/80 mb-2">
        Mes associations
      </p>
      <Title>Voici ce qui me ressemble.</Title>
      <Sub>Fais défiler pour découvrir chaque association.</Sub>

      <div className="space-y-6 w-full">
        {matches.map((a, i) => (
          <motion.article
            key={a.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: i * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full rounded-3xl overflow-hidden bg-card border border-border/60 shadow-[var(--shadow-soft)]"
          >
            <div
              className={`h-32 sm:h-40 bg-gradient-to-br ${a.gradient} flex items-center justify-center`}
            >
              <span className="text-6xl drop-shadow-sm">{a.emoji}</span>
            </div>
            <div className="p-5 sm:p-6 space-y-3">
              <div>
                <h2 className="font-display text-2xl text-foreground">
                  {a.name}
                </h2>
                <p className="text-sm text-muted-foreground italic mt-0.5">
                  {a.tagline}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {a.keywords.map((k) => (
                  <span
                    key={k}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-accent/60 text-accent-foreground"
                  >
                    {k}
                  </span>
                ))}
              </div>
              <p className="text-foreground/85 leading-relaxed">
                {a.longDescription}
              </p>
              <dl className="grid sm:grid-cols-2 gap-3 text-sm pt-3 border-t border-border/50 mt-2">
                <Info label="Adresse" value={a.address} />
                <Info label="Horaires" value={a.hours} />
                <Info label="Contact" value={a.contact} />
                <Info
                  label="Site"
                  value={
                    <a
                      className="text-primary underline underline-offset-2"
                      href={a.site}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {a.site.replace(/^https?:\/\//, "")}
                    </a>
                  }
                />
              </dl>
            </div>
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

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-widest text-muted-foreground/80">
        {label}
      </dt>
      <dd className="mt-1 text-foreground">{value}</dd>
    </div>
  );
}
