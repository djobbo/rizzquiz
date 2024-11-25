import { cn } from "../helpers/cn"

type TitleProps = {
  readonly text: string
  readonly fontSize?: number
  readonly className?: string
}

export const Title = ({ text, fontSize = 128, className }: TitleProps) => {
  return (
    <p className={cn("grid grid-rows-1 grid-cols-1", className)}>
      {[
        { color: "#1D2227", strokeColor: "#1D2227", offsetY: "8px" },
        { color: "white", strokeColor: "#292F36", offsetY: "0px" },
      ].map((layer, index) => (
        <span
          className="uppercase"
          style={{
            fontSize,
            paintOrder: "stroke fill",
            color: layer.color,
            WebkitTextStroke: `${(fontSize / 4).toFixed(0)}px ${layer.strokeColor}`,
            gridArea: "1 / 1",
            transform: `translateY(${layer.offsetY})`,
            zIndex: index,
          }}
        >
          {text}
        </span>
      ))}
    </p>
  )
}
