import { useState } from "react";
import Board from "./GameBoard/Board";

const boardWidth = 3;
const boardHeight = 3;
const players = ["X", "O"];

export default function Game() {
  const [gameTurn, setGameTurn] = useState(1);

  function getActivePlayer() {
    return players[gameTurn % players.length];
  }
  
  function executeTurn() {
    setGameTurn(gameTurn + 1);
  }
  
  return <Board boardHeight={boardHeight} boardWidth={boardWidth} activePlayer={getActivePlayer()} onExecuteTurn={executeTurn}/>;
}
