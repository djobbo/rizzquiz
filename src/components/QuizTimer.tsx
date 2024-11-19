import { useCurrentFrame, useVideoConfig } from "remotion"
import { interpolate } from "remotion"

type QuizTimerProps = {
  readonly duration: number
  readonly accentColor: string
}

export const QuizTimer = ({ duration, accentColor }: QuizTimerProps) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const progress = interpolate(frame, [0, duration * fps], [100, 0], {
    extrapolateRight: "clamp",
  })

  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        left: "10%",
        width: "80%",
        height: 10,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 5,
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          backgroundColor: accentColor,
          borderRadius: 5,
          transition: "width 0.1s linear",
        }}
      />
    </div>
  )
}
