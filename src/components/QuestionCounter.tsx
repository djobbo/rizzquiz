import { spring, useCurrentFrame, useVideoConfig } from "remotion"

type QuestionCounterProps = {
  readonly current: number
  readonly total: number
  readonly accentColor: string
}

export const QuestionCounter = ({
  current,
  total,
  accentColor,
}: QuestionCounterProps) => {
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
        top: 40,
        right: 40,
        transform: `scale(${scale})`,
        color: accentColor,
        fontSize: 24,
        fontWeight: "bold",
        textShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
      }}
    >
      {current} / {total}
    </div>
  )
}
