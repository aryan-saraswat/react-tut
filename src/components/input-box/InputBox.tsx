import { useState } from "react";
import "./InputBox.css";

interface InputBoxProps {
  updateWords(word: string): void;
}

function InputBox(props: InputBoxProps) {
  const [inputValue, setInputValue] = useState<string>("");

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const enteredText = event.target.value;

    if (enteredText.endsWith(" ")) {
      props.updateWords(enteredText.trim());
      setInputValue("");
    } else {
      setInputValue(enteredText);
    }
  }

  return (
    <form className="form">
      <input type="text" value={inputValue} onChange={handleInput}></input>
    </form>
  );
}

export default InputBox;
