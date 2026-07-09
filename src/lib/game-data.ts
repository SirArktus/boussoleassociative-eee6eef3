// Score axes used to match player answers to associations
export type Axis =
  | "rencontre"   // social / meeting people
  | "utilite"     // being useful / solidarity
  | "depassement" // self-challenge, sport
  | "creation"    // creating, arts, crafts
  | "fun"         // fun, playful
  | "savoir"      // learning, culture
  | "performance" // competition, performance
  | "nature"      // outdoors, environment
  | "calme"       // serenity, quiet
  | "collectif";  // teamwork

export type Scores = Record<Axis, number>;

export const emptyScores = (): Scores => ({
  rencontre: 0, utilite: 0, depassement: 0, creation: 0, fun: 0,
  savoir: 0, performance: 0, nature: 0, calme: 0, collectif: 0,
});

export type Card = {
  id: string;
  label: string;
  emoji: string;
  scores: Partial<Scores>;
};

// -------- Screen 3 : Tu adores ? --------
export const cardsLove: Card[] = [
  { id: "l-rencontre", label: "Rencontrer des gens", emoji: "🫂", scores: { rencontre: 3, collectif: 1 } },
  { id: "l-utile",     label: "Être utile",           emoji: "🤝", scores: { utilite: 3, collectif: 1 } },
  { id: "l-depasser",  label: "Se dépasser",          emoji: "⛰️", scores: { depassement: 3, performance: 1 } },
  { id: "l-creer",     label: "Créer",                emoji: "🎨", scores: { creation: 3 } },
  { id: "l-amuser",    label: "S'amuser",             emoji: "🎉", scores: { fun: 3, rencontre: 1 } },
  { id: "l-comprendre",label: "Comprendre",           emoji: "🔍", scores: { savoir: 3 } },
  { id: "l-performer", label: "Performer",            emoji: "🏆", scores: { performance: 3, depassement: 1 } },
];

// -------- Screen 4 : Tu détestes ? (negative scores) --------
export const cardsHate: Card[] = [
  { id: "h-attendre", label: "Attendre",         emoji: "⏳", scores: { calme: -2, fun: 1 } },
  { id: "h-lire",     label: "Lire",             emoji: "📖", scores: { savoir: -2, depassement: 1 } },
  { id: "h-transp",   label: "Transpirer",       emoji: "💦", scores: { depassement: -3, calme: 1 } },
  { id: "h-parler",   label: "Parler",           emoji: "🗣️", scores: { rencontre: -2, creation: 1 } },
  { id: "h-foules",   label: "Les foules",       emoji: "👥", scores: { rencontre: -2, calme: 2, nature: 1 } },
  { id: "h-interieur",label: "Être en intérieur",emoji: "🏠", scores: { nature: 3, depassement: 1 } },
];

// -------- Screen 5 : Dans un an, qui aimerais-tu devenir ? --------
export const cardsFuture: Card[] = [
  { id: "f-parler100", label: "Parler devant 100 personnes", emoji: "🎤", scores: { performance: 2, rencontre: 1 } },
  { id: "f-defendre",  label: "Me défendre",                 emoji: "🥋", scores: { depassement: 2, performance: 1 } },
  { id: "f-musique",   label: "Jouer une musique",           emoji: "🎸", scores: { creation: 2, performance: 1 } },
  { id: "f-organiser", label: "Organiser un événement",      emoji: "🗓️", scores: { collectif: 2, rencontre: 1 } },
  { id: "f-velo",      label: "Faire 50 km à vélo",          emoji: "🚴", scores: { depassement: 2, nature: 1 } },
  { id: "f-amis",      label: "Me faire de vrais amis",      emoji: "💫", scores: { rencontre: 3, collectif: 1 } },
  { id: "f-records",   label: "Battre des records",          emoji: "🥇", scores: { performance: 3, depassement: 1 } },
];

// -------- Screen 6 : À la fin d'une activité idéale --------
export const cardsFeel: Card[] = [
  { id: "e-fierte",    label: "De la fierté",    emoji: "🌟", scores: { performance: 2, depassement: 1 } },
  { id: "e-serenite",  label: "De la sérénité",  emoji: "🕊️", scores: { calme: 3, nature: 1 } },
  { id: "e-fun",       label: "Du fun",          emoji: "😄", scores: { fun: 3, rencontre: 1 } },
  { id: "e-gratitude", label: "De la gratitude", emoji: "🙏", scores: { utilite: 3 } },
  { id: "e-surprise",  label: "De la surprise",  emoji: "✨", scores: { creation: 2, savoir: 1 } },
  { id: "e-energie",   label: "De l'énergie",    emoji: "⚡", scores: { depassement: 2, fun: 1 } },
];

// -------- Screen 7 : Quel super pouvoir ? --------
export const cardsPower: Card[] = [
  { id: "p-comprendre", label: "Comprendre tout",             emoji: "🧠", scores: { savoir: 3 } },
  { id: "p-aider",      label: "Aider tout le monde",         emoji: "💗", scores: { utilite: 3, collectif: 1 } },
  { id: "p-rire",       label: "Faire rire",                  emoji: "🤡", scores: { fun: 3, rencontre: 1 } },
  { id: "p-oeuvres",    label: "Créer des œuvres",            emoji: "🖌️", scores: { creation: 3 } },
  { id: "p-courir",     label: "Courir sans jamais fatiguer", emoji: "🏃", scores: { depassement: 3, performance: 1 } },
  { id: "p-planete",    label: "Protéger la planète",         emoji: "🌍", scores: { nature: 3, utilite: 1 } },
];

// -------- Screen 9 : Dilemmes "Tu préfères…" --------
export type Dilemma = { a: Card; b: Card };

export const dilemmas: Dilemma[] = [
  {
    a: { id: "d1a", label: "Être très cultivé", emoji: "📚", scores: { savoir: 2 } },
    b: { id: "d1b", label: "Être très sportif", emoji: "🏋️", scores: { depassement: 2 } },
  },
  {
    a: { id: "d2a", label: "Aider les autres", emoji: "🫶", scores: { utilite: 2 } },
    b: { id: "d2b", label: "Créer quelque chose", emoji: "🎭", scores: { creation: 2 } },
  },
  {
    a: { id: "d3a", label: "Voyager partout", emoji: "🌍", scores: { nature: 1, rencontre: 1 } },
    b: { id: "d3b", label: "Maîtriser un instrument", emoji: "🎹", scores: { creation: 2, performance: 1 } },
  },
  {
    a: { id: "d4a", label: "La nature", emoji: "🌲", scores: { nature: 2, calme: 1 } },
    b: { id: "d4b", label: "La scène", emoji: "🎬", scores: { performance: 2, creation: 1 } },
  },
  {
    a: { id: "d5a", label: "En équipe", emoji: "👯", scores: { collectif: 2, rencontre: 1 } },
    b: { id: "d5b", label: "En solo", emoji: "🚶", scores: { calme: 1, creation: 1 } },
  },
  {
    a: { id: "d6a", label: "Se dépasser", emoji: "🔥", scores: { depassement: 2 } },
    b: { id: "d6b", label: "Aider les autres", emoji: "🌈", scores: { utilite: 2 } },
  },
  {
    a: { id: "d7a", label: "Dormir sous une tente", emoji: "⛺", scores: { nature: 2, depassement: 1 } },
    b: { id: "d7b", label: "Une soirée au théâtre", emoji: "🎭", scores: { creation: 1, savoir: 1 } },
  },
  {
    a: { id: "d8a", label: "Construire une cabane", emoji: "🏕️", scores: { creation: 1, nature: 1 } },
    b: { id: "d8b", label: "Écrire une histoire", emoji: "📝", scores: { creation: 2, calme: 1 } },
  },
];

// -------- Profile archetypes --------
export type Profile = { title: string; lines: string[] };

export function computeProfile(scores: Scores): Profile {
  const top = topAxes(scores, 2);
  const [a, b] = top;
  const label = (ax: Axis) => ({
    rencontre: "Rassembleur",
    utilite: "Solidaire",
    depassement: "Aventurier",
    creation: "Créatif",
    fun: "Enjoué",
    savoir: "Curieux",
    performance: "Compétiteur",
    nature: "Amoureux du dehors",
    calme: "Contemplatif",
    collectif: "Bâtisseur d'équipe",
  }[ax]);

  const title = `Tu es un Explorateur ${label(a)} & ${label(b).toLowerCase()}.`;
  const lines = [
    a === "savoir" || b === "savoir" ? "Tu aimes apprendre." : "Tu avances à ton rythme.",
    a === "rencontre" || b === "rencontre" || a === "collectif" || b === "collectif"
      ? "Tu apprécies les rencontres."
      : "Tu sais aussi savourer la solitude.",
    a === "creation" || b === "creation"
      ? "Tu préfères créer plutôt qu'exécuter."
      : a === "utilite" || b === "utilite"
        ? "Tu cherches du sens dans ce que tu fais."
        : "Tu aimes voir des résultats concrets.",
    "Tu recherches une activité où tu pourras progresser avec les autres.",
  ];
  return { title, lines };
}

export function topAxes(scores: Scores, n = 3): Axis[] {
  return (Object.entries(scores) as [Axis, number][])
    .sort((x, y) => y[1] - x[1])
    .slice(0, n)
    .map((e) => e[0]);
}

// -------- Associations (fictitious but credible, Rezé area) --------
export type Association = {
  id: string;
  name: string;
  tagline: string;
  keywords: [string, string, string];
  description: string;
  longDescription: string;
  address: string;
  site: string;
  hours: string;
  contact: string;
  emoji: string;
  gradient: string; // tailwind classes for the card banner
  scores: Partial<Scores>;
};

export const associations: Association[] = [
  {
    id: "les-mains-vertes",
    name: "Les Mains Vertes de Rezé",
    tagline: "Jardins partagés & permaculture",
    keywords: ["Nature", "Collectif", "Utile"],
    description: "Cultivez ensemble un potager de quartier ouvert à tous.",
    longDescription:
      "Depuis 2016, Les Mains Vertes animent trois jardins partagés à Rezé. On sème, on récolte, on partage un goûter le samedi matin. Aucune expérience requise, juste l'envie de mettre les mains dans la terre.",
    address: "12 rue des Naudières, 44400 Rezé",
    site: "https://mainsvertes-reze.example",
    hours: "Samedi 10h–12h, mercredi 17h–19h",
    contact: "contact@mainsvertes-reze.example",
    emoji: "🌱",
    gradient: "from-[oklch(0.92_0.09_140)] to-[oklch(0.88_0.07_80)]",
    scores: { nature: 3, collectif: 2, utilite: 2, calme: 1 },
  },
  {
    id: "atelier-boussole",
    name: "L'Atelier Boussole",
    tagline: "Bricolage, réparation, DIY",
    keywords: ["Créer", "Bricoler", "Réparer"],
    description: "Un atelier partagé pour réparer, fabriquer, inventer.",
    longDescription:
      "Un vrai repair café doublé d'un fablab associatif. Outils, machines à coudre, imprimante 3D et surtout des bénévoles qui adorent transmettre. On répare son grille-pain, on construit une étagère, on apprend la soudure.",
    address: "45 avenue de la Libération, 44400 Rezé",
    site: "https://atelier-boussole.example",
    hours: "Mardi–vendredi 14h–19h, samedi 10h–18h",
    contact: "hello@atelier-boussole.example",
    emoji: "🔧",
    gradient: "from-[oklch(0.9_0.08_55)] to-[oklch(0.85_0.11_30)]",
    scores: { creation: 3, savoir: 1, utilite: 1 },
  },
  {
    id: "reze-solidarite",
    name: "Rezé Solidarité",
    tagline: "Distribution alimentaire & écoute",
    keywords: ["Utile", "Écoute", "Solidaire"],
    description: "Accompagner les personnes en précarité près de chez soi.",
    longDescription:
      "Chaque semaine, une trentaine de bénévoles organisent une distribution alimentaire et un temps café. Missions variées : logistique, accueil, écoute, cours de français.",
    address: "8 rue Jean Jaurès, 44400 Rezé",
    site: "https://reze-solidarite.example",
    hours: "Lundi, jeudi 9h–12h",
    contact: "benevoles@reze-solidarite.example",
    emoji: "🤝",
    gradient: "from-[oklch(0.88_0.09_25)] to-[oklch(0.85_0.09_10)]",
    scores: { utilite: 3, rencontre: 2, collectif: 2 },
  },
  {
    id: "trail-loire",
    name: "Trail Loire Sud",
    tagline: "Course nature & aventures",
    keywords: ["Sport", "Nature", "Dépassement"],
    description: "Courir en bord de Loire, du 5 km à l'ultra.",
    longDescription:
      "Groupe convivial de coureurs et coureuses de tous niveaux. Sorties le mardi soir et le dimanche matin. On accompagne les débutants comme les traileurs confirmés.",
    address: "Parc de la Morinière, 44400 Rezé",
    site: "https://trailloire.example",
    hours: "Mardi 19h, dimanche 9h",
    contact: "info@trailloire.example",
    emoji: "🏃",
    gradient: "from-[oklch(0.88_0.1_230)] to-[oklch(0.85_0.11_180)]",
    scores: { depassement: 3, nature: 2, performance: 2 },
  },
  {
    id: "cie-des-etoiles",
    name: "La Compagnie des Étoiles",
    tagline: "Théâtre amateur & impro",
    keywords: ["Scène", "Créer", "Groupe"],
    description: "Monter sur scène sans se prendre au sérieux.",
    longDescription:
      "Troupe amateur qui monte deux spectacles par an et anime des ateliers d'improvisation. Ambiance familiale, pas besoin d'expérience — juste de l'envie de jouer.",
    address: "Salle Diapason, 44400 Rezé",
    site: "https://cie-etoiles.example",
    hours: "Lundi 20h, mercredi 20h",
    contact: "troupe@cie-etoiles.example",
    emoji: "🎭",
    gradient: "from-[oklch(0.85_0.12_320)] to-[oklch(0.88_0.09_290)]",
    scores: { creation: 3, performance: 2, rencontre: 2, fun: 1 },
  },
  {
    id: "harmonie-reze",
    name: "Harmonie de Rezé",
    tagline: "Orchestre d'harmonie",
    keywords: ["Musique", "Collectif", "Scène"],
    description: "Jouer d'un instrument à vent ou à percussion en orchestre.",
    longDescription:
      "Ouvert dès le niveau fin de 2e cycle. Répétitions hebdomadaires, deux concerts publics par an et des sorties musicales à travers la région.",
    address: "École de musique, 44400 Rezé",
    site: "https://harmonie-reze.example",
    hours: "Vendredi 20h–22h",
    contact: "harmonie@musique-reze.example",
    emoji: "🎺",
    gradient: "from-[oklch(0.88_0.1_65)] to-[oklch(0.85_0.12_40)]",
    scores: { creation: 2, collectif: 3, performance: 2 },
  },
  {
    id: "eco-loire",
    name: "Éco-Loire",
    tagline: "Protection de la biodiversité",
    keywords: ["Nature", "Utile", "Terrain"],
    description: "Chantiers nature et sensibilisation en bord de Loire.",
    longDescription:
      "Nettoyages de berges, comptages d'espèces, animations pédagogiques. Une association pour agir concrètement pour l'environnement en équipe.",
    address: "Bord de Loire, 44400 Rezé",
    site: "https://ecoloire.example",
    hours: "Samedis (planning mensuel)",
    contact: "hello@ecoloire.example",
    emoji: "🌊",
    gradient: "from-[oklch(0.9_0.08_200)] to-[oklch(0.88_0.09_155)]",
    scores: { nature: 3, utilite: 3, collectif: 2 },
  },
  {
    id: "café-des-histoires",
    name: "Le Café des Histoires",
    tagline: "Ateliers d'écriture & lectures",
    keywords: ["Écrire", "Partager", "Calme"],
    description: "Écrire, lire, se raconter dans un cadre bienveillant.",
    longDescription:
      "Ateliers hebdomadaires animés par des auteurs bénévoles, café-lectures publiques et un fanzine annuel. Aucun niveau requis.",
    address: "3 place François Mitterrand, 44400 Rezé",
    site: "https://cafedeshistoires.example",
    hours: "Mercredi 18h–20h, samedi 10h–12h",
    contact: "atelier@cafedeshistoires.example",
    emoji: "📝",
    gradient: "from-[oklch(0.9_0.06_60)] to-[oklch(0.88_0.05_40)]",
    scores: { creation: 3, savoir: 2, calme: 2 },
  },
  {
    id: "clowns-hopital",
    name: "Les Nez Rouges de l'Ouest",
    tagline: "Clowns à l'hôpital & EHPAD",
    keywords: ["Rire", "Utile", "Rencontres"],
    description: "Faire rire et alléger le quotidien des personnes hospitalisées.",
    longDescription:
      "Formation de clowns bénévoles, interventions dans les hôpitaux et EHPAD de l'agglomération. Un engagement joyeux et exigeant.",
    address: "44400 Rezé (déplacements)",
    site: "https://nez-rouges-ouest.example",
    hours: "Interventions hebdomadaires",
    contact: "rejoindre@nez-rouges-ouest.example",
    emoji: "🤡",
    gradient: "from-[oklch(0.88_0.11_15)] to-[oklch(0.9_0.09_45)]",
    scores: { fun: 3, utilite: 3, rencontre: 2, creation: 1 },
  },
  {
    id: "reze-jeux",
    name: "Rezé Jeux",
    tagline: "Ludothèque associative",
    keywords: ["Jouer", "Rencontres", "Fun"],
    description: "Venir jouer, apprendre à jouer, animer des soirées jeux.",
    longDescription:
      "Une ludothèque tenue par les bénévoles, plus de 800 jeux à emprunter, soirées jeux tous les vendredis et interventions dans les écoles.",
    address: "17 rue de Pornic, 44400 Rezé",
    site: "https://reze-jeux.example",
    hours: "Mercredi 14h–18h, vendredi 19h–23h",
    contact: "coucou@reze-jeux.example",
    emoji: "🎲",
    gradient: "from-[oklch(0.88_0.09_290)] to-[oklch(0.85_0.11_240)]",
    scores: { fun: 3, rencontre: 2, savoir: 1, collectif: 1 },
  },
  {
    id: "velo-solidaire",
    name: "Vélo Solidaire",
    tagline: "Atelier vélo participatif",
    keywords: ["Réparer", "Vélo", "Solidaire"],
    description: "Apprendre à réparer son vélo et remettre en circulation des vélos oubliés.",
    longDescription:
      "Deux ateliers par semaine où l'on apprend la mécanique vélo, on remet en état des vélos donnés qu'on revend à prix libre. L'atelier organise aussi des balades familiales.",
    address: "Zone de la Trocardière, 44400 Rezé",
    site: "https://velo-solidaire-reze.example",
    hours: "Mercredi 17h–20h, samedi 10h–13h",
    contact: "atelier@velo-solidaire.example",
    emoji: "🚲",
    gradient: "from-[oklch(0.88_0.1_150)] to-[oklch(0.85_0.11_190)]",
    scores: { utilite: 2, creation: 2, nature: 1, collectif: 2 },
  },
  {
    id: "cours-pour-tous",
    name: "Cours Pour Tous",
    tagline: "Soutien scolaire & alphabétisation",
    keywords: ["Transmettre", "Savoir", "Aider"],
    description: "Donner un peu de son temps pour transmettre, à tout âge.",
    longDescription:
      "Accompagnement scolaire de collégiens, cours de français pour adultes non-francophones, aide à la lecture. Une soirée par semaine suffit.",
    address: "MJC de Rezé, 44400 Rezé",
    site: "https://courspourtous.example",
    hours: "Mardi ou jeudi 18h–20h",
    contact: "coordination@courspourtous.example",
    emoji: "📚",
    gradient: "from-[oklch(0.9_0.07_75)] to-[oklch(0.88_0.09_100)]",
    scores: { savoir: 3, utilite: 3, rencontre: 1 },
  },
  {
    id: "escalade-reze",
    name: "Escalade Rezé",
    tagline: "Grimpe en salle & en falaise",
    keywords: ["Sport", "Dépassement", "Groupe"],
    description: "Grimper à son rythme, seul ou en cordée.",
    longDescription:
      "Créneaux ouverts en salle, sorties mensuelles en falaise, initiation débutants. L'esprit du club : progresser sans compétition, s'entraider en cordée.",
    address: "Complexe sportif Ragon, 44400 Rezé",
    site: "https://escalade-reze.example",
    hours: "Lundi & jeudi 19h–22h, dimanche AM",
    contact: "grimpe@escalade-reze.example",
    emoji: "🧗",
    gradient: "from-[oklch(0.85_0.13_25)] to-[oklch(0.85_0.1_60)]",
    scores: { depassement: 3, collectif: 2, nature: 1 },
  },
  {
    id: "fete-des-voisins",
    name: "Voisins Rezéens",
    tagline: "Fêtes de quartier & entraide",
    keywords: ["Rencontres", "Quartier", "Fun"],
    description: "Organiser des moments simples entre voisins.",
    longDescription:
      "Pique-niques, apéros de quartier, coup de main entre voisins. Aucune contrainte régulière, juste l'envie d'aider à faire vivre son quartier.",
    address: "Selon les quartiers, 44400 Rezé",
    site: "https://voisins-rezeens.example",
    hours: "Événements ponctuels",
    contact: "hello@voisins-rezeens.example",
    emoji: "🎉",
    gradient: "from-[oklch(0.9_0.09_45)] to-[oklch(0.88_0.11_15)]",
    scores: { rencontre: 3, fun: 2, collectif: 2, utilite: 1 },
  },
  {
    id: "ciné-club-loire",
    name: "Ciné-Club de Loire",
    tagline: "Projections & débats",
    keywords: ["Culture", "Débat", "Calme"],
    description: "Un film choisi, un débat, une soirée.",
    longDescription:
      "Programmation mensuelle mêlant classiques et cinéma indépendant. Après chaque séance, discussion avec les spectateurs et parfois un invité.",
    address: "Cinéma Le Saint-Paul, 44400 Rezé",
    site: "https://cineclub-loire.example",
    hours: "1er jeudi du mois, 20h",
    contact: "programmation@cineclub-loire.example",
    emoji: "🎬",
    gradient: "from-[oklch(0.82_0.09_270)] to-[oklch(0.88_0.07_240)]",
    scores: { savoir: 2, creation: 1, calme: 2, rencontre: 1 },
  },
];

// Compute cosine-like similarity between player scores and association scores.
export function matchAssociations(playerScores: Scores) {
  const scored = associations.map((a) => {
    const s = { ...emptyScores(), ...a.scores };
    let dot = 0, na = 0, np = 0;
    (Object.keys(playerScores) as Axis[]).forEach((k) => {
      dot += playerScores[k] * s[k];
      na += s[k] * s[k];
      np += playerScores[k] * playerScores[k];
    });
    const score = na && np ? dot / (Math.sqrt(na) * Math.sqrt(np)) : 0;
    return { assoc: a, score };
  });
  return scored
    .sort((x, y) => y.score - x.score)
    .slice(0, 8)
    .map((s) => s.assoc);
}

export function addScores(base: Scores, add: Partial<Scores>): Scores {
  const out = { ...base };
  (Object.keys(add) as Axis[]).forEach((k) => {
    out[k] = (out[k] || 0) + (add[k] || 0);
  });
  return out;
}
