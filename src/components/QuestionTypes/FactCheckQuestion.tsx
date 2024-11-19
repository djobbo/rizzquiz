
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface FactCheckQuestionProps {
  readonly facts: Array<{
    text: string;
    isTrue: boolean;
  }>;
}

export const FactCheckQuestion: React.FC<FactCheckQuestionProps> = ({
  facts,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        height: "60%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
      }}
    >
      {facts.map((fact, index) => {
        const scale = spring({
          frame: frame - index * 5,
          fps,
          config: { mass: 0.5, damping: 10 },
        });

        return (
          <div
            key={fact.text}
            style={{
              fontSize: 24,
              color: "#fff",
              backgroundColor: "rgba(255,255,255,0.1)",
              padding: "15px 30px",
              borderRadius: 15,
              transform: `scale(${scale})`,
              maxWidth: "80%",
              textAlign: "center",
            }}
          >
            {fact.text}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};