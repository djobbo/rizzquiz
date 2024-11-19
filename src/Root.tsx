import { Composition, staticFile } from "remotion"
import { AnimeQuiz } from "./AnimeQuiz"
import { quizSchema } from "./types/quiz"

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
              options: ["Goku", "Naruto", "Luffy", "Ichigo"],
              correctAnswer: 1,
              characterImage: staticFile("assets/naruto.png"),
              emoji: "👤",
            },
            {
              type: "emojiLore",
              question: "What anime is this? 🤔",
              emojiSequence: "⚔️🤺🔥",
              options: ["Demon Slayer", "Bleach", "Fire Force", "Black Clover"],
              correctAnswer: 0,
              emoji: "📱",
            },
            {
              type: "moveGuess",
              question: "Name this move! ⚡",
              options: ["Rasengan", "Chidori", "Spirit Gun", "Dragon Fist"],
              correctAnswer: 0,
              moveClip: "assets/rasengan.mp4",
              emoji: "💥",
            },
          ],
          backgroundColor: "#1A1A2d",
          accentColor: "#FF00FF",
        }}
      />
    </>
  )
}
