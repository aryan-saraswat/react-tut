import { Component } from "react";
import WordsHolder from "../words-holder/WordsHolder";

interface TextComponentProps {
  num: number;
}

interface TextComponentState {
  words: string[];
}

class TextComponent extends Component<TextComponentProps, TextComponentState> {
  words: string[] = [];
  constructor(props: TextComponentProps) {
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
      .then((data) => {
        this.setState({ words: data });
        console.log("data: ", data);
      });
  }

  render() {
    return (
      <div>
        <WordsHolder words={this.state.words}></WordsHolder>
      </div>
    );
  }
}

export default TextComponent;
