import { z } from "zod";
import { zColor } from "@remotion/zod-types";

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
] as const;

export const baseQuestionSchema = z.object({
  type: z.enum(questionTypes),
  question: z.string(),
  options: z.array(z.string()),
  correctAnswer: z.number(),
  emoji: z.string().optional(),
});

export const silhouetteQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("silhouette"),
  characterImage: z.string(),
});

export const quoteQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("quote"),
  partialQuote: z.string(),
});

export const openingGuessQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("openingGuess"),
  audioClip: z.string(),
});

export const emojiLoreQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("emojiLore"),
  emojiSequence: z.string(),
});

export const moveGuessQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("moveGuess"),
  moveClip: z.string(),
});

export const quoteGuessQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("quoteGuess"),
  quote: z.string(),
  character: z.string(),
});

export const factCheckQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("factCheck"),
  facts: z.array(z.object({
    text: z.string(),
    isTrue: z.boolean(),
  })),
});

export const villainGuessQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("villainGuess"),
  villainImage: z.string(),
  blurAmount: z.number(),
});

export const firstFrameQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("firstFrame"),
  frameImage: z.string(),
});

export const subVsDubQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("subVsDub"),
  subClip: z.string(),
  dubClip: z.string(),
});

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
]);

export const quizSchema = z.object({
  questions: z.array(questionSchema),
  backgroundColor: zColor(),
  accentColor: zColor(),
});