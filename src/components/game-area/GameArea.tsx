import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../App";
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
  const [indexToCheck, setIndexToCheck] = useState<number>(0);
  const numberOfWords = props.num;
  const gameContext = useContext(GameContext);

  const fetchAndSetWords = async () => {
    const fetchedWords = await fetchWords(numberOfWords);
    if (fetchedWords) setWords(fetchedWords);
  };

  useEffect(() => {
    fetchAndSetWords();
  }, [numberOfWords]);

  useEffect(() => {
    if (indexToCheck === props.num) {
      fetchAndSetWords();
      setIndexToCheck(0);
    }
  }, [indexToCheck]);

  function updateWords(word: string) {
    const isCorrectGuess =
      word.toLowerCase() === words[indexToCheck].word.toLowerCase();

    const updatedWords: WordEntry[] = words.map<WordEntry>((word, i) => {
      if (i == indexToCheck) {
        return {
          ...word,
          guessed: true,
          guessedCorrectly: isCorrectGuess,
        };
      }
      return word;
    });

    if (isCorrectGuess) {
      setIndexToCheck(indexToCheck + 1);
    }

    setWords(updatedWords);
  }

  async function fetchWords(num: number): Promise<WordEntry[] | undefined> {
    try {
      const axiosReq = axios.post("http://localhost:8080/get-words", {
        numberOfWords: num,
      });
      const data: string[] = await (await axiosReq).data;
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
      <InputBox updateWords={updateWords}></InputBox>
      <Timekeeper></Timekeeper>
    </div>
  );
}

export default GameArea;
