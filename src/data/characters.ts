import { staticFile } from "remotion"
import { Character } from "../types/quiz"

export const characters = {
  Naruto: {
    name: "Naruto Uzumaki",
    images: {
      main: staticFile("assets/naruto.png"),
      transparent: staticFile("assets/naruto.png"),
    },
    color: "#FFA500",
    quotes: [],
  },
  Goku: {
    name: "Son Goku",
    images: {
      main: staticFile("assets/goku.png"),
      transparent: staticFile("assets/goku.png"),
    },
    color: "#FF0000",
    quotes: [],
  },
  Luffy: {
    name: "Monkey D. Luffy",
    images: {
      main: staticFile("assets/luffy.png"),
      transparent: staticFile("assets/luffy.png"),
    },
    color: "#FFD700",
    quotes: [],
  },
  Ichigo: {
    name: "Ichigo Kurosaki",
    images: {
      main: staticFile("assets/ichigo.png"),
      transparent: staticFile("assets/ichigo.png"),
    },
    color: "#FF4500",
    quotes: [],
  },
} as const satisfies Record<string, Character>

export type CharacterName = keyof typeof characters
