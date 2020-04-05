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
    <section className="users-section">
      {users.map((name, index) => (
        <div key={index} className="box convex">
          {name}
        </div>
      ))}
    </section>
  );
};

const TotalSection = ({
  totalScore,
}: {
  totalScore: [number, number, number, number];
}) => {
  return (
    <section className="total-section">
      {totalScore.map((score, index) => (
        <div key={index}>{score}</div>
      ))}
    </section>
  );
};

const HistorySection = ({
  histories,
}: {
  histories: [number, number, number, number][];
}) => {
  return <section></section>;
};

function App() {
  return (
    <div>
      <article className="top-page">
        <RulesSection />
        <UsersSection users={["User A", "User B", "User C", "User D"]} />
        <TotalSection totalScore={[0, 0, 0, 0]} />
        <HistorySection histories={[]} />
      </article>
    </div>
  );
}

export default App;
