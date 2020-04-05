import React, { useState, useEffect, useMemo } from "react";
import "antd/dist/antd.css";
import { Card, Tag, Input, Row, Col, Affix, Button } from "antd";
import axios from "axios";

// @ts-ignore
const range = (size: number) => [...Array(size).keys()];

type Word = {
  meanings: string;
  translation: string;
  definition: string;
  pronunciation: string;
  POS: string;
};

const speak = (text: string) => {
  const synthes = new SpeechSynthesisUtterance(text);
  synthes.lang = "en-US";
  speechSynthesis.speak(synthes);
};

const WordCard = ({ word }: { word: Word }) => {
  const [numberOfTimesEntered, setNumberOfTimesEntered] = useState(0);
  const [value, setValue] = useState("");
  const onClickWordCard = (word: Word) => {
    // TODO 単語の発音する
    // TODO フォームにフォーカスする
  };
  const onChangeInputtedValue = (inputtedValue: string) => {
    if (inputtedValue.toLowerCase() !== word.meanings.toLowerCase()) {
      return setValue(inputtedValue);
    }
    speak(word.meanings);
    setNumberOfTimesEntered((numberOfTimesEntered) => numberOfTimesEntered + 1);
    return setValue("");
  };
  return (
    <Card
      hoverable
      size="small"
      title={`${word.meanings}, ${word.POS}, ${word.translation}`}
      onClick={() => onClickWordCard(word)}
      style={{ margin: 8 }}
    >
      {range(numberOfTimesEntered).map((i) => (
        <Tag key={i} color="success">
          {word.meanings}
        </Tag>
      ))}
      <Input
        allowClear
        value={value}
        onChange={(event) => {
          onChangeInputtedValue(event.target.value);
        }}
        style={{ marginTop: 12 }}
      />
    </Card>
  );
};

const getNGSL = async (): Promise<Word[]> => {
  const words = (await axios.get("./NGSL.json")).data;
  return words;
};

const shuffle = ([...array]) => {
  // see: https://www.nxworld.net/tips/js-array-shuffle.html
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const App = () => {
  const [words, setWords] = useState([] as Word[]);
  const [targetWords, setTargetWords] = useState([] as Word[]);

  useEffect(() => {
    getNGSL().then((_words) => setWords(_words));
  }, []);
  useMemo(() => setTargetWords(words.slice(0, 100)), [words]);

  const wordCards = targetWords.map((word) => (
    <WordCard key={word.meanings} word={word}></WordCard>
  ));

  return (
    <div>
      <Affix offsetTop={16}>
        <Button
          type="primary"
          onClick={() => setWords((words) => shuffle(words))}
        >
          Shuffle!
        </Button>
      </Affix>

      <Row>
        <Col span={24}>{wordCards}</Col>
      </Row>
    </div>
  );
};

export default App;
