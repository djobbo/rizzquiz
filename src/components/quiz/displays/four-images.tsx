import { staticFile } from "remotion"
import { Audio } from "remotion"
import { AbsoluteFill } from "remotion"
import { Sequence, useCurrentFrame } from "remotion"
import { useVideoConfig } from "remotion"
import { spring } from "remotion"
import { Img } from "remotion"
import { cn } from "../../../helpers/cn"
import { Title } from "../../title"
import { sansSerifFont } from "../../../helpers/fonts"
import ConfettiExplosion from "react-canvas-confetti"

type FourImagesProps = {
  readonly images: [string, string, string, string]
}

const IMAGES_DIFFICULTY = [
  { title: "Hard", points: 4, color: "#F8333C" },
  { title: "Medium", points: 3, color: "#FCEC52" },
  { title: "Normal", points: 2, color: "#30BCED" },
  { title: "Easy", points: 1, color: "#06D6A0" },
] as const

type ImageProps = {
  readonly src: string
  readonly index: number
}

const Image = ({ src, index }: ImageProps) => {
  const difficulty = IMAGES_DIFFICULTY[index]
  const revealDelay = index * 2.5 + 1
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const scaleEntrance = spring({
    frame,
    fps,
    config: { damping: 15, mass: 0.9, stiffness: 200 },
    durationInFrames: 0.5 * fps,
    delay: 0,
  })

  const scaleReveal =
    spring({
      frame,
      fps,
      config: { damping: 35, mass: 0.5, stiffness: 64 },
      durationInFrames: 0.15 * fps,
      delay: revealDelay * fps,
    }) -
    spring({
      frame,
      fps,
      config: { damping: 12, mass: 2, stiffness: 136 },
      durationInFrames: 0.5 * fps,
      delay: (revealDelay + 0.15) * fps,
    })

  const scaleExit = spring({
    frame,
    fps,
    config: { mass: 2, damping: 100 },
    durationInFrames: 0.5 * fps,
    delay: 10 * fps,
  })

  const scale = scaleEntrance + 0.1 * scaleReveal - scaleExit

  const overlayTranslation = spring({
    frame: frame - index * 25,
    fps,
    config: { damping: 15, mass: 0.9, stiffness: 200 },
  })

  return (
    <div
      className="rounded-xl border-[16px] border-white bg-white grid grid-cols-1 grid-rows-1 overflow-hidden"
      style={{
        width: 672,
        height: 392,
        boxShadow: "16px 16px 0px rgba(0, 0, 0, 0.25)",
        transform: `scale(${scale})`,
      }}
    >
      <Audio volume={0.5} src={staticFile("assets/sounds/pop-low.mp3")} />
      <div
        className="flex flex-col items-center justify-center rounded-md w-full h-full"
        style={{
          backgroundColor: difficulty.color,
          gridArea: "1 / 1",
          transform: `translateY(${overlayTranslation}px)`,
        }}
      >
        <Title text={difficulty.title} fontSize={128} />
      </div>
      <Sequence from={revealDelay * fps} premountFor={revealDelay * fps}>
        <Audio src={staticFile("assets/sounds/pop-high.mp3")} />
        <Img
          pauseWhenLoading
          src={src}
          className="rounded-md object-cover object-center w-full h-full"
          style={{
            gridArea: "1 / 1",
          }}
        />
      </Sequence>
    </div>
  )
}

export const FourImages = ({ images }: FourImagesProps) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const exitOpacity =
    1 -
    spring({
      frame,
      fps,
      config: { damping: 15, mass: 0.9, stiffness: 200 },
      durationInFrames: 2 * fps,
      delay: 10 * fps,
    })

  return (
    <AbsoluteFill
      className="items-end pt-64 p-16 grid-cols-1 grid-rows-4"
      style={{ opacity: exitOpacity, display: "grid" }}
    >
      {images.map((image, index) => {
        const delay = index * 5

        const pointsOpacity = spring({
          frame: frame - delay,
          fps,
          config: { damping: 15, mass: 0.9, stiffness: 200 },
          durationInFrames: 2.5 * fps,
        })

        return (
          <Sequence
            key={index}
            premountFor={delay}
            from={delay}
            style={{
              position: "relative",
              height: undefined,
            }}
            className={cn("relative m-1 flex", {
              "flex-row": index % 2 === 0,
              "flex-row-reverse": index % 2 === 1,
            })}
          >
            <Image src={image} index={index} />
            <span
              className="flex flex-col flex-1 items-center justify-center text-center text-white font-bold"
              style={{
                fontFamily: sansSerifFont,
                fontSize: 80,
                opacity: pointsOpacity,
              }}
            >
              <span>+{4 - index}</span>
              <span className="-mt-8" style={{ fontSize: 48 }}>
                point{index === 3 ? "" : "s"}
              </span>
            </span>
          </Sequence>
        )
      })}
    </AbsoluteFill>
  )
}
