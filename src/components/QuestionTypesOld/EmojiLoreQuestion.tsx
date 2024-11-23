import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion"

interface EmojiLoreQuestionProps {
  readonly emojiSequence: string
}

export const EmojiLoreQuestion = ({
  emojiSequence,
}: EmojiLoreQuestionProps) => {
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
          fontSize: 120,
          transform: `scale(${scale})`,
          display: "flex",
          gap: 20,
        }}
      >
        {emojiSequence.split("")}
      </div>
    </AbsoluteFill>
  )
}
