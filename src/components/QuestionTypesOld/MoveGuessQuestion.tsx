import { AbsoluteFill, Video } from "remotion"

interface MoveGuessQuestionProps {
  readonly moveClip: string
}

export const MoveGuessQuestion = ({ moveClip }: MoveGuessQuestionProps) => {
  return (
    <AbsoluteFill
      style={{
        height: "60%",
      }}
    >
      <Video
        src={moveClip}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </AbsoluteFill>
  )
}
