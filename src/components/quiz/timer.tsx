import { useCurrentFrame, useVideoConfig } from "remotion"
import { interpolate } from "remotion"
import { Title } from "../title"

type TimerProps = {
  readonly duration: number
  readonly title: string
}

export const Timer = ({ duration, title }: TimerProps) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const progress = interpolate(frame, [0, duration * fps], [100, 0], {
    extrapolateRight: "clamp",
  })

  return (
    <div
      className="relative h-12 rounded-full border-[16px]"
      style={{
        position: "absolute",
        top: 64,
        left: 64,
        right: 64,
        height: 80,
        backgroundColor: "#8346EC",
      }}
    >
      <Title
        className="absolute top-0 w-full text-center"
        text={title}
        fontSize={92}
      />
      <div
        className="absolute top-0 left-0 rounded-full"
        style={{
          width: `${progress}%`,
          height: "100%",
          transition: "width 0.1s linear",
          backgroundColor: "#06D6A0",
        }}
      />
    </div>
  )
}
