import { Component } from "react";
import { WordEntry } from "../../types/types";
import InputBox from "../input-box/InputBox";
import WordsHolder from "../words-holder/WordsHolder";
import "./GameArea.css";

interface GameAreaProps {
  num: number;
}

interface GameAreaState {
  words: WordEntry[];
}

class GameArea extends Component<GameAreaProps, GameAreaState> {
  words: string[] = [];
  constructor(props: GameAreaProps) {
    super(props);
    this.state = {
      words: [],
    };
    console.log("from constructor");
  }

  componentDidMount(): void {
    fetch("http://localhost:8080/get-words", {
      body: JSON.stringify({
        numberOfWords: 5,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data: string[]) => {
        let wordEntries: WordEntry[] = data.map((word) => {
          return {
            word: word,
            guessed: false,
            guessedCorrectly: false,
          };
        });
        this.setState({ words: wordEntries });
      });
  }

  render() {
    return (
      <div className="game-area">
        <WordsHolder words={this.state.words}></WordsHolder>
        <InputBox></InputBox>
      </div>
    );
  }
}

export default GameArea;
