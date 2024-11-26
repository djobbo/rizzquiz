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
import { FullVideoAndTitleAnswer } from "./components/quiz/answers/full-video-and-title"
import { AudioDisplay } from "./components/quiz/displays/audio"

const FRAMES_PER_QUESTION = 150

type AnimeQuizProps = z.infer<typeof quizSchema>

export const AnimeQuiz = ({
  questions,
  backgroundColor,
  accentColor,
  isMobileView,
}: AnimeQuizProps) => {
  const { fps } = useVideoConfig()

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
      <Sequence durationInFrames={25 + 12.25 * fps}>
        <Audio src={staticFile("assets/bg-music.mp3")} volume={0.5} />
        <Sequence>
          <Transition pfp={staticFile("assets/pfp/nezu.jpg")} />
        </Sequence>
        <Sequence from={25} premountFor={10}>
          <Timer
            isMobileView={isMobileView}
            duration={11}
            title="Guess the anime opening"
          />
          <FourImages
            isMobileView={isMobileView}
            images={[
              staticFile("assets/anime/oshi-no-ko/op-hard.jpg"),
              staticFile("assets/anime/oshi-no-ko/op-medium.jpg"),
              staticFile("assets/anime/oshi-no-ko/op-normal.jpg"),
              staticFile("assets/anime/oshi-no-ko/op-easy.jpg"),
            ]}
          />
          <Sequence from={11 * fps}>
            <Transition pfp={staticFile("assets/pfp/nezu.jpg")} />
          </Sequence>
        </Sequence>
      </Sequence>
      <Sequence
        from={25 + 12 * fps}
        premountFor={10}
        durationInFrames={10 * fps}
      >
        <FullVideoAndTitleAnswer
          title="Oshi no ko"
          src={staticFile("assets/.cache/op/oshi-no-ko_op1.mp4")}
          startFrom={55 * fps}
          volume={0.5}
        />
      </Sequence>
      <Sequence from={25 + 20 * fps} durationInFrames={25 + 12.25 * fps}>
        <Sequence>
          <Transition pfp={staticFile("assets/pfp/nezu.jpg")} />
        </Sequence>
        <Sequence from={25} premountFor={10}>
          <AudioDisplay
            src={staticFile("assets/.cache/op/cant.mp4")}
            volume={0.5}
            startFrom={30 * fps}
          />
          <Sequence from={11 * fps}>
            <Transition pfp={staticFile("assets/pfp/nezu.jpg")} />
          </Sequence>
        </Sequence>
      </Sequence>
    </AbsoluteFill>
  )
}
