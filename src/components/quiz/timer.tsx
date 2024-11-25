import { useCurrentFrame, useVideoConfig } from "remotion"
import { interpolate } from "remotion"
import { Title } from "../title"
import { cn } from "../../helpers/cn"

type TimerProps = {
  readonly duration: number
  readonly title: string
  readonly isMobileView: boolean
}

export const Timer = ({ duration, title, isMobileView }: TimerProps) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const progress = interpolate(frame, [0, duration * fps], [100, 0], {
    extrapolateRight: "clamp",
  })

  return (
    <div
      className={cn("relative h-12 rounded-full border-[16px]", {
        "top-16 inset-x-16": isMobileView,
        "top-8 inset-x-8": !isMobileView,
      })}
      style={{
        position: "absolute",
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
