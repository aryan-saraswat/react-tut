import { createContext } from "react";
import "./App.css";
import GameArea from "./components/game-area/GameArea";

interface Game {
  play: boolean;
}

const GameContext = createContext<Game>({
  play: false,
});

function App() {
  return (
    <GameContext.Provider value={{ play: false }}>
      <div className="App">
        <GameArea num={5}></GameArea>
      </div>
    </GameContext.Provider>
  );
}

export { GameContext };
export default App;
