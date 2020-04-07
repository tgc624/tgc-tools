import React from "react";
import logo from "./logo.svg";
import "./App.css";

const RulesSection = () => {
  return (
    <section className="box convex">
      <h1>Rules</h1>
      <p>10, 5, -5, -10</p>
      <p>25,000／30,000</p>
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

const HistorySection = ({
  histories,
}: {
  histories: [number, number, number, number][];
}) => {
  return (
    <section className="list">
      <div className="convex list-item-top yoko-ni-4tsu-naraberu">
        <Score scores={[0, 0, 0, 0]} />
      </div>
      <div className="convex yoko-ni-4tsu-naraberu">
        <Score scores={[0, 0, 0, 0]} />
      </div>
      <div className="convex yoko-ni-4tsu-naraberu">
        <Score scores={[0, 0, 0, 0]} />
      </div>
      <div className="convex yoko-ni-4tsu-naraberu">
        <Score scores={[0, 0, 0, 0]} />
      </div>
      <div className="convex yoko-ni-4tsu-naraberu">
        <Score scores={[0, 0, 0, 0]} />
      </div>
      <div className="convex yoko-ni-4tsu-naraberu">
        <Score scores={[0, 0, 0, 0]} />
      </div>
      <div className="convex list-item-bottom yoko-ni-4tsu-naraberu">
        <Score scores={[0, 0, 0, 0]} />
      </div>
    </section>
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

function parseJson<T>(json: string, defaultValue: T): T {
  let value: T;
  try {
    value = JSON.parse(json);
  } catch (error) {
    return defaultValue;
  }
  return value;
}

function App() {
  const params = getQueries("users", "uma", "oka");
  const users = parseJson(params["users"], [
    "anonymous",
    "anonymous",
    "anonymous",
    "anonymous",
  ] as [string, string, string, string]);
  // TODO usersのバリデーションを行う
  // TODO usersが不正だったり、4に満たなかったら、登録させるような画面に遷移させる
  return (
    <div>
      <article className="top-page">
        <RulesSection />
        <UsersSection users={users} />
        <TotalSection totalScore={[0, 0, 0, 0]} />
        <HistorySection histories={[]} />
      </article>
    </div>
  );
}

export default App;
