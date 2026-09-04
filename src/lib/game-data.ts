import associations from "@/data/associations.json";

export type Criterion =
  | "rencontrer"
  | "utile"
  | "depasser"
  | "creer"
  | "amuser"
  | "comprendre"
  | "performer"
  | "patience"
  | "lire"
  | "transpirer"
  | "parler"
  | "foule"
  | "interieur"
  | "confiance"
  | "force"
  | "art"
  | "orga"
  | "cardio"
  | "records"
  | "fierte"
  | "serenite"
  | "fun"
  | "gratitude"
  | "energie"
  | "emu";

export type Association = {
  nom: string;
  stand: string;
  categorie?: string;
  site?: string;
  facebook?: string;
  instagram?: string;
  scores: Record<Criterion, number>;
};

export const allAssociations = associations as Association[];

export type Card = {
  id: string;
  label: string;
  emoji: string;
  criterion: Criterion;
};

// Écran 3 — J'adore…
export const cardsLove: Card[] = [
  { id: "love-rencontrer", label: "Rencontrer des gens", emoji: "🤝", criterion: "rencontrer" },
  { id: "love-utile", label: "Être utile", emoji: "🌱", criterion: "utile" },
  { id: "love-depasser", label: "Me dépasser", emoji: "🔥", criterion: "depasser" },
  { id: "love-creer", label: "Créer", emoji: "🎨", criterion: "creer" },
  { id: "love-amuser", label: "M'amuser", emoji: "🎉", criterion: "amuser" },
  { id: "love-comprendre", label: "Comprendre", emoji: "🔍", criterion: "comprendre" },
  { id: "love-performer", label: "Performer", emoji: "🏆", criterion: "performer" },
];

// Écran 4 — Je déteste… (critères inversés)
export const cardsHate: Card[] = [
  { id: "hate-patience", label: "Attendre", emoji: "⏳", criterion: "patience" },
  { id: "hate-lire", label: "Lire", emoji: "📚", criterion: "lire" },
  { id: "hate-transpirer", label: "Transpirer", emoji: "💦", criterion: "transpirer" },
  { id: "hate-parler", label: "Parler en public", emoji: "🎤", criterion: "parler" },
  { id: "hate-foule", label: "Les foules", emoji: "👥", criterion: "foule" },
  { id: "hate-interieur", label: "Être en intérieur", emoji: "🏠", criterion: "interieur" },
];

// Écran 5 — Dans un an, j'aimerais…
export const cardsFuture: Card[] = [
  { id: "fut-confiance", label: "Parler devant 100 personnes", emoji: "🗣️", criterion: "confiance" },
  { id: "fut-force", label: "Me défendre", emoji: "🥋", criterion: "force" },
  { id: "fut-art", label: "Jouer une musique", emoji: "🎸", criterion: "art" },
  { id: "fut-orga", label: "Organiser un événement", emoji: "📅", criterion: "orga" },
  { id: "fut-cardio", label: "Faire 50 km à vélo", emoji: "🚴", criterion: "cardio" },
  { id: "fut-amis", label: "Me faire de vrais amis", emoji: "💛", criterion: "rencontrer" },
  { id: "fut-records", label: "Battre des records", emoji: "⏱️", criterion: "records" },
];

// Écran 6 — À la fin d'une activité, je veux ressentir…
export const cardsFeel: Card[] = [
  { id: "feel-fierte", label: "De la fierté", emoji: "🌟", criterion: "fierte" },
  { id: "feel-serenite", label: "De la sérénité", emoji: "🍃", criterion: "serenite" },
  { id: "feel-fun", label: "Du fun", emoji: "😄", criterion: "fun" },
  { id: "feel-gratitude", label: "De la gratitude", emoji: "🙏", criterion: "gratitude" },
  { id: "feel-energie", label: "De l'énergie", emoji: "⚡", criterion: "energie" },
  { id: "feel-emu", label: "D'être ému", emoji: "🥹", criterion: "emu" },
];

export const CRITERES_DIRECTS: Criterion[] = [
  "rencontrer",
  "utile",
  "depasser",
  "creer",
  "amuser",
  "comprendre",
  "performer",
  "confiance",
  "force",
  "art",
  "orga",
  "cardio",
  "records",
  "fierte",
  "serenite",
  "fun",
  "gratitude",
  "energie",
  "emu",
];

export const CRITERES_INVERSES: Criterion[] = [
  "patience",
  "lire",
  "transpirer",
  "parler",
  "foule",
  "interieur",
];

export type Result = {
  nom: string;
  stand: string;
  score: number;
  site?: string;
  facebook?: string;
  instagram?: string;
  categorie?: string;
};

export function calculerScores(
  directs: Criterion[],
  detestes: Criterion[],
  top = 5,
): Result[] {
  const dSet = new Set(directs);
  const hSet = new Set(detestes);
  return allAssociations
    .map((asso) => {
      let total = 0;
      for (const critere of CRITERES_DIRECTS) {
        const score = asso.scores[critere] ?? 2.5;
        total += dSet.has(critere) ? score : (5 - score) / 2;
      }
      for (const critere of CRITERES_INVERSES) {
        const score = asso.scores[critere] ?? 2.5;
        total += hSet.has(critere) ? (5 - score) / 2 : score / 2;
      }
      return {
        nom: asso.nom,
        stand: asso.stand,
        score: total,
        site: asso.site,
        facebook: asso.facebook,
        instagram: asso.instagram,
        categorie: asso.categorie,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, top);
}
