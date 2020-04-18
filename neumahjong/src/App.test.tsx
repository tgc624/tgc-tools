import { reflectOka, reflectUma } from "./App";
// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
describe("reflectOka", () => {
  // http://www2.odn.ne.jp/~cbm15900/html/n11.html
  test("", () => {
    const actual = reflectOka(
      [
        { score: 45000, rank: 1 },
        { score: 32000, rank: 2 },
        { score: 18000, rank: 3 },
        { score: 5000, rank: 4 },
      ],
      [25000, 30000]
    );
    expect(actual).toEqual([
      { point: 35, rank: 1 },
      { point: 2, rank: 2 },
      { point: -12, rank: 3 },
      { point: -25, rank: 4 },
    ]);
  });
  test("", () => {
    const actual = reflectOka(
      [
        { score: 42000, rank: 1 },
        { score: 41000, rank: 2 },
        { score: 8000, rank: 3 },
        { score: 9000, rank: 4 },
      ],
      [25000, 30000]
    );
    expect(actual).toEqual([
      { point: 32, rank: 1 },
      { point: 11, rank: 2 },
      { point: -22, rank: 3 },
      { point: -21, rank: 4 },
    ]);
  });
  test("", () => {
    const actual = reflectOka(
      [
        { score: 25000, rank: 1 },
        { score: 25000, rank: 2 },
        { score: 25000, rank: 3 },
        { score: 25000, rank: 4 },
      ],
      [25000, 30000]
    );
    expect(actual).toEqual([
      { point: 15, rank: 1 },
      { point: -5, rank: 2 },
      { point: -5, rank: 3 },
      { point: -5, rank: 4 },
    ]);
  });
  test("", () => {
    const actual = reflectOka(
      [
        { score: 20000, rank: 1 },
        { score: 20000, rank: 2 },
        { score: 20000, rank: 3 },
        { score: 20000, rank: 4 },
      ],
      [25000, 30000]
    );
    expect(actual).toEqual([
      { point: 30, rank: 1 },
      { point: -10, rank: 2 },
      { point: -10, rank: 3 },
      { point: -10, rank: 4 },
    ]);
  });
  test("", () => {
    const actual = reflectOka(
      [
        { score: 30000, rank: 1 },
        { score: 30000, rank: 1 },
        { score: 20000, rank: 3 },
        { score: 20000, rank: 4 },
      ],
      [25000, 30000]
    );
    expect(actual).toEqual([
      { point: 10, rank: 1 },
      { point: 10, rank: 1 },
      { point: -10, rank: 3 },
      { point: -10, rank: 4 },
    ]);
  });
  test("", () => {
    const actual = reflectOka(
      [
        { score: 30000, rank: 1 },
        { score: 25000, rank: 2 },
        { score: 25000, rank: 2 },
        { score: 20000, rank: 4 },
      ],
      [25000, 30000]
    );
    expect(actual).toEqual([
      { point: 20, rank: 1 },
      { point: -5, rank: 2 },
      { point: -5, rank: 2 },
      { point: -10, rank: 4 },
    ]);
  });
});
describe("reflectUma", () => {
  test("", () => {
    const actual = reflectUma(
      [
        { point: 0, rank: 1 },
        { point: 0, rank: 2 },
        { point: 0, rank: 3 },
        { point: 0, rank: 4 },
      ],
      [10, 5, -5, -10]
    );
    expect(actual).toEqual([
      { point: 10, rank: 1 },
      { point: 5, rank: 2 },
      { point: -5, rank: 3 },
      { point: -10, rank: 4 },
    ]);
  });
  xtest("同点が複数いる場合は、分ける。", () => {
    const actual = reflectUma(
      [
        { point: 0, rank: 1 },
        { point: 0, rank: 2 },
        { point: 0, rank: 2 },
        { point: 0, rank: 4 },
      ],
      [10, 5, -5, -10]
    );
    expect(actual).toEqual([
      { point: 10, rank: 1 },
      { point: 0, rank: 2 },
      { point: 0, rank: 3 },
      { point: -10, rank: 4 },
    ]);
  });
});
