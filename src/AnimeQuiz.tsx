import { Audio, useVideoConfig } from "remotion"
import { AbsoluteFill, Sequence, staticFile } from "remotion"
import { QuizLayout } from "./components/QuizLayout"
import { GradientBackground } from "./components/GradientBackground"
import { z } from "zod"
import { quizSchema } from "./types/quiz"
import { SpeedLines } from "./components/SpeedLines"

import { FourImages } from "./components/quiz/displays/four-images"
import { characters } from "./data/characters"
import { comicFont } from "./helpers/fonts"
import { Timer } from "./components/quiz/timer"
import { Transition } from "./components/quiz/transition"

const FRAMES_PER_QUESTION = 150

type AnimeQuizProps = z.infer<typeof quizSchema>

export const AnimeQuiz = ({
  questions,
  backgroundColor,
  accentColor,
}: AnimeQuizProps) => {
  const { fps } = useVideoConfig()
  const confettiConfig1 = {
    particleCount: 200,
    startVelocity: 30,
    spread: 60,
    x: 320,
    y: 360,
    scalar: 1,
  }

  const confettiConfig2 = {
    particleCount: 200,
    startVelocity: 50,
    decay: 0.8,
    spread: 360,
    ticks: 100,
    gravity: 0.5,
    x: 960,
    y: 360,
    scalar: 1,
    colors: ["#000000", "#FFFFFF"],
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        fontFamily: comicFont,
      }}
    >
      <GradientBackground accentColor={accentColor} />
      <SpeedLines color={accentColor} style={{ opacity: 1 }} />
      {/* {questions.map((question, index) => (
        <Sequence
          key={index}
          from={index * FRAMES_PER_QUESTION}
          durationInFrames={FRAMES_PER_QUESTION}
        >
          <QuizLayout
            question={question}
            accentColor={accentColor}
            questionNumber={index + 1}
            questionsCount={questions.length}
          />
        </Sequence>
      ))} */}
      <Audio loop src={staticFile("assets/bg-music.mp3")} />
      <Sequence>
        <Transition pfp={staticFile("assets/pfp/nezu.jpg")} />
      </Sequence>
      <Sequence from={25} premountFor={10} durationInFrames={11 * fps}>
        <Timer duration={10} title="Guess the anime opening" />
        <FourImages
          images={[
            staticFile("assets/anime/oshi-no-ko/op-hard.jpg"),
            staticFile("assets/anime/oshi-no-ko/op-medium.jpg"),
            staticFile("assets/anime/oshi-no-ko/op-normal.jpg"),
            staticFile("assets/anime/oshi-no-ko/op-easy.jpg"),
          ]}
        />
        <Sequence from={10 * fps}>
          <Transition pfp={staticFile("assets/pfp/nezu.jpg")} />
        </Sequence>
      </Sequence>
    </AbsoluteFill>
  )
}
