import { OffthreadVideo } from "remotion"
import { CSSProperties, useCallback } from "react"
import { useVideoConfig } from "remotion"
import { useRef } from "react"
import { AbsoluteFill } from "remotion"
import { staticFile } from "remotion"

type SpeedLinesProps = {
  readonly style?: CSSProperties
  readonly color?: string
}

export const SpeedLines = ({ style, color }: SpeedLinesProps) => {
  const speedLines = staticFile("assets/speedlines.mp4")
  const canvas = useRef<HTMLCanvasElement>(null)
  const { width, height } = useVideoConfig()

  const [r, g, b] = color
    ?.replace("#", "")
    .match(/.{2}/g)
    ?.map((hex) => parseInt(hex, 16)) ?? [0, 0, 0]

  const onVideoFrame = useCallback(
    (frame: CanvasImageSource) => {
      if (!canvas.current) return

      const context = canvas.current.getContext("2d")
      if (!context) return

      context.drawImage(frame, 0, 0, width, height)
      const imageFrame = context.getImageData(0, 0, width, height)
      const { length } = imageFrame.data

      for (let i = 0; i < length; i += 4) {
        const red = imageFrame.data[i + 0]
        const blue = imageFrame.data[i + 2]

        imageFrame.data[i + 0] = r
        imageFrame.data[i + 1] = g
        imageFrame.data[i + 2] = b
        imageFrame.data[i + 3] = Math.round((red + blue) / 2)
      }
      context.putImageData(imageFrame, 0, 0)
    },
    [height, width, r, g, b],
  )

  return (
    <AbsoluteFill style={style}>
      <AbsoluteFill>
        <OffthreadVideo
          playbackRate={0.25}
          style={{ opacity: 0 }}
          src={speedLines}
          onVideoFrame={onVideoFrame}
        />
      </AbsoluteFill>
      <AbsoluteFill>
        <canvas ref={canvas} width={width} height={height} />
      </AbsoluteFill>
    </AbsoluteFill>
  )
}
