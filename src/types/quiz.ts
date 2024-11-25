import { z } from "zod"
import { zColor } from "@remotion/zod-types"

export const characterSchema = z.object({
  anilistId: z.number(),
  name: z.string(),
  shortName: z.string(),
  images: z.object({
    main: z.string(),
    transparent: z.string().nullable(),
  }),
  color: z.string().nullable(),
  quotes: z.array(z.string()),
  ages: z.array(
    z.object({
      age: z.number(),
      modifier: z.string().optional(),
      reason: z.string().optional(),
    }),
  ),
  gender: z.string(),
})

export type Character = z.infer<typeof characterSchema>

export const animeSchema = z.object({
  name: z.string(),
  color: z.string(),
  images: z.object({
    main: z.string(),
    firstFrame: z.string(),
    logo: z.string(),
  }),
  characters: z.array(characterSchema),
})

export type Anime = z.infer<typeof animeSchema>

export const questionTypes = [
  "silhouette",
  "quote",
  "openingGuess",
  "emojiLore",
  "moveGuess",
  "quoteGuess",
  "factCheck",
  "villainGuess",
  "firstFrame",
  "subVsDub",
] as const

export const baseQuestionSchema = z.object({
  type: z.enum(questionTypes),
  question: z.string(),
  correctAnswer: z.number(),
  emoji: z.string().optional(),
})

export const silhouetteQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("silhouette"),
  characterImage: z.string(),
  options: z.array(characterSchema),
})

export const quoteQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("quote"),
  partialQuote: z.string(),
  options: z.array(characterSchema),
})

export const openingGuessQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("openingGuess"),
  audioClip: z.string(),
  options: z.array(animeSchema),
})

export const emojiLoreQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("emojiLore"),
  emojiSequence: z.string(),
  options: z.array(animeSchema),
})

export const moveGuessQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("moveGuess"),
  moveClip: z.string(),
  options: z.array(z.string()), // TODO: add moveSchema
})

export const quoteGuessQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("quoteGuess"),
  quote: z.string(),
  character: z.string(),
  options: z.array(z.string()),
})

export const factCheckQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("factCheck"),
  facts: z.array(
    z.object({
      text: z.string(),
      isTrue: z.boolean(),
    }),
  ),
  options: z.array(z.string()),
})

export const villainGuessQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("villainGuess"),
  villainImage: z.string(),
  blurAmount: z.number(),
  options: z.array(z.string()),
})

export const firstFrameQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("firstFrame"),
  frameImage: z.string(),
  options: z.array(animeSchema),
})

export const subVsDubQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("subVsDub"),
  subClip: z.string(),
  dubClip: z.string(),
  options: z.array(animeSchema),
})

export const questionSchema = z.discriminatedUnion("type", [
  silhouetteQuestionSchema,
  quoteQuestionSchema,
  openingGuessQuestionSchema,
  emojiLoreQuestionSchema,
  moveGuessQuestionSchema,
  quoteGuessQuestionSchema,
  factCheckQuestionSchema,
  villainGuessQuestionSchema,
  firstFrameQuestionSchema,
  subVsDubQuestionSchema,
])

export const quizSchema = z.object({
  questions: z.array(questionSchema),
  backgroundColor: zColor(),
  accentColor: zColor(),
  isMobileView: z.boolean(),
})
