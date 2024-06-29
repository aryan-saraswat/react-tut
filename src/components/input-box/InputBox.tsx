import { useState } from "react";
import "./InputBox.css";

function InputBox() {
  const [inputValue, setInputValue] = useState<string>("");

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const enteredText = event.target.value;
    setInputValue(enteredText.endsWith(" ") ? "" : enteredText);
  }

  return (
    <form className="form">
      <input type="text" value={inputValue} onChange={handleInput}></input>
    </form>
  );
}

export default InputBox;
