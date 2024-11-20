import { staticFile } from "remotion"
import { Character } from "../types/quiz"

export const characters = {
  Naruto: {
    anilistId: 17,
    name: "Naruto Uzumaki",
    shortName: "Naruto",
    images: {
      main: "https://s4.anilist.co/file/anilistcdn/character/large/b17-IazKGogQwJ1p.png",
      transparent: staticFile("assets/naruto.png"),
    },
    color: null,
    quotes: [],
    ages: [
      {
        age: 12,
        reason: "Naruto",
      },
      {
        age: 17,
        reason: "Naruto Shippuden",
      },
      {
        age: 27,
        reason: "Boruto",
      },
    ],
    gender: "Male",
  },
  Goku: {
    anilistId: 246,
    name: "Gokuu Son",
    shortName: "Goku",
    images: {
      main: "https://s4.anilist.co/file/anilistcdn/character/large/246-wsRRr6z1kii8.png",
      transparent: null,
    },
    color: null,
    quotes: [],
    ages: [],
    gender: "Male",
  },
  Luffy: {
    anilistId: 40,
    name: "Monkey D. Luffy",
    shortName: "Luffy",
    images: {
      main: "https://s4.anilist.co/file/anilistcdn/character/large/b40-fDTq7f4XyJan.png",
      transparent: null,
    },
    color: null,
    quotes: [],
    ages: [
      {
        age: 17,
      },
    ],
    gender: "Male",
  },
  Ichigo: {
    anilistId: 5,
    name: "Ichigo Kurosaki",
    shortName: "Ichigo",
    images: {
      main: "https://s4.anilist.co/file/anilistcdn/character/large/b5-RxGEMJZLW4cy.png",
      transparent: null,
    },
    color: null,
    quotes: [],
    ages: [
      {
        age: 15,
      },
      {
        age: 29,
      },
    ],
    gender: "Male",
  },
  Nezuko: {
    anilistId: 127518,
    name: "Nezuko Kamado",
    shortName: "Nezuko",
    images: {
      main: "https://s4.anilist.co/file/anilistcdn/character/large/b127518-NRlq1CQ1v1ro.png",
      transparent: null,
    },
    color: null,
    quotes: [],
    ages: [
      {
        age: 12,
        reason: "prelude",
      },
      {
        age: 14,
        reason: "story",
      },
    ],
    gender: "Female",
  },
} as const satisfies Record<string, Character>

export type CharacterName = keyof typeof characters
