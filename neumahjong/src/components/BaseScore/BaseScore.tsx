import React from "react";

// TODO 重複しているので、まとめる
export const BaseScore = ({
  scores,
}: {
  scores: [number, number, number, number];
}) => {
  return (
    <>
      {scores.map((score, index) => (
        <p key={index} className="text-center">
          {score}
        </p>
      ))}
    </>
  );
};
