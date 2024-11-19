import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Reveal: React.FC<{
  correctAnswer: number;
  options: string[];
  questionNumber: number;
  totalQuestions: number;
}> = ({ correctAnswer, options, questionNumber, totalQuestions }) => {
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
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) scale(${scale})`,
        color: "#fff",
        fontSize: 64,
        textAlign: "center",
        textShadow: "0 0 20px rgba(255, 0, 255, 0.8)",
      }}
    >
      <h1 style={{ margin: 0 }}>Answer:</h1>
      <p style={{ margin: "20px 0", fontSize: 48 }}>
        {options[correctAnswer]}
      </p>
      {questionNumber < totalQuestions && (
        <p style={{ fontSize: 32, opacity: 0.8 }}>
          Next question in 3...
        </p>
      )}
      {questionNumber === totalQuestions && (
        <p style={{ fontSize: 32, opacity: 0.8 }}>
          Quiz Complete! 🎉
        </p>
      )}
    </div>
  );
};