import "./style.css"

import { Composition, staticFile } from "remotion"
import { AnimeQuiz } from "./AnimeQuiz"
import { quizSchema } from "./types/quiz"
import { anime } from "./data/anime"
import { characters } from "./data/characters"

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="AnimeQuizMobile"
        component={AnimeQuiz}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
        schema={quizSchema}
        defaultProps={{
          isMobileView: true,
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
          backgroundColor: "#8346EC",
          accentColor: "#5013B9",
        }}
      />
      <Composition
        id="AnimeQuizDesktop"
        component={AnimeQuiz}
        durationInFrames={1500}
        fps={30}
        width={1920}
        height={1080}
        schema={quizSchema}
        defaultProps={{
          isMobileView: false,
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
          backgroundColor: "#8346EC",
          accentColor: "#5013B9",
        }}
      />
    </>
  )
}
