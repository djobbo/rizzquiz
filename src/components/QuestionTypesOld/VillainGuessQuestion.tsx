import { AbsoluteFill, Img } from "remotion"

interface VillainGuessQuestionProps {
  readonly villainImage: string
  readonly blurAmount: number
}

export const VillainGuessQuestion = ({
  villainImage,
  blurAmount,
}: VillainGuessQuestionProps) => {
  return (
    <AbsoluteFill
      style={{
        height: "60%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
      }}
    >
      <Img
        src={villainImage}
        style={{
          maxHeight: "100%",
          maxWidth: "100%",
          filter: `blur(${blurAmount}px)`,
        }}
      />
    </AbsoluteFill>
  )
}
