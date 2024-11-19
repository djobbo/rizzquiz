import {
  AbsoluteFill,
  Img,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion"

interface FirstFrameQuestionProps {
  readonly frameImage: string
}

export const FirstFrameQuestion = ({ frameImage }: FirstFrameQuestionProps) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const scale = spring({
    frame,
    fps,
    config: { mass: 0.5, damping: 10 },
  })

  return (
    <AbsoluteFill
      style={{
        height: "60%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          width: "100%",
          height: "100%",
        }}
      >
        <Img
          src={frameImage}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>
    </AbsoluteFill>
  )
}
