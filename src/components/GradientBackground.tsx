import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion"

type GradientBackgroundProps = {
  readonly accentColor: string
}

export const GradientBackground = ({
  accentColor,
}: GradientBackgroundProps) => {
  const frame = useCurrentFrame()

  const rotation = interpolate(frame, [0, 150], [0, 360], {
    extrapolateRight: "wrap",
  })

  return (
    <AbsoluteFill
      style={{
        opacity: 0.5,
        background: `
          linear-gradient(
            ${rotation}deg,
            ${accentColor}22 0%,
            #00000088 50%,
            ${accentColor}22 100%
          )
        `,
      }}
    />
  )
}
