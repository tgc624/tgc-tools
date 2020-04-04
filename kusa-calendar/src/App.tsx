import React from "react";
import "./App.css";
import { Month } from "./components/Month";
import { Week } from "./components/Week";
import { TWeek } from "./utils/types";

function App() {
  const yearOfParam = new URL(document.location.href).searchParams.get("year");
  const year = parseInt(yearOfParam || "") || new Date().getFullYear();

  const colorOfParam = new URL(document.location.href).searchParams.get(
    "color"
  );
  const color = colorOfParam || "";

  return (
    <div>
      <div>{year}</div>
      <div className="calendar">
        <Month year={year} />
        <Week color={color} week={TWeek.Sun} year={year} />
        <Week color={color} week={TWeek.Mon} year={year} />
        <Week color={color} week={TWeek.Tue} year={year} />
        <Week color={color} week={TWeek.Wed} year={year} />
        <Week color={color} week={TWeek.Thu} year={year} />
        <Week color={color} week={TWeek.Fri} year={year} />
        <Week color={color} week={TWeek.Sat} year={year} />
      </div>
    </div>
  );
}

export default App;
