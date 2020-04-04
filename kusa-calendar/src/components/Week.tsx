import React from "react";
import { getAllDateOfDayOfYear, getDayOfWeekOfJanuary1st } from "../utils";
import { TWeek } from "../utils/types";

const isWeekNameDisplay = (week: TWeek) =>
  [TWeek.Mon, TWeek.Wed, TWeek.Fri].includes(week);
const WEEK_NAME = Object.freeze([
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
]);
export const Week = ({
  color,
  week,
  year
}: {
  color?: string;
  year: number;
  week: TWeek;
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
