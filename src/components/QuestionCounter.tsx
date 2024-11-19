import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export const QuestionCounter: React.FC<{
  current: number;
  total: number;
  accentColor: string;
}> = ({ current, total, accentColor }) => {
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
        top: 40,
        right: 40,
        transform: `scale(${scale})`,
        color: accentColor,
        fontSize: 24,
        fontWeight: "bold",
        textShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
      }}
    >
      {current} / {total}
    </div>
  );
};