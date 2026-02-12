import { useState } from "react";
import Board from "./GameBoard/Board";

const boardWidth = 3;
const boardHeight = 3;
const players = ["X", "O"];

export default function Game() {
	const [fieldsValues, setFieldsValues] = useState(Array(boardWidth * boardHeight).fill(null));
	const [gameTurn, setGameTurn] = useState(1);

	function getActivePlayer() {
		return players[gameTurn % players.length];
	}
	
	function executeTurn(clickedField) {
		fieldsValues[clickedField] = getActivePlayer();
		setGameTurn(gameTurn + 1);
	}

	function checkWinner() {
		function checkRows(){
			let winner;

			// Iterate through rows.
			for (let rowIndex = 0; rowIndex < boardHeight; rowIndex++) {
				const firstIndexInRow = rowIndex * boardWidth;
				let potentialWinner = fieldsValues[firstIndexInRow];

				if(potentialWinner !== null){
					// Iterate through every field in single row.
					for (let columnIndex = 0; columnIndex < boardWidth; columnIndex++) {
						if(fieldsValues[firstIndexInRow + columnIndex] !== potentialWinner){
							// No winner in this row.
							potentialWinner = null;
							break;
						}
					}
				}

				if(potentialWinner !== null){
					// We've got a winner!
					winner = potentialWinner;
					break;
				}
			}

			return winner;
		}

		function checkColumns() {
			// TODO: Implement logic.
		}
		
		function checkSlopes() {
			// TODO: Implement logic.
		}

		return checkRows() ?? checkColumns() ?? checkSlopes();
	}
	
	return <Board boardHeight={boardHeight} boardWidth={boardWidth} fieldsValues={fieldsValues} onExecuteTurn={executeTurn}/>;
}
