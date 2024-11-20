import { Composition, staticFile } from "remotion"
import { AnimeQuiz } from "./AnimeQuiz"
import { quizSchema } from "./types/quiz"
import { anime } from "./data/anime"
import { characters } from "./data/characters"

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="AnimeQuiz"
        component={AnimeQuiz}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        schema={quizSchema}
        defaultProps={{
          questions: [
            {
              type: "silhouette",
              question: "Who Dis? 🚨",
              options: [
                characters.Goku,
                characters.Naruto,
                characters.Luffy,
                characters.Ichigo,
              ],
              correctAnswer: 1,
              characterImage: staticFile("assets/naruto.png"),
              emoji: "👤",
            },
            {
              type: "emojiLore",
              question: "What anime is this? 🤔",
              emojiSequence: "⚔️🤺🔥",
              options: [
                anime.DemonSlayer,
                anime.Bleach,
                anime.FireForce,
                anime.BlackClover,
              ],
              correctAnswer: 0,
              emoji: "📱",
            },
          ],
          backgroundColor: "#1A1A2d",
          accentColor: "#FF9AA2",
        }}
      />
    </>
  )
}
