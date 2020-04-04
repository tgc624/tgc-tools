import React from "react";
import { getAllDateOfDayOfYear, getDayOfWeekOfJanuary1st } from "../utils";
import { TWeek } from "../utils/types";

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

export const Month = ({ year }: { year: number }) => {
  const daysOfSunday = getAllDateOfDayOfYear(year, TWeek.Sun);
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
    getDayOfWeekOfJanuary1st(year) === TWeek.Sun
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
