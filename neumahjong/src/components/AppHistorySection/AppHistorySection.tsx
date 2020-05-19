import React, { useState, useMemo, useEffect } from "react";
import NList from "./../NList/NList";
import NInput from "./../NInput";
import NModal from "./../NModal";
import NButton from "./../NButton/NButton";
import { GameResults, GameResult } from "./../../types";
import Score from "./../BaseScore";
import styles from "./AppHistorySection.module.css";

type Ranks = [number, number, number, number];
type Scores = [number, number, number, number];

const areAllValuesInteger = (values: number[]) =>
  values.every((value) => Number.isInteger(value));

export const getRankEq = (scores: number[]) => {
  // if (!areAllValuesInteger(scores)) throw Error();
  const sortedScores = [...scores].sort((a, b) => b - a); // 大きいスコアほど先頭になるようソート
  return scores.map(
    (score) =>
      1 + sortedScores.findIndex((sortedScore) => sortedScore === score)
  );
};

const AddHistoryModalContentInputScores = (props: {
  users: [string, string, string, string];
  scores: [number, number, number, number];
  setScores: (newScores: [number, number, number, number]) => void;
  onClickRegisterButton: () => void;
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
      <NButton onClick={props.onClickRegisterButton}>登録</NButton>
    </div>
  );
};
export const getDuplicatedNumber = (
  numbers: [number, number, number, number]
) => {
  const sortedNumbers = [...numbers].sort();
  const duplicatedNumbers = sortedNumbers.filter(
    (num, index, _nums) => index !== _nums.findIndex((_num) => num === _num)
  );
  return duplicatedNumbers.length === 0 ? NaN : Math.min(...duplicatedNumbers);
};

// TODO zipにひとまとめにする https://html5experts.jp/shumpei-shiraishi/24660/
export const zip2 = <T extends {}, U>(array1: T[], array2: U[]) => {
  const length = Math.min(array1.length, array2.length);
  return [...Array(length)].map((_, i) => [array1[i], array2[i]] as [T, U]);
};
const zip3 = <T extends {}, U, R>(array1: T[], array2: U[], array3: R[]) => {
  const length = Math.min(array1.length, array2.length, array3.length);
  return [...Array(length)].map(
    (_, i) => [array1[i], array2[i], array3[i]] as [T, U, R]
  );
};

const AddHistoryModalContentAdjustRanks = (props: {
  users: [string, string, string, string];
  scores: Scores;
  ranks: Ranks;
  setRanks: (ranks: [number, number, number, number]) => void;
  back: () => void;
}) => {
  const targetRank = getDuplicatedNumber(props.ranks);
  // TODO 名前・スコアはREADONLYで、ランクのみ変更できるようにする
  return (
    <div>
      <p>{targetRank}着は誰ですか？</p>
      <div className={`grid-container gap-12`}>
        {zip3(props.users, props.scores, props.ranks).map(
          ([user, score, rank], index) => {
            const [displayedRank, className] =
              targetRank === rank
                ? ["", "flex-container box convex"]
                : [rank, "flex-container box"];
            return (
              <div key={index} className={`${className} pa-3`}>
                <div className="col-2 v-center">{displayedRank}</div>
                <div className="col-6 h-center v-center">{user}</div>
                <div className="col-4 h-end v-center">{score}</div>
              </div>
            );
          }
        )}
      </div>
      <NButton onClick={() => props.back()}>戻る</NButton>
    </div>
  );
};

const AddHistoryModal = (props: {
  open: boolean;
  toggleOpen: () => void;
  users: [string, string, string, string];
  pushHistory: (gameResults: GameResults) => void;
}) => {
  const [contentMode, setContentMode] = useState(
    "inputScores" as "inputScores" | "adjustRanks"
  );
  const [scores, setScores] = useState([0, 0, 0, 0] as Scores);
  const [ranks, setRanks] = useState([0, 0, 0, 0] as Ranks);
  useEffect(() => {
    const newRanks = getRankEq(scores) as Ranks;
    setRanks(newRanks);
  }, [scores]);
  const areThereDuplicatedRanks = (ranks: Ranks) => {
    const distinctRanks = new Set(ranks);
    return distinctRanks.size !== ranks.length;
  };
  const onClickRegisterButtonInInputScores = () => {
    const adjustedScores = scores.map((score) => +score) as Scores; // 空文字の場合がありうるので
    const newRanks = getRankEq(adjustedScores) as Ranks;
    if (areThereDuplicatedRanks(newRanks)) {
      setScores(adjustedScores);
      setRanks(newRanks);
      setContentMode("adjustRanks");
      return;
    }
    const gameResults = zip2(adjustedScores, newRanks).map(([score, rank]) => ({
      score,
      rank,
    })) as GameResults;
    props.pushHistory(gameResults);
    setScores([0, 0, 0, 0]);
    setRanks([1, 1, 1, 1]);
    props.toggleOpen();
  };

  const getContent = {
    inputScores: (
      <AddHistoryModalContentInputScores
        users={props.users}
        scores={scores}
        setScores={setScores}
        onClickRegisterButton={onClickRegisterButtonInInputScores}
      />
    ),
    adjustRanks: (
      <AddHistoryModalContentAdjustRanks
        users={props.users}
        scores={scores}
        ranks={ranks}
        setRanks={setRanks}
        back={() => setContentMode("inputScores")}
      />
    ),
  };
  return (
    <NModal open={props.open} toggleOpen={props.toggleOpen}>
      <div style={{ padding: "0px 16px", paddingBottom: 16 }}>
        <p>新しくスコアを登録します！</p>
        {getContent[contentMode]}
      </div>
    </NModal>
  );
};

export const HistorySection = (props: {
  history: GameResults[];
  pushHistory: (gameResults: GameResults) => void;
  users: [string, string, string, string];
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const toggleDialogOpen = () => setDialogOpen((x) => !x);
  const scoreHistory = useMemo(
    () =>
      props.history.map(
        (gameResults) =>
          gameResults.map(({ score }) => score) as [
            number,
            number,
            number,
            number
          ]
      ),
    [props.history]
  );
  return (
    <section>
      <NList>
        {scoreHistory.map((history, index) => {
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
        pushHistory={props.pushHistory}
      />
      <NButton onClick={toggleDialogOpen}>結果を登録</NButton>
    </section>
  );
};
