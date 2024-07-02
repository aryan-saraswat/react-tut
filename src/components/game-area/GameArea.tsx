import { useEffect, useState } from "react";
import { WordEntry } from "../../types/types";
import InputBox from "../input-box/InputBox";
import Timekeeper from "../timekeeper/Timekeeper";
import WordsHolder from "../words-holder/WordsHolder";
import "./GameArea.css";

interface GameAreaProps {
  num: number;
}

function GameArea(props: GameAreaProps) {
  const [words, setWords] = useState<WordEntry[]>([]);
  const numberOfWords = props.num;

  useEffect(() => {
    const fetchAndSetWords = async () => {
      const fetchedWords = await fetchWords(numberOfWords);
      if (fetchedWords) setWords(fetchedWords);
    };
    fetchAndSetWords();
  }, [numberOfWords]);

  async function fetchWords(num: number): Promise<WordEntry[] | undefined> {
    try {
      const response = await fetch("http://localhost:8080/get-words", {
        body: JSON.stringify({
          numberOfWords: numberOfWords,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: string[] = await response.json();
      return data.map((word) => ({
        guessed: false,
        guessedCorrectly: false,
        word: word,
      }));
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }

  return (
    <div className="game-area">
      <WordsHolder words={words}></WordsHolder>
      <InputBox></InputBox>
      <Timekeeper></Timekeeper>
    </div>
  );
}

export default GameArea;
