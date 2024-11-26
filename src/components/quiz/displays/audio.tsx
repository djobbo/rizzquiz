import { Audio, staticFile } from "remotion"
import { useVideoConfig } from "remotion"
import { useCurrentFrame } from "remotion"
import { spring } from "remotion"
import { AbsoluteFill } from "remotion"
import { shake } from "../../../helpers/shake"
import { useAudioData, visualizeAudio } from "@remotion/media-utils"
import { processAudioFftValue } from "../../../helpers/audio"

type WaveformProps = {
  readonly frame: number
  readonly src: string
}

const Waveform = ({ frame, src }: WaveformProps) => {
  const audioData = useAudioData(src)
  const { fps } = useVideoConfig()

  if (!audioData) {
    return null
  }

  const samplesCount = 512
  const barCount = 42

  const visualizationValues = visualizeAudio({
    fps,
    frame,
    audioData,
    numberOfSamples: samplesCount,
  })

  const samples = visualizationValues.slice(0, 0.2 * samplesCount)
  const sampleStep = Math.floor(samples.length / barCount)

  const minDb = -60
  const maxDb = -10

  const bars = Array.from({ length: barCount }).map((_, i) => {
    const processed = processAudioFftValue(
      samples[(i * sampleStep) % samples.length],
      { maxDb, minDb },
    )

    return Math.log(1 + processed)
  })

  // const amplitudes = frequencyData.map((value) => {
  //   const db = 20 * Math.log10(value)
  //   // Clamp and scale amplitude
  //   const scaled = Math.max(0, Math.min(1, (db - minDb) / (maxDb - minDb))) ** 2
  //   return scaled
  // })

  // display bars around a circle
  return (
    <div className="flex items-center gap-2">
      {bars.map((v) => {
        return (
          <div
            className="rounded-full bg-white"
            style={{ width: 16, height: Math.max(10, 200 * v) }}
          />
        )
      })}
    </div>
  )
}

type AudioDisplayProps = {
  readonly src: string
  readonly startFrom?: number
  readonly endAt?: number
  readonly volume?: number
}

export const AudioDisplay = ({
  src,
  startFrom = 0,
  endAt,
  volume = 1,
}: AudioDisplayProps) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const scaleEntrance = spring({
    frame,
    fps,
    config: { damping: 15, mass: 0.9, stiffness: 200 },
    durationInFrames: 0.5 * fps,
    delay: 0,
  })

  const scaleExit = spring({
    frame,
    fps,
    config: { mass: 2, damping: 100 },
    durationInFrames: 0.5 * fps,
    delay: 8 * fps,
  })

  const scale = scaleEntrance - scaleExit

  //   const { x, y } = shake(frame, 12, 0.75, 0.8)
  const { x, y, rotation } = shake(frame, {
    intensity: 12,
    speed: 0.75,
    randomness: 0.8,
    rotationIntensity: 2,
  })

  const volumeRamp = (frame: number) =>
    spring({
      frame,
      fps,
      config: { mass: 1, damping: 100 },
      from: 0,
      to: volume,
      durationInFrames: 0.5 * fps,
    }) -
    spring({
      frame,
      fps,
      config: { mass: 1, damping: 100 },
      from: 0,
      to: volume,
      durationInFrames: 0.5 * fps,
      delay: 8 * fps,
    })

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transform: `scale(${scale}) translate(${x}px, ${y}px) rotate(${rotation}deg)`,
      }}
    >
      <Audio
        src={src}
        startFrom={startFrom}
        endAt={endAt}
        volume={(f) => volume * volumeRamp(f)}
      />
      <Waveform frame={frame + startFrom} src={src} />
    </AbsoluteFill>
  )
}
