import { WordEntry } from "../../types/types";
import "./WordsHolder.css";

interface WordsHolderProps {
  words: WordEntry[];
}

function WordsHolder(props: WordsHolderProps) {
  return (
    <div className="words">
      <div className="words-holder">
        {props.words.map((word, i) => {
          return (
            <div key={i} className="word">
              {word.word}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WordsHolder;
