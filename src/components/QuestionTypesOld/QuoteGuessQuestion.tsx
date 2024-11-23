import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion"

interface QuoteGuessQuestionProps {
  readonly quote: string
  readonly character: string
}

export const QuoteGuessQuestion = ({ quote }: QuoteGuessQuestionProps) => {
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
        background:
          "linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.95) 100%)",
      }}
    >
      <div
        style={{
          fontSize: 36,
          color: "#fff",
          textAlign: "center",
          padding: "0 40px",
          transform: `scale(${scale})`,
          textShadow: "0 0 10px rgba(255,255,255,0.5)",
        }}
      >
        "{quote}"
      </div>
    </AbsoluteFill>
  )
}
