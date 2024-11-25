import { useVideoConfig } from "remotion"
import { useCurrentFrame } from "remotion"
import { spring } from "remotion"
import { AbsoluteFill, OffthreadVideo } from "remotion"
import { Title } from "../../title"
import { shake } from "../../../helpers/shake"

type FullVideoAndTitleDisplayProps = {
  readonly title: string
  readonly src: string
  readonly startFrom?: number
  readonly endAt?: number
  readonly volume?: number
}

export const FullVideoAndTitleDisplay = ({
  title,
  src,
  startFrom,
  endAt,
  volume = 1,
}: FullVideoAndTitleDisplayProps) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const scaleEntrance = spring({
    frame,
    fps,
    config: { damping: 15, mass: 0.9, stiffness: 200 },
    durationInFrames: 0.5 * fps,
    delay: 0,
  })

  const scaleExit = spring({
    frame,
    fps,
    config: { mass: 2, damping: 100 },
    durationInFrames: 0.5 * fps,
    delay: 8 * fps,
  })

  const scale = scaleEntrance - scaleExit

  //   const { x, y } = shake(frame, 12, 0.75, 0.8)
  const { x, y, rotation } = shake(frame, {
    intensity: 12,
    speed: 0.75,
    randomness: 0.8,
    rotationIntensity: 2,
  })

  const volumeRamp =
    spring({
      frame,
      fps,
      config: { mass: 1, damping: 100 },
      from: 0,
      to: volume,
      durationInFrames: 0.5 * fps,
    }) -
    spring({
      frame,
      fps,
      config: { mass: 1, damping: 100 },
      from: 0,
      to: volume,
      durationInFrames: 0.5 * fps,
      delay: 8 * fps,
    })

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transform: `scale(${scale}) translate(${x}px, ${y}px) rotate(${rotation}deg)`,
      }}
    >
      <OffthreadVideo
        src={src}
        startFrom={startFrom}
        endAt={endAt}
        volume={volume * volumeRamp}
        className="border-[16px] border-white rounded-xl mb-4"
        style={{
          position: "relative",
          objectFit: "cover",
          width: 800,
          height: 450,
          boxShadow: "16px 16px 0px rgba(0, 0, 0, 0.25)",
          backgroundColor: "white",
        }}
      />
      <Title text={title} fontSize={92} />
    </AbsoluteFill>
  )
}
