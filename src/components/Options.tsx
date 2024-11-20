import { spring, useCurrentFrame, useVideoConfig } from "remotion"

type OptionsProps = {
  readonly options: { title: string; image?: string }[]
  readonly correctAnswer: number
  readonly accentColor: string
}

export const Options = ({ options, accentColor }: OptionsProps) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <div
      style={{
        position: "absolute",
        top: "60%",
        width: "80%",
        left: "50%",
        transform: "translateX(-50%)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridAutoRows: "1fr",
        gap: 80,
      }}
    >
      {options.map((option, index) => {
        const delay = index * 5
        const scale = spring({
          frame: frame - delay,
          fps,
          config: { mass: 0.5, damping: 10 },
        })

        return (
          <div
            key={option.title}
            style={{
              transform: `scale(${scale})`,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              padding: "15px 30px",
              borderRadius: 25,
              border: `2px solid ${accentColor}`,
              color: "#fff",
              fontSize: 48,
              cursor: "pointer",
              width: "400px",
              height: "200px",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {option.title}
          </div>
        )
      })}
    </div>
  )
}
