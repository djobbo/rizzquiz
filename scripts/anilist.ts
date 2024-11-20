import { z } from "zod"
import { Character } from "../src/types/quiz"

const [, , name] = Bun.argv

if (!name) {
  console.error("Please provide a name")
  process.exit(1)
}
const ageSingleEntrySchema = z.string().transform((str) => {
  const singleRegex = /^(\d+)(-)?(?:\s*\(([^)]+)\))?$/

  const match = singleRegex.exec(str)
  if (!match) throw new Error(`Invalid entry: ${str}`)

  const age = parseInt(match[1], 10)
  const modifier = match[2] ? "+" : undefined
  const reason = match[3]

  return {
    age,
    ...(modifier ? { modifier } : {}),
    ...(reason ? { reason } : {}),
  }
})

const ageEntrySchema = z.string().transform((str) => {
  const rangeRegex = /^(\d+)-(\d+)?(?:\s*\(([^)]+)\))?$/

  const entries: { age: number; reason?: string; modifier?: string }[] = []
  const parts = str.split(/\s*,\s*/) // Split the string by commas

  for (const part of parts) {
    const rangeMatch = rangeRegex.exec(part)

    if (rangeMatch) {
      // Handle ranges like "12-17 (Naruto)"
      const start = parseInt(rangeMatch[1], 10)
      const end = rangeMatch[2] ? parseInt(rangeMatch[2], 10) : undefined
      const reason = rangeMatch[3]

      entries.push({ age: start, ...(reason ? { reason } : {}) })
      if (end !== undefined) {
        entries.push({ age: end, ...(reason ? { reason } : {}) })
      }
    } else {
      // Handle single entries like "12" or "12- (Naruto)"
      entries.push(ageSingleEntrySchema.parse(part))
    }
  }

  return entries
})

// Define the schema to parse the entire input string
const ageInputSchema = z
  .string()
  .transform((input) => ageEntrySchema.parse(input))

const characterSchema = z
  .object({
    id: z.number(),
    name: z.object({
      full: z.string(),
    }),
    gender: z.string(),
    age: ageInputSchema.nullable(),
    image: z.object({
      large: z.string(),
    }),
  })
  .transform<Character>((data) => ({
    anilistId: data.id,
    name: data.name.full,
    shortName: data.name.full,
    images: {
      main: data.image.large,
      transparent: null,
    },
    color: null,
    quotes: [],
    ages: data.age || [],
    gender: data.gender,
  }))

export type AnilistCharacter = z.infer<typeof characterSchema>

const searchCharacter = async (name: string) => {
  try {
    const res = await fetch("https://graphql.anilist.co/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `
            query ($search: String) {
                Page {
                    characters(search: $search) {
                        id
                        name {
                            full
                        }
                        gender
                        age
                        image {
                            large
                        }
                    }
                }
            }
        `,
        variables: { search: name },
      }),
    })

    const { data } = await res.json()

    console.log(JSON.stringify(data.Page.characters[0], null, 2))

    return characterSchema.parse(data.Page.characters[0])
  } catch (error) {
    console.log(error)
    throw new Error(`${name} not found`)
  }
}

const character = await searchCharacter(name)

console.log(JSON.stringify(character, null, 2))
