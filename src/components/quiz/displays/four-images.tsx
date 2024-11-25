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
import { shake } from "../../../helpers/shake"
import { AnimatedEmoji } from "@remotion/animated-emoji"

type FourImagesProps = {
  readonly images: [string, string, string, string]
  readonly isMobileView: boolean
}
// 😀 (Grinning Face) grinning
// 🥰 (Smiling Face with Hearts) heart-face
// 😂 (Face with Tears of Joy) joy
// 😲 (Astonished Face) astonished
// 😉 (Winking Face)
// 😅 (Grinning Face with Sweat) grin-sweat

const IMAGES_DIFFICULTY = [
  { title: "Hard", points: 4, color: "#F8333C", emoji: "grinning" }, // 😀
  { title: "Medium", points: 3, color: "#FCEC52", emoji: "heart-face" }, // 🥰
  { title: "Normal", points: 2, color: "#30BCED", emoji: "joy" }, // 😂
  { title: "Easy", points: 1, color: "#06D6A0", emoji: "astonished" }, // 😲
] as const

type ImageProps = {
  readonly src: string
  readonly index: number
  readonly isMobileView: boolean
}

const Image = ({ src, index, isMobileView }: ImageProps) => {
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
    delay: 11 * fps,
  })

  const scale = scaleEntrance + 0.1 * scaleReveal - scaleExit

  const overlayTranslation = spring({
    frame: frame - index * 25,
    fps,
    config: { damping: 15, mass: 0.9, stiffness: 200 },
  })

  const { x, y, rotation } = shake(frame, {
    intensity: 5,
    speed: 1,
    randomness: 0.8,
    rotationIntensity: 1,
    seed: index,
  })

  return (
    <div
      className="rounded-xl border-[16px] border-white bg-white grid grid-cols-1 grid-rows-1 overflow-hidden"
      style={{
        width: 672,
        height: 392,
        boxShadow: "16px 16px 0px rgba(0, 0, 0, 0.25)",
        transform: `scale(${scale}) translate(${x}px, ${y}px) rotate(${rotation}deg)`,
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
        {!isMobileView && (
          <span
            className="text-white font-bold -mt-8"
            style={{
              fontFamily: sansSerifFont,
              fontSize: 72,
            }}
          >
            +{4 - index} point{index === 3 ? "" : "s"}
          </span>
        )}
      </div>
      <Sequence from={revealDelay * fps} premountFor={revealDelay * fps}>
        <Audio src={staticFile("assets/sounds/pop-high.mp3")} />
        <Img
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

export const FourImages = ({ images, isMobileView }: FourImagesProps) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const exitOpacity =
    1 -
    spring({
      frame,
      fps,
      config: { damping: 15, mass: 0.9, stiffness: 200 },
      durationInFrames: 2 * fps,
      delay: 11 * fps,
    })

  return (
    <AbsoluteFill
      className={cn(
        {
          "p-16 grid-cols-1 grid-rows-4": isMobileView,
          "p-8 grid-cols-2 grid-rows-2 justify-center gap-y-16": !isMobileView,
        },
        "items-end pt-64",
      )}
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
              "flex-row-reverse": isMobileView && index % 2 === 1,
              "justify-center": !isMobileView,
            })}
          >
            <Image src={image} index={index} isMobileView={isMobileView} />
            {isMobileView && (
              <span
                className="flex flex-col flex-1 items-center justify-center text-center text-white font-bold"
                style={{
                  fontFamily: sansSerifFont,
                  fontSize: 92,
                  opacity: pointsOpacity,
                }}
              >
                <AnimatedEmoji
                  emoji={IMAGES_DIFFICULTY[index].emoji}
                  style={{
                    width: 128,
                    height: 128,
                  }}
                />
              </span>
            )}
          </Sequence>
        )
      })}
    </AbsoluteFill>
  )
}
