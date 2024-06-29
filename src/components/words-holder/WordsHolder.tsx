import { useEffect } from "react";
import "./WordsHolder.css";

interface WordsHolderProps {
  words: string[];
}

function WordsHolder(props: WordsHolderProps) {
  useEffect(() => {
    console.log("in useeffect");
  });

  return (
    <div className="words">
      <div className="words-holder">
        {props.words.map((word, i) => {
          return (
            <div key={i} className="word">
              {word}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WordsHolder;
