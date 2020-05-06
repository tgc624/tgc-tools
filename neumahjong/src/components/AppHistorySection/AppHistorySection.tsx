import React, { useState } from "react";
import NList from "./../NList/NList";
import NInput from "./../NInput";
import NModal from "./../NModal";
import NButton from "./../NButton/NButton";
import { GameResults } from "./../../types";
import Score from "./../BaseScore";

const AddHistoryModal = (props: {
  open: boolean;
  toggleOpen: () => void;
  users: [string, string, string, string];
}) => {
  const [gameResults, setGameResults] = useState([
    { score: 0, rank: 1 },
    { score: 0, rank: 2 },
    { score: 0, rank: 3 },
    { score: 0, rank: 4 },
  ] as GameResults);

  const setGameResult = (index: number) => (score: number) => {
    setGameResults(
      (currentGameResults) =>
        [
          ...currentGameResults.slice(0, index),
          { score, rank: currentGameResults[index].rank },
          ...currentGameResults.slice(index + 1),
        ] as GameResults
    );
  };

  return (
    <NModal open={props.open} toggleOpen={props.toggleOpen}>
      <div style={{ padding: "0px 16px", paddingBottom: 16 }}>
        <p>新しくスコアを登録します！</p>
        {props.users.map((user, index) => (
          <div key={index}>
            <span>{gameResults[index].rank}</span>
            <NInput
              label={user}
              type="number"
              value={gameResults[index].score}
              onChange={setGameResult(index)}
            />
          </div>
        ))}
        <NButton onClick={() => {}}>登録</NButton>
      </div>
    </NModal>
  );
};

export const HistorySection = (props: {
  histories: [number, number, number, number][];
  users: [string, string, string, string];
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const toggleDialogOpen = () => setDialogOpen((x) => !x);
  return (
    <section>
      <NList>
        {props.histories.map((history, index) => {
          return (
            <div key={index} className={`convex yoko-ni-4tsu-naraberu`}>
              <Score scores={history} />
            </div>
          );
        })}
      </NList>
      <AddHistoryModal
        users={props.users}
        open={isDialogOpen}
        toggleOpen={toggleDialogOpen}
      />
      <NButton onClick={toggleDialogOpen}>結果を登録</NButton>
    </section>
  );
};
