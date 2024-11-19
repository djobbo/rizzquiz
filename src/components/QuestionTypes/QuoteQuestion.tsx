import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion"

interface QuoteQuestionProps {
  readonly partialQuote: string
}

export const QuoteQuestion = ({ partialQuote }: QuoteQuestionProps) => {
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
          "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.9) 100%)",
      }}
    >
      <div
        style={{
          fontSize: 48,
          color: "#fff",
          textAlign: "center",
          padding: "0 40px",
          transform: `scale(${scale})`,
          textShadow: "0 0 10px rgba(255,255,255,0.5)",
        }}
      >
        "{partialQuote}..."
      </div>
    </AbsoluteFill>
  )
}
