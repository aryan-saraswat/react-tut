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
  const numberOfWords = props.num;
  const gameContext = useContext(GameContext);

  useEffect(() => {
    console.log(gameContext);
    const fetchAndSetWords = async () => {
      const fetchedWords = await fetchWords(numberOfWords);
      if (fetchedWords) setWords(fetchedWords);
    };
    fetchAndSetWords();
  }, [numberOfWords]);

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
      <InputBox></InputBox>
      <Timekeeper></Timekeeper>
    </div>
  );
}

export default GameArea;
