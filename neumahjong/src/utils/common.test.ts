import { sortByOrder } from "./common";

describe(sortByOrder.name, () => {
  test("orderカラムの若い順にソートする", () => {
    const actual = sortByOrder([{ order: 3 }, { order: 1 }, { order: 2 }]);
    expect(actual).toEqual([{ order: 1 }, { order: 2 }, { order: 3 }]);
  });
  test("もとの配列の順番は維持される", () => {
    const originalArray = [{ order: 3 }, { order: 1 }, { order: 2 }];
    sortByOrder(originalArray);
    expect(originalArray).toEqual([{ order: 3 }, { order: 1 }, { order: 2 }]);
  });
});
