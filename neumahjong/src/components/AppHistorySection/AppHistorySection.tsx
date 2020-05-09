import React, { useState } from "react";
import NList from "./../NList/NList";
import NInput from "./../NInput";
import NModal from "./../NModal";
import NButton from "./../NButton/NButton";
import { GameResults, GameResult } from "./../../types";
import Score from "./../BaseScore";

const AddHistoryModalContentInputScores = (props: {
  users: [string, string, string, string];
  scores: [number, number, number, number];
  setScores: (newScores: [number, number, number, number]) => void;
}) => {
  const setScore = (index: number) => (newScore: number) => {
    props.setScores([
      ...props.scores.slice(0, index),
      newScore,
      ...props.scores.slice(index + 1),
    ] as [number, number, number, number]);
  };
  return (
    <div>
      {props.users.map((user, index) => (
        <NInput
          key={index}
          label={user}
          type="number"
          value={props.scores[index]}
          onChange={setScore(index)}
        />
      ))}
      {/* TODO 残りの点を表示する */}
    </div>
  );
};

const AddHistoryModalContentAdjustRanks = (props: {
  users: [string, string, string, string];
  gameResults: GameResults;
  setGameResults: (newGameResults: GameResults) => void;
}) => {
  // TODO 名前・スコアはREADONLYで、ランクのみ変更できるようにする
  return <div></div>;
};

const AddHistoryModal = (props: {
  open: boolean;
  toggleOpen: () => void;
  users: [string, string, string, string];
}) => {
  const [contentMode, setContentMode] = useState(
    "inputScores" as "inputScores" | "adjustRanks"
  );
  const [gameResults, setGameResults] = useState([
    { score: 0, rank: 1 },
    { score: 0, rank: 2 },
    { score: 0, rank: 3 },
    { score: 0, rank: 4 },
  ] as GameResults);
  const scores = gameResults.map((gameResult) => gameResult.score) as [
    number,
    number,
    number,
    number
  ];
  /**
   * scoresからgameResultsを生成する。
   * 同点の場合、適当にランク付けする。
   */
  const getGameResults = (scores: [number, number, number, number]) => {
    type IndexedGameResults = Array<GameResult & { index: number }>;
    const compareByScore = (obj1: { score: number }, obj2: { score: number }) =>
      obj1.score - obj2.score;
    const compareByIndex = (obj1: { index: number }, obj2: { index: number }) =>
      obj1.index - obj2.index;

    return scores
      .map((score, index) => ({
        score,
        index,
        rank: 0,
      }))
      .sort(compareByScore)
      .map((indexedGameResult, index) => ({
        score: indexedGameResult.score,
        rank: index + 1,
        index: indexedGameResult.index,
      }))
      .sort(compareByIndex)
      .map(({ score, rank }) => ({ score, rank })) as GameResults;
  };

  const setScores = (scores: [number, number, number, number]) => {
    setGameResults(getGameResults(scores));
  };
  const areThereAnyPlayersWithTheSameScore = (gameResults: GameResults) => {
    const scores = gameResults.map((gameResult) => gameResult.score);
    const unduplicatedScores = new Set(scores);
    return unduplicatedScores.size !== gameResults.length;
  };

  const onClickRegisterButton = (currentGameResults: GameResults) => {
    if (areThereAnyPlayersWithTheSameScore(currentGameResults)) {
      setContentMode("adjustRanks");
      return;
    }
    // 親に追加する
  };

  const getContent = {
    inputScores: (
      <AddHistoryModalContentInputScores
        users={props.users}
        scores={scores}
        setScores={setScores}
      />
    ),
    adjustRanks: (
      <AddHistoryModalContentAdjustRanks
        users={props.users}
        gameResults={gameResults}
        setGameResults={setGameResults}
      />
    ),
  };
  return (
    <NModal open={props.open} toggleOpen={props.toggleOpen}>
      <div style={{ padding: "0px 16px", paddingBottom: 16 }}>
        <p>新しくスコアを登録します！</p>
        {getContent[contentMode]}
        <NButton onClick={() => onClickRegisterButton(gameResults)}>
          登録
        </NButton>
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
