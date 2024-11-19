import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Question: React.FC<{
  text: string;
  accentColor: string;
}> = ({ text, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { mass: 0.5, damping: 10 },
  });

  return (
    <div
      style={{
        position: "absolute",
        top: "62%",
        width: "100%",
        textAlign: "center",
        transform: `scale(${scale})`,
      }}
    >
      <h1
        style={{
          fontSize: 48,
          color: accentColor,
          textShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
          margin: 0,
          padding: "0 20px",
        }}
      >
        {text}
      </h1>
    </div>
  );
};