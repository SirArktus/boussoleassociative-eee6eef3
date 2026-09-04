import { createFileRoute } from "@tanstack/react-router";
import "@/main-fonts";
import { GameApp } from "@/components/game/GameApp";

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
  component: GameApp,
});
