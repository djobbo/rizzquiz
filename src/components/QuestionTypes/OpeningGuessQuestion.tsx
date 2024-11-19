import {
  AbsoluteFill,
  Audio,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion"

interface OpeningGuessQuestionProps {
  readonly audioClip: string
}

export const OpeningGuessQuestion = ({
  audioClip,
}: OpeningGuessQuestionProps) => {
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
        background: "linear-gradient(45deg, #FF00FF 0%, #00FFFF 100%)",
      }}
    >
      <Audio src={audioClip} />
      <div
        style={{
          fontSize: 120,
          transform: `scale(${scale})`,
        }}
      >
        🎵
      </div>
    </AbsoluteFill>
  )
}
