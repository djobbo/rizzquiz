import { spring, useCurrentFrame, useVideoConfig } from "remotion"

type QuestionProps = {
  readonly text: string
  readonly accentColor: string
}

export const Question = ({ text, accentColor }: QuestionProps) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const scale = spring({
    frame,
    fps,
    config: { mass: 0.5, damping: 10 },
  })

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        transform: `scale(${scale}) translateY(-50%)`,
        width: "100%",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: 96,
          color: accentColor,
          // textShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
          margin: 0,
          padding: "0 20px",
        }}
      >
        {text}
      </h1>
    </div>
  )
}
