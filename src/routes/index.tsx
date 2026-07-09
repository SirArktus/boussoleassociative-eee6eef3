import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import "@/main-fonts";
import { useGame } from "@/lib/game-store";
import {
  cardsLove,
  cardsHate,
  cardsFuture,
  cardsFeel,
  cardsPower,
  dilemmas,
  computeProfile,
  matchAssociations,
  type Card,
} from "@/lib/game-data";
import { Screen, Whisper, Title, Sub } from "@/components/game/Screen";
import { CardGrid, DuoCards } from "@/components/game/CardGrid";
import { Compass } from "@/components/game/Compass";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "La Boussole du bénévolat — Trouve l'association qui te ressemble" },
      {
        name: "description",
        content:
          "Un petit voyage de 3 minutes pour faire émerger l'envie et découvrir les associations qui te ressemblent.",
      },
      { property: "og:title", content: "La Boussole du bénévolat" },
      {
        property: "og:description",
        content: "Découvre en quelques minutes les associations qui te correspondent.",
      },
    ],
  }),
  component: GamePage,
});

function GamePage() {
  const step = useGame((s) => s.step);
  return (
    <main className="min-h-screen flex items-center justify-center">
      <AnimatePresence mode="wait">
        {step === "welcome" && <Welcome key="welcome" />}
        {step === "intro" && <Intro key="intro" />}
        {step === "love" && <PickOne key="love" title="Tu adores ?" whisper="On va apprendre à te connaître" sub="Si tu ne devais choisir qu'une seule de ces cartes." cards={cardsLove} next="hate" />}
        {step === "hate" && <PickOne key="hate" title="Tu détestes ?" whisper="Découvrons ce qui t'anime" sub="Une seule carte, celle qui te repousse le plus." cards={cardsHate} next="future" />}
        {step === "future" && <PickOne key="future" title="Dans un an, qui aimerais-tu devenir ?" whisper="Ton aventure commence" sub="Choisis ce qui te fait le plus vibrer." cards={cardsFuture} next="feel" columns={3} />}
        {step === "feel" && <PickOne key="feel" title="À la fin d'une activité idéale, je voudrais ressentir…" whisper="Tu prends une nouvelle direction" sub="Un seul ressenti, le plus juste pour toi." cards={cardsFeel} next="power" />}
        {step === "power" && <PickOne key="power" title="Quel super pouvoir aimerais-tu avoir ?" whisper="Ton profil prend forme…" sub="Choisis celui qui te ressemble." cards={cardsPower} next="compass1" />}
        {step === "compass1" && <CompassInterlude key="c1" text="Nous commençons à comprendre ce qui te fait vibrer…" next="dilemmas" />}
        {step === "dilemmas" && <DilemmasScreen key="d" />}
        {step === "compass2" && <CompassInterlude key="c2" text="Ton horizon se dessine…" next="profile" />}
        {step === "profile" && <ProfileScreen key="p" />}
        {step === "assocList" && <AssocList key="al" />}
        {step === "assocDetail" && <AssocDetail key="ad" />}
      </AnimatePresence>
    </main>
  );
}

// ---------- Screens ----------

function Welcome() {
  const goto = useGame((s) => s.goto);
  return (
    <Screen keyId="welcome">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6"
      >
        <Compass spinning={false} />
      </motion.div>
      <Whisper>La Boussole</Whisper>
      <Title>Trouve l'association qui te ressemble.</Title>
      <Sub>
        Un petit voyage de quelques minutes pour faire émerger l'envie. Pas de compte, pas de formulaire.
      </Sub>
      <div className="flex flex-col gap-3 w-full max-w-sm">
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => goto("intro")}
          className="w-full rounded-full py-4 px-6 font-semibold text-primary-foreground shadow-[var(--shadow-soft)]"
          style={{ background: "linear-gradient(135deg, oklch(0.78 0.15 40), oklch(0.72 0.16 25))" }}
        >
          ✨ Fais-moi découvrir !
        </motion.button>
        <a
          href="https://www.reze.fr/que-faire-a-reze/vie-associative-2/annuaire-des-associations/"
          target="_blank"
          rel="noreferrer"
          className="w-full text-center rounded-full py-4 px-6 font-medium border border-border/70 bg-card/70 backdrop-blur text-foreground hover:bg-card transition-colors"
        >
          Je sais ce que je cherche
        </a>
      </div>
    </Screen>
  );
}

function Intro() {
  const goto = useGame((s) => s.goto);
  return (
    <Screen keyId="intro">
      <Whisper>On y va, doucement</Whisper>
      <Title>En quelques minutes, nous allons découvrir les activités qui te ressemblent.</Title>
      <Sub>Aucune mauvaise réponse. Choisis simplement ce qui te parle le plus.</Sub>
      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => goto("love")}
        className="rounded-full py-4 px-10 font-semibold text-primary-foreground shadow-[var(--shadow-soft)]"
        style={{ background: "linear-gradient(135deg, oklch(0.78 0.15 40), oklch(0.72 0.16 25))" }}
      >
        Commencer
      </motion.button>
    </Screen>
  );
}

function PickOne({
  title,
  whisper,
  sub,
  cards,
  next,
  columns = 2,
}: {
  title: string;
  whisper: string;
  sub?: string;
  cards: Card[];
  next: Parameters<ReturnType<typeof useGame.getState>["goto"]>[0];
  columns?: 2 | 3;
}) {
  const goto = useGame((s) => s.goto);
  const addScore = useGame((s) => s.addScore);
  return (
    <Screen keyId={title}>
      <Whisper>{whisper}</Whisper>
      <Title>{title}</Title>
      {sub && <Sub>{sub}</Sub>}
      <CardGrid
        cards={cards}
        columns={columns}
        onPick={(c) => {
          addScore(c.scores);
          setTimeout(() => goto(next), 220);
        }}
      />
    </Screen>
  );
}

function CompassInterlude({ text, next }: { text: string; next: Parameters<ReturnType<typeof useGame.getState>["goto"]>[0] }) {
  const goto = useGame((s) => s.goto);
  useEffect(() => {
    const t = setTimeout(() => goto(next), 3800);
    return () => clearTimeout(t);
  }, [goto, next]);
  return (
    <Screen keyId={text}>
      <Compass spinning />
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-10 font-display text-2xl sm:text-3xl text-center text-foreground max-w-md"
      >
        {text}
      </motion.p>
    </Screen>
  );
}

function DilemmasScreen() {
  const idx = useGame((s) => s.dilemmaIndex);
  const nextDilemma = useGame((s) => s.nextDilemma);
  const addScore = useGame((s) => s.addScore);
  const goto = useGame((s) => s.goto);
  const d = dilemmas[idx];

  if (!d) {
    // safety: shouldn't render
    return null;
  }

  const pick = (c: Card) => {
    addScore(c.scores);
    if (idx + 1 >= dilemmas.length) {
      goto("compass2");
    } else {
      setTimeout(() => nextDilemma(), 200);
    }
  };

  return (
    <Screen keyId={`dilemma-${idx}`}>
      <Whisper>Dilemme {idx + 1} / {dilemmas.length}</Whisper>
      <Title>Tu préfères…</Title>
      <div className="h-6" />
      <DuoCards a={d.a} b={d.b} onPick={pick} />
    </Screen>
  );
}

function ProfileScreen() {
  const scores = useGame((s) => s.scores);
  const goto = useGame((s) => s.goto);
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
      <Whisper>Ton profil</Whisper>
      <Title>{profile.title}</Title>
      <div className="mt-4 mb-8 space-y-1.5 text-center text-lg text-foreground/80 max-w-md">
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
      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          useGame.getState().setAssocIndex(0);
          goto("assocList");
        }}
        className="rounded-full py-4 px-10 font-semibold text-primary-foreground shadow-[var(--shadow-soft)]"
        style={{ background: "linear-gradient(135deg, oklch(0.78 0.15 40), oklch(0.72 0.16 25))" }}
      >
        Découvrir mes associations →
      </motion.button>
    </Screen>
  );
}

function AssocList() {
  const scores = useGame((s) => s.scores);
  const idx = useGame((s) => s.assocIndex);
  const setAssocIndex = useGame((s) => s.setAssocIndex);
  const goto = useGame((s) => s.goto);
  const reset = useGame((s) => s.reset);
  const matches = useMemo(() => matchAssociations(scores), [scores]);
  const a = matches[idx];
  if (!a) return null;

  return (
    <Screen keyId={`assoc-${a.id}`}>
      <Whisper>Association {idx + 1} / {matches.length}</Whisper>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full rounded-3xl overflow-hidden bg-card border border-border/60 shadow-[var(--shadow-soft)]"
      >
        <div className={`h-40 sm:h-52 bg-gradient-to-br ${a.gradient} flex items-center justify-center`}>
          <span className="text-6xl sm:text-7xl drop-shadow-sm">{a.emoji}</span>
        </div>
        <div className="p-6 sm:p-7 space-y-3">
          <h2 className="font-display text-2xl sm:text-3xl text-foreground">{a.name}</h2>
          <p className="text-sm text-muted-foreground">{a.address}</p>
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
          <p className="text-foreground/85">{a.description}</p>
        </div>
      </motion.article>

      <div className="mt-6 flex flex-wrap gap-3 justify-center w-full">
        <button
          onClick={() => goto("assocDetail")}
          className="rounded-full py-3 px-6 font-semibold text-primary-foreground shadow-[var(--shadow-card)]"
          style={{ background: "linear-gradient(135deg, oklch(0.78 0.15 40), oklch(0.72 0.16 25))" }}
        >
          En savoir plus
        </button>
        <button
          onClick={() => setAssocIndex((idx + 1) % matches.length)}
          className="rounded-full py-3 px-6 font-medium border border-border/70 bg-card/70 backdrop-blur text-foreground hover:bg-card"
        >
          Suivant →
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

function AssocDetail() {
  const scores = useGame((s) => s.scores);
  const idx = useGame((s) => s.assocIndex);
  const goto = useGame((s) => s.goto);
  const matches = useMemo(() => matchAssociations(scores), [scores]);
  const a = matches[idx];
  if (!a) return null;

  return (
    <Screen keyId={`detail-${a.id}`}>
      <div className="w-full rounded-3xl overflow-hidden bg-card border border-border/60 shadow-[var(--shadow-soft)]">
        <div className={`h-44 sm:h-56 bg-gradient-to-br ${a.gradient} flex items-center justify-center`}>
          <span className="text-7xl drop-shadow-sm">{a.emoji}</span>
        </div>
        <div className="p-6 sm:p-8 space-y-5">
          <div>
            <h2 className="font-display text-3xl text-foreground">{a.name}</h2>
            <p className="text-muted-foreground italic mt-1">{a.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {a.keywords.map((k) => (
              <span key={k} className="text-xs font-medium px-3 py-1 rounded-full bg-accent/60 text-accent-foreground">
                {k}
              </span>
            ))}
          </div>
          <p className="text-foreground/85 leading-relaxed">{a.longDescription}</p>

          <dl className="grid sm:grid-cols-2 gap-4 text-sm">
            <Info label="Adresse" value={a.address} />
            <Info label="Horaires" value={a.hours} />
            <Info label="Contact" value={a.contact} />
            <Info label="Site" value={<a className="text-primary underline underline-offset-2" href={a.site} target="_blank" rel="noreferrer">{a.site.replace(/^https?:\/\//, "")}</a>} />
          </dl>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => goto("assocList")}
          className="rounded-full py-3 px-6 font-semibold text-primary-foreground shadow-[var(--shadow-card)]"
          style={{ background: "linear-gradient(135deg, oklch(0.78 0.15 40), oklch(0.72 0.16 25))" }}
        >
          ← D'autres associations ?
        </button>
      </div>
    </Screen>
  );
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-widest text-muted-foreground/80">{label}</dt>
      <dd className="mt-1 text-foreground">{value}</dd>
    </div>
  );
}
