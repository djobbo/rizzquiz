import {
  AbsoluteFill,
  Video,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion"

interface SubVsDubQuestionProps {
  readonly subClip: string
  readonly dubClip: string
}

export const SubVsDubQuestion = ({
  subClip,
  dubClip,
}: SubVsDubQuestionProps) => {
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
        flexDirection: "column",
        transform: `scale(${scale})`,
      }}
    >
      <div style={{ flex: 1, position: "relative" }}>
        <Video
          src={subClip}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 20,
            color: "#fff",
            fontSize: 24,
            textShadow: "0 0 10px rgba(0,0,0,0.8)",
          }}
        >
          SUB
        </div>
      </div>
      <div style={{ flex: 1, position: "relative" }}>
        <Video
          src={dubClip}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 20,
            color: "#fff",
            fontSize: 24,
            textShadow: "0 0 10px rgba(0,0,0,0.8)",
          }}
        >
          DUB
        </div>
      </div>
    </AbsoluteFill>
  )
}
