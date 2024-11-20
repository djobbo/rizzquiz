import { AbsoluteFill, Sequence } from "remotion"
import { QuizSection } from "./components/QuizSection"
import { GradientBackground } from "./components/GradientBackground"
import { z } from "zod"
import { quizSchema } from "./types/quiz"
import { SpeedLines } from "./components/SpeedLines"

import { loadFont } from "@remotion/google-fonts/BebasNeue"
const { fontFamily } = loadFont()

const FRAMES_PER_QUESTION = 150

type AnimeQuizProps = z.infer<typeof quizSchema>

export const AnimeQuiz = ({
  questions,
  backgroundColor,
  accentColor,
}: AnimeQuizProps) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        fontFamily,
      }}
    >
      <GradientBackground accentColor={accentColor} />
      <SpeedLines color={accentColor} style={{ opacity: 0.25 }} />
      {questions.map((question, index) => (
        <Sequence
          key={index}
          from={index * FRAMES_PER_QUESTION}
          durationInFrames={FRAMES_PER_QUESTION}
        >
          <QuizSection
            question={question}
            accentColor={accentColor}
            questionNumber={index + 1}
            totalQuestions={questions.length}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  )
}
