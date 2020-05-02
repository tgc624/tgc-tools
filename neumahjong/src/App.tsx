import React, { useState, useRef } from "react";
import NList from "./components/NList/NList";
import "./App.css";

const RulesSection = ({
  uma,
  oka,
}: {
  uma: [number, number, number, number];
  oka: [number, number];
}) => {
  return (
    <section className="box convex">
      <h1>Rules</h1>
      <p>{uma}</p>
      <p>同点のときウマどうする？起家？分ける？</p>
      <p>場に残ったリーチ棒の取り扱いは？</p>
      <p>{oka}</p>
    </section>
  );
};

const UsersSection = ({
  users,
}: {
  users: [string, string, string, string];
}) => {
  return (
    <section className="yoko-ni-4tsu-naraberu">
      {users.map((name, index) => (
        <div key={index} className="box convex text-center">
          <p>{name}</p>
        </div>
      ))}
    </section>
  );
};

const Score = ({ scores }: { scores: [number, number, number, number] }) => {
  return (
    <React.Fragment>
      {scores.map((score, index) => (
        <p key={index} className="text-center">
          {score}
        </p>
      ))}
    </React.Fragment>
  );
};

const TotalSection = ({
  totalScore,
}: {
  totalScore: [number, number, number, number];
}) => {
  return (
    <section className="yoko-ni-4tsu-naraberu">
      <Score scores={totalScore} />
    </section>
  );
};

const AddHistoryModal = ({ open }: { open: boolean }) => {
  const ref = useRef<HTMLDialogElement>();
  // @ts-ignore
  const dialog = <dialog ref={ref}>Add</dialog>;

  if (open) {
    ref.current?.close?.(); // close()せずにshowModal()するとエラーになるので、close()する
    ref.current?.showModal?.();
  } else {
    ref.current?.close?.();
  }
  return dialog;
};

const HistorySection = ({
  histories,
  onClickButton,
}: {
  histories: [number, number, number, number][];
  onClickButton: () => void;
}) => {
  return (
    <>
      <NList>
        {histories.map((history, index) => {
          return (
            <div key={index} className={`convex yoko-ni-4tsu-naraberu`}>
              <Score scores={history} />
            </div>
          );
        })}
      </NList>
      <button className="button convex" onClick={onClickButton}>
        結果を登録
      </button>
    </>
  );
};

const getQueries = (...paramNames: string[]): { [x: string]: string } => {
  const params = new URL(document.location.href).searchParams;
  const paramEntities = paramNames.map((paramName) => [
    paramName,
    params.get(paramName) || "",
  ]);
  return Object.fromEntries(paramEntities);
};

function parseJson<T>(
  json: string,
  defaultValue: T,
  isValid?: (value: T) => boolean
): T {
  let value: T;
  try {
    value = JSON.parse(json);
    if (typeof isValid === "function" && !isValid(value)) {
      throw new Error();
    }
  } catch (error) {
    return defaultValue;
  }
  return value;
}

type GameResult = { score: number; rank: 1 | 2 | 3 | 4 };
type PointResult = { point: number; rank: 1 | 2 | 3 | 4 };
type Scores = [number, number, number, number];
type GameResults = [GameResult, GameResult, GameResult, GameResult];
type PointResults = [PointResult, PointResult, PointResult, PointResult];
type Uma = [number, number, number, number];
type Oka = [number, number];

/** オカを反映させたポイントを返す */
export const reflectOka = (
  gameResults: GameResults,
  oka: Oka
): PointResults => {
  const returnScore = oka[1];
  const kaeshi = gameResults.map((gameResult) => ({
    point: (gameResult.score - returnScore) / 1000,
    rank: gameResult.rank,
  }));
  const numberOfFirstRank = gameResults.filter((result) => result.rank === 1)
    .length;
  const amari = -kaeshi
    .filter((k) => k.rank !== 1) // 一位じゃないユーザ
    .map((k) => k.point)
    .reduce((acc, cur) => acc + cur);
  const pointOfFirstRank = amari / numberOfFirstRank;
  const saisyu_kekka = kaeshi.map((k) => ({
    rank: k.rank,
    point: k.rank === 1 ? pointOfFirstRank : k.point,
  }));
  return saisyu_kekka as PointResults;
};

export const reflectUma = (pointResults: PointResults, uma: Uma) => {
  return pointResults.map(({ rank, point }) => ({
    rank,
    point: point + uma[rank - 1],
  }));
};

function App() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const params = getQueries("users", "uma", "oka");
  const isUsersValid = (users: [string, string, string, string]) => {
    return (
      Array.isArray(users) &&
      users.length === 4 &&
      users.every((user) => typeof user === "string")
    );
  };
  const users = parseJson(
    params["users"],
    ["anonymous", "anonymous", "anonymous", "anonymous"] as [
      string,
      string,
      string,
      string
    ],
    isUsersValid
  );
  // TODO usersが不正だったり、4に満たなかったら、登録させるような画面に遷移させる
  const isUmaValid = (uma: [number, number, number, number]) => {
    return (
      Array.isArray(uma) &&
      uma.length === 4 &&
      uma.every((u) => Number.isInteger(u)) &&
      uma.reduce((acc, cur) => acc + cur) === 0
    );
  };
  const uma = parseJson(
    params["uma"],
    [10, 5, -5, -10] as [number, number, number, number],
    isUmaValid
  );
  const isOkaValid = (oka: [number, number]) => {
    return (
      Array.isArray(oka) &&
      oka.length === 2 &&
      oka.every((u) => Number.isInteger(u))
    );
  };
  const oka = parseJson(
    params["oka"],
    [25000, 30000] as [number, number],
    isOkaValid
  );
  return (
    <div>
      <article className="top-page">
        <RulesSection uma={uma} oka={oka} />
        <UsersSection users={users} />
        <TotalSection totalScore={[0, 0, 0, 0]} />
        <HistorySection
          histories={[
            [0, 0, 0, 0],
            [1, 2, 3, 4],
            [1000, 2000, 4000, 50000],
          ]}
          onClickButton={() => setDialogOpen((open) => !open)}
        />
        <AddHistoryModal open={isDialogOpen} />
      </article>
    </div>
  );
}

export default App;
