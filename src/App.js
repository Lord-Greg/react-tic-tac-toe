import Board from "./GameBoard/Board";

const boardWidth = 3;
const boardHeight = 3;

export default function GameBoard() {
  return <Board boardHeight={boardHeight} boardWidth={boardWidth}/>;
}
