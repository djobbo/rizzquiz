import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Sequence,
} from "remotion"
import { QuizTimer } from "./QuizTimer"
import { Question } from "./Question"
import { Options } from "./Options"
import { Reveal } from "./Reveal"
import { QuestionCounter } from "./QuestionCounter"
import { SilhouetteQuestion } from "./QuestionTypesOld/SilhouetteQuestion"
import { EmojiLoreQuestion } from "./QuestionTypesOld/EmojiLoreQuestion"
import { MoveGuessQuestion } from "./QuestionTypesOld/MoveGuessQuestion"
import { QuoteQuestion } from "./QuestionTypesOld/QuoteQuestion"
import { OpeningGuessQuestion } from "./QuestionTypesOld/OpeningGuessQuestion"
import { QuoteGuessQuestion } from "./QuestionTypesOld/QuoteGuessQuestion"
import { FactCheckQuestion } from "./QuestionTypesOld/FactCheckQuestion"
import { VillainGuessQuestion } from "./QuestionTypesOld/VillainGuessQuestion"
import { FirstFrameQuestion } from "./QuestionTypesOld/FirstFrameQuestion"
import { SubVsDubQuestion } from "./QuestionTypesOld/SubVsDubQuestion"
import { questionSchema } from "../types/quiz"
import { z } from "zod"

type QuizSectionProps = {
  readonly question: z.infer<typeof questionSchema>
  readonly accentColor: string
  readonly questionNumber: number
  readonly totalQuestions: number
}

type QuestionContentProps = {
  readonly question: z.infer<typeof questionSchema>
}

const QuestionContent = ({ question }: QuestionContentProps) => {
  switch (question.type) {
    case "silhouette":
      return <SilhouetteQuestion characterImage={question.characterImage} />
    case "quote":
      return <QuoteQuestion partialQuote={question.partialQuote} />
    case "openingGuess":
      return <OpeningGuessQuestion audioClip={question.audioClip} />
    case "emojiLore":
      return <EmojiLoreQuestion emojiSequence={question.emojiSequence} />
    case "moveGuess":
      return <MoveGuessQuestion moveClip={question.moveClip} />
    case "quoteGuess":
      return (
        <QuoteGuessQuestion
          quote={question.quote}
          character={question.character}
        />
      )
    case "factCheck":
      return <FactCheckQuestion facts={question.facts} />
    case "villainGuess":
      return (
        <VillainGuessQuestion
          villainImage={question.villainImage}
          blurAmount={question.blurAmount}
        />
      )
    case "firstFrame":
      return <FirstFrameQuestion frameImage={question.frameImage} />
    case "subVsDub":
      return (
        <SubVsDubQuestion
          subClip={question.subClip}
          dubClip={question.dubClip}
        />
      )
    default:
      return null
  }
}

export const QuizLayout = ({
  question,
  accentColor,
  questionNumber,
  totalQuestions,
}: QuizSectionProps) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const opacity = spring({
    frame,
    fps,
    config: { mass: 0.5, damping: 10 },
  })

  const options = question.options.map((option) =>
    typeof option === "string"
      ? { title: option }
      : {
          title: "shortName" in option ? option.shortName : option.name,
          image: option.images.main,
        },
  )

  return (
    <AbsoluteFill style={{ opacity }}>
      <div style={{ height: "60%", position: "relative" }}>
        <QuestionCounter
          current={questionNumber}
          total={totalQuestions}
          accentColor={accentColor}
        />
        <QuizTimer duration={5} accentColor={accentColor} />
        <QuestionContent question={question} />
      </div>

      <Sequence from={15}>
        <Question text={question.question} accentColor={accentColor} />
      </Sequence>

      <Sequence from={30}>
        <Options
          options={options}
          correctAnswer={question.correctAnswer}
          accentColor={accentColor}
        />
      </Sequence>

      <Sequence from={120}>
        <Reveal
          correctAnswer={question.correctAnswer}
          options={options}
          questionNumber={questionNumber}
          totalQuestions={totalQuestions}
        />
      </Sequence>
    </AbsoluteFill>
  )
}
