import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Options: React.FC<{
  options: string[];
  correctAnswer: number;
  accentColor: string;
}> = ({ options, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        position: "absolute",
        top: "75%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      {options.map((option, index) => {
        const delay = index * 5;
        const scale = spring({
          frame: frame - delay,
          fps,
          config: { mass: 0.5, damping: 10 },
        });

        return (
          <div
            key={option}
            style={{
              transform: `scale(${scale})`,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              padding: "15px 30px",
              borderRadius: 25,
              border: `2px solid ${accentColor}`,
              color: "#fff",
              fontSize: 24,
              cursor: "pointer",
              width: "70%",
              textAlign: "center",
            }}
          >
            {option}
          </div>
        );
      })}
    </div>
  );
};