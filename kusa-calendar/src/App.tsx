import React from "react";
import "./App.css";

enum Weeek {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat
}

const Month = ({ year }: { year: number }) => {
  const daysOfSunday = getAllDateOfDayOfYear(year, Weeek.Sun);
  const getMonthLabel = (days: Date[]) => {
    const alreadyUsedMonth = new Set();
    return days.map(day => {
      const currentMonth = day.getMonth();
      if (alreadyUsedMonth.has(currentMonth)) {
        return "";
      }
      alreadyUsedMonth.add(currentMonth);
      return MONTH_NAME[currentMonth];
    });
  };
  const head = <div key="head" />;
  const headCells =
    getDayOfWeekOfJanuary1st(year) === Weeek.Sun
      ? []
      : [<div key="headCell" />];
  const mainCells = getMonthLabel(daysOfSunday).map((label, index) => (
    <div key={`mainCell-${index}`} className="label label__month">
      {label}
    </div>
  ));
  const tailCells = [
    ...new Array(54 - (headCells.length + mainCells.length))
  ].map((_, index) => <div key={`tailCell-${index}`} />);
  return (
    <React.Fragment>
      {[head, ...headCells, ...mainCells, ...tailCells]}
    </React.Fragment>
  );
};

/** 1月1日の曜日を返す */
const getDayOfWeekOfJanuary1st = (year: number) => {
  return new Date(year, 1 - 1, 1).getDay();
};

const WEEK_NAME = {
  [Weeek.Sun]: "Sun",
  [Weeek.Mon]: "Mon",
  [Weeek.Tue]: "Tue",
  [Weeek.Wed]: "Wed",
  [Weeek.Thu]: "Thu",
  [Weeek.Fri]: "Fri",
  [Weeek.Sat]: "Sat"
};

const MONTH_NAME = Object.freeze([
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
]);

/** その年の全部の日にちを返却する */
const getAllDateOfYear = (year: number) => {
  const DATE_IN_EPOC = 24 * 60 * 60 * 1000;
  const daysOfYear = calcDateDiff(
    new Date(year + 1, 0, 1),
    new Date(year, 0, 1)
  );
  const epocOfJanuary1st = new Date(year, 0, 1).getTime();
  return [...Array(daysOfYear)].map(
    (_, index) => new Date(epocOfJanuary1st + DATE_IN_EPOC * index)
  );
};

/** その年の特定の曜日の全部の日にちを返却する */
const getAllDateOfDayOfYear = (year: number, targetDay: number) => {
  const daysOfYear = getAllDateOfYear(year);
  return daysOfYear.filter(day => day.getDay() === targetDay);
};

const isWeekNameDisplay = (week: Weeek) =>
  [Weeek.Mon, Weeek.Wed, Weeek.Fri].includes(week);

const Week = ({
  color,
  week,
  year
}: {
  color?: string;
  year: number;
  week: Weeek;
}) => {
  const head = (
    <div key={`${week}head`} className="label label__week">
      {isWeekNameDisplay(week) ? WEEK_NAME[week] : ""}
    </div>
  );
  const dates = getAllDateOfDayOfYear(year, week).map(day => day.getDate());
  // const numberOfEmptyTailCells = 2;
  const headCells =
    week < getDayOfWeekOfJanuary1st(year) ? [<div key={`headCell`} />] : [];
  const coloredCells = dates.map((date, index) => (
    <div
      key={`${week}${index}`}
      className="date"
      style={{ backgroundColor: color }}
    >
      <span>{date}</span>
    </div>
  ));
  const tailCells = [
    ...new Array(54 - (headCells.length + coloredCells.length))
  ].map((_, index) => <div key={`tailCell-${index}`} />);
  return (
    <React.Fragment>
      {[head, ...headCells, ...coloredCells, ...tailCells]}
    </React.Fragment>
  );
};

const calcDateDiff = (date1: Date, date2: Date) => {
  const DATE_IN_EPOC = 24 * 60 * 60 * 1000;
  return Math.ceil(date1.getTime() - date2.getTime()) / DATE_IN_EPOC;
};

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
        <Week color={color} week={Weeek.Sun} year={year} />
        <Week color={color} week={Weeek.Mon} year={year} />
        <Week color={color} week={Weeek.Tue} year={year} />
        <Week color={color} week={Weeek.Wed} year={year} />
        <Week color={color} week={Weeek.Thu} year={year} />
        <Week color={color} week={Weeek.Fri} year={year} />
        <Week color={color} week={Weeek.Sat} year={year} />
      </div>
    </div>
  );
}

export default App;
