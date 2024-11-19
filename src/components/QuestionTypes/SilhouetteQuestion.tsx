import { AbsoluteFill, Img } from "remotion"

interface SilhouetteQuestionProps {
  readonly characterImage: string
}

export const SilhouetteQuestion = ({
  characterImage,
}: SilhouetteQuestionProps) => {
  return (
    <AbsoluteFill
      style={{
        height: "60%",
        backgroundColor: "#00000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Img
        src={characterImage}
        style={{
          maxHeight: "100%",
          maxWidth: "100%",
          filter: "brightness(0) drop-shadow(0 0 5px white)",
        }}
      />
    </AbsoluteFill>
  )
}
