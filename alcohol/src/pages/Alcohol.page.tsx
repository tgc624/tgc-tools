import React, { useState } from "react";

type IntakedAlcohol = {
  volume: number; // アルコール度数(%)
  amount: number; // 飲んだ量(ml)
};

const HIJU = 0.8;

const sum = (accumulator: number, currentValue: number) =>
  accumulator + currentValue;

const formatMinute = (minute: number): string => {
  const _hour = Math.floor(minute / 60);
  const _minute = minute % 60;
  return _hour === 0
    ? `${round1(_minute)}分`
    : `${round1(_hour)}時間${round1(_minute)}分`;
};

const calcAlcohol = (intakedAlcohols: IntakedAlcohol[]): number =>
  intakedAlcohols
    .map(alc => alc.amount * (alc.volume / 100) * HIJU)
    .reduce(sum, 0);

const calcAlcoholDecompositionMinute = (
  weight: number,
  intakedAlcohols: IntakedAlcohol[]
): number => {
  const alcohols = calcAlcohol(intakedAlcohols);
  return (alcohols / weight) * 10 * 60;
};

const round = (digit: number) => (num: number) => {
  if (digit === 0) {
    return 0;
  }
  return Math.round(num * (1 / digit)) / (1 / digit);
};
const round01 = round(0.1);
const round1 = round(1);

const getIntakedAlcoholForms = (
  intakedAlcohols: IntakedAlcohol[],
  setIntakedAlcohols: any
) => {
  const onChange = (param: string, alc: any, index: number) => (event: any) => {
    event.persist();
    setIntakedAlcohols([
      ...intakedAlcohols.slice(0, index),
      { ...alc, [param]: event.target.value },
      ...intakedAlcohols.slice(index + 1)
    ]);
  };
  return intakedAlcohols.map((alc, index) => (
    <form key={index}>
      <label>
        度数
        <input
          type="number"
          name={`volume${index}`}
          min="0"
          max="100"
          value={alc.volume}
          onChange={onChange("volume", alc, index)}
        />
        %
      </label>
      <label>
        , 量
        <input
          type="number"
          name={`amount${index}`}
          min="1"
          max="10000"
          value={alc.amount}
          onChange={onChange("amount", alc, index)}
        />
        ml
      </label>
    </form>
  ));
};
const Alcohol: React.FC = () => {
  const [intakedAlcohols, setIntakedAlcohols] = React.useState([
    { volume: 0, amount: 0 }
  ] as IntakedAlcohol[]);
  const [weight, setWeight] = useState(70);

  const intakedAlcoholForms = getIntakedAlcoholForms(
    intakedAlcohols,
    setIntakedAlcohols
  );
  const handleButton = () => {
    setIntakedAlcohols([...intakedAlcohols, { volume: 0, amount: 0 }]);
  };
  const onChange = (event: any) => {
    event.persist();
    setWeight(event.target.value);
  };
  return (
    <article>
      <header>
        <h1>アルコールいつ抜ける？</h1>
        <p>
          体重と、摂取したアルコール量から、アルコールが分解されるまでの時間算出します。
        </p>
      </header>
      <section>
        <div>総摂取アルコール量: {round01(calcAlcohol(intakedAlcohols))}g</div>
        <div>
          分解時間:
          {formatMinute(
            calcAlcoholDecompositionMinute(weight, intakedAlcohols)
          )}
        </div>
      </section>

      <fieldset>
        <legend>あなたの情報</legend>
        <label>
          体重:
          <input
            type="number"
            name="weight"
            min="10"
            max="100"
            value={weight}
            onChange={onChange}
          />
          kg
        </label>
      </fieldset>
      <fieldset>
        <legend>お酒の情報</legend>
        {intakedAlcoholForms}
        <button onClick={handleButton}>追加</button>
      </fieldset>
    </article>
  );
};

export default Alcohol;
