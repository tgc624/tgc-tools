const calcDateDiff = (date1: Date, date2: Date) => {
  const DATE_IN_EPOC = 24 * 60 * 60 * 1000;
  return Math.ceil(date1.getTime() - date2.getTime()) / DATE_IN_EPOC;
};

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
export const getAllDateOfDayOfYear = (year: number, targetDay: number) => {
  const daysOfYear = getAllDateOfYear(year);
  return daysOfYear.filter(day => day.getDay() === targetDay);
};

/** 1月1日の曜日を返す */
export const getDayOfWeekOfJanuary1st = (year: number) => {
  return new Date(year, 1 - 1, 1).getDay();
};
