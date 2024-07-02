import { WordEntry } from "../../types/types";
import "./WordsHolder.css";

interface WordsHolderProps {
  words: WordEntry[];
}

function WordsHolder(props: WordsHolderProps) {
  console.log("from wordsholder: ", props.words);
  function wordStyle(word: WordEntry): string {
    if (word.guessed) {
      return word.guessedCorrectly ? "correct-guess" : "wrong-guess";
    } else {
      return "no-guess";
    }
  }

  return (
    <div className="words">
      <div className="words-holder">
        {props.words.map((word, i) => {
          return (
            <div key={i} className={`word ${wordStyle(word)}`}>
              {word.word}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WordsHolder;
