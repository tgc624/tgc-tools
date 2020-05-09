import React, { useState } from "react";
import NInput from "./components/NInput";
import NModal from "./components/NModal";
import HistorySection from "./components/AppHistorySection";
import Score from "./components/BaseScore";
import { GameResults } from "./types";
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

const User = (props: { name: string; onChange: (name: string) => void }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className="box clickable convex text-center"
        onClick={() => setOpen((x) => !x)}
      >
        <p>{props.name}</p>
      </div>
      <ModifyUserNameModal
        name={props.name}
        open={open}
        toggleOpen={() => setOpen((x) => !x)}
        onChange={props.onChange}
      />
    </>
  );
};

const UsersSection = (props: {
  users: [string, string, string, string];
  onChange: (users: [string, string, string, string]) => void;
}) => {
  const onChangeUser = (name: string, index: number) => {
    const nextUsers = [...props.users] as [string, string, string, string];
    nextUsers.splice(index, 1, name);
    props.onChange(nextUsers);
  };
  return (
    <>
      <section className="yoko-ni-4tsu-naraberu">
        {props.users.map((name, index) => (
          <User
            key={index}
            name={name}
            onChange={(name: string) => onChangeUser(name, index)}
          />
        ))}
      </section>
    </>
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

const ModifyUserNameModal = (props: {
  name: string;
  open: boolean;
  toggleOpen: () => void;
  onChange: (name: string) => void;
}) => {
  return (
    <NModal open={props.open} toggleOpen={props.toggleOpen}>
      <div style={{ padding: 16 }}>
        <p style={{ margin: 0 }}>プレイヤーの名前を変更します！</p>
        <NInput value={props.name} onChange={props.onChange} />
      </div>
    </NModal>
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

type PointResult = { point: number; rank: 1 | 2 | 3 | 4 };
type Scores = [number, number, number, number];
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
  const params = getQueries("users", "uma", "oka");
  const isUsersValid = (users: [string, string, string, string]) => {
    return (
      Array.isArray(users) &&
      users.length === 4 &&
      users.every((user) => typeof user === "string")
    );
  };
  const [users, setUsers] = useState(
    parseJson(
      params["users"],
      ["?", "?", "?", "?"] as [string, string, string, string],
      isUsersValid
    )
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
  const changeUsers = (users: [string, string, string, string]) => {
    setUsers(users);
    const nextParams = new URLSearchParams();
    nextParams.append("uma", params["uma"]);
    nextParams.append("oka", params["oka"]);
    nextParams.append("users", JSON.stringify(users));
    nextParams.sort();
    const nextUrl =
      window.location.origin +
      window.location.pathname +
      "?" +
      nextParams.toString();
    window.history.pushState({ path: nextUrl }, "", nextUrl);
  };
  const [history, setHistory] = useState([] as GameResults[]);
  return (
    <div>
      <article className="top-page">
        <RulesSection uma={uma} oka={oka} />
        <UsersSection users={users} onChange={changeUsers} />
        <TotalSection totalScore={[0, 0, 0, 0]} />
        <HistorySection
          history={history}
          pushHistory={(gameResults) => {
            setHistory((currentHistory) => [...currentHistory, gameResults]);
          }}
          users={users}
        />
      </article>
    </div>
  );
}

export default App;
