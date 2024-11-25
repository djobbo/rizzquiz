import { useCurrentFrame } from "remotion"
import { useVideoConfig } from "remotion"
import { AbsoluteFill, Img, spring } from "remotion"
type TransitionProps = {
  readonly pfp: string
  readonly duration?: number
  readonly exitDuration?: number
}

export const Transition = ({
  pfp,
  duration = 0.75,
  exitDuration = 0.75,
}: TransitionProps) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const scale =
    spring({
      frame,
      fps,
      config: { damping: 9, mass: 0.3, stiffness: 92 },
      durationInFrames: duration * fps,
      delay: 0,
    }) -
    spring({
      frame,
      fps,
      config: { damping: 9, mass: 0.3, stiffness: 92 },
      durationInFrames: exitDuration * fps,
      delay: duration * fps,
    })

  const opacity =
    spring({
      frame,
      fps,
      config: { mass: 0.5, damping: 10 },
      durationInFrames: duration * fps,
    }) -
    spring({
      frame,
      fps,
      config: { mass: 0.5, damping: 10 },
      durationInFrames: exitDuration * fps,
      delay: duration * fps,
    })

  const rotate =
    spring({
      frame,
      fps,
      config: { mass: 0.5, damping: 10 },
      durationInFrames: duration * fps,
    }) -
    spring({
      frame,
      fps,
      config: { mass: 0.5, damping: 10 },
      durationInFrames: exitDuration * fps,
      delay: duration * fps,
    })

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
        opacity,
      }}
    >
      <Img
        src={pfp}
        className="rounded-full border-[16px] border-white"
        style={{
          objectFit: "cover",
          width: 400,
          height: 400,
          transform: `scale(${scale}) rotate(${rotate * 5}deg)`,
          boxShadow: "16px 16px 0px rgba(0, 0, 0, 0.25)",
        }}
      />
    </AbsoluteFill>
  )
}
