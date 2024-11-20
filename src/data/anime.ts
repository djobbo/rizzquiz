import { staticFile } from "remotion"
import { characters } from "./characters"
import { Anime } from "../types/quiz"

export const anime = {
  Naruto: {
    name: "Naruto",
    color: "#FFA500",
    images: {
      main: staticFile("assets/naruto.png"),
      firstFrame: staticFile("assets/naruto.png"),
      logo: staticFile("assets/naruto.png"),
    },
    characters: [characters.Naruto],
  },
  DemonSlayer: {
    name: "Demon Slayer",
    color: "#FF0000",
    images: {
      main: staticFile("assets/demon-slayer.png"),
      firstFrame: staticFile("assets/demon-slayer.png"),
      logo: staticFile("assets/demon-slayer.png"),
    },
    characters: [],
  },
  Bleach: {
    name: "Bleach",
    color: "#FFD700",
    images: {
      main: staticFile("assets/bleach.png"),
      firstFrame: staticFile("assets/bleach.png"),
      logo: staticFile("assets/bleach.png"),
    },
    characters: [],
  },
  FireForce: {
    name: "Fire Force",
    color: "#FF4500",
    images: {
      main: staticFile("assets/fire-force.png"),
      firstFrame: staticFile("assets/fire-force.png"),
      logo: staticFile("assets/fire-force.png"),
    },
    characters: [],
  },
  BlackClover: {
    name: "Black Clover",
    color: "#FF00FF",
    images: {
      main: staticFile("assets/black-clover.png"),
      firstFrame: staticFile("assets/black-clover.png"),
      logo: staticFile("assets/black-clover.png"),
    },
    characters: [],
  },
} as const satisfies Record<string, Anime>

export type AnimeTitle = keyof typeof anime
