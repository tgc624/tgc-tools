import { getRankEq, getDuplicatedNumber, zip2 } from "./AppHistorySection";

describe(getRankEq.name, () => {
  test("ダブリがない場合は、そのまま返却する", () => {
    const actual = getRankEq([10, 20, 30, 40]);
    expect(actual).toEqual([4, 3, 2, 1]);
  });
  test("ダブリがある場合は、若い順位にまとめる", () => {
    const actual = getRankEq([10, 10, 30, 40]);
    expect(actual).toEqual([3, 3, 2, 1]);
  });
  test("ダブリが2つある場合は、それぞれ若い順位にまとめる", () => {
    const actual = getRankEq([20, 20, 10, 10]);
    expect(actual).toEqual([1, 1, 3, 3]);
  });
  test("トリプりがある場合も、若い順位にまとめる", () => {
    const actual = getRankEq([10, 5, 10, 10]);
    expect(actual).toEqual([1, 4, 1, 1]);
  });
  test("クアドラプりがある場合は、若い順位にまとめる（すべて1）", () => {
    const actual = getRankEq([10, 10, 10, 10]);
    expect(actual).toEqual([1, 1, 1, 1]);
  });
});
describe(getDuplicatedNumber.name, () => {
  test("ダブリがない場合は、NaNを返却する", () => {
    const actual = getDuplicatedNumber([1, 2, 3, 4]);
    expect(actual).toEqual(NaN);
  });
  test("ダブリがあれば、その値を返却する", () => {
    const actual = getDuplicatedNumber([1, 2, 2, 4]);
    expect(actual).toEqual(2);
  });
  test("ダブリが複数ある場合、そのうち一番小さい数字を返却する", () => {
    const actual = getDuplicatedNumber([1, 1, 3, 3]);
    expect(actual).toEqual(1);
  });
});
xdescribe(zip2.name, () => {
  test("", () => {
    const actual = zip2([1, 2, 3], ["a", "b", "c"]);
    expect(actual).toEqual([
      [1, "a"],
      [2, "b"],
      [3, "c"],
    ]);
  });
});
