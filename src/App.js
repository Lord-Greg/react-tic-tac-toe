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
		function checkRows() {
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
			let winner;

			// Iterate through columns.
			for (let columnIndex = 0; columnIndex < boardWidth; columnIndex++) {
				let potentialWinner = fieldsValues[columnIndex];

				if(potentialWinner !== null){
					// Iterate through every field in single column.
					for (let rowIndex = 0; rowIndex < boardHeight; rowIndex++) {
						if(fieldsValues[firstIndexInColumn + (rowIndex * boardWidth)] !== potentialWinner) {
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
		
		function checkSlopes() {
			// In this app, we won't be sure if the board is actually a square (e.g. 3x3), or a rectangle (e.g. 3x4).
			// Our "slope winner" will be determined by having as match hits in a single slope, as the board allows.
			// E.g. for 3x3 max possible slope is 3, for 4x5 it's 4, and for 5x10 it's 5.

			const winningSlopeSize = Math.min(boardWidth, boardHeight);
			let winner = null;

			function checkIfWinningSlopeIsPossible(rowIndex, columnIndex) {
				return (boardHeight - rowIndex >= winningSlopeSize) || (boardWidth - columnIndex >= winningSlopeSize);
			}

			function checkNextElementInSlope(testedValue, previousRowIndex, previousColumnIndex) {
				const currentRowIndex = previousRowIndex + 1;
				const currentColumnIndex = previousColumnIndex + 1;
				
				return (currentRowIndex >= boardHeight || currentColumnIndex >= boardWidth)
					|| (fieldsValues[currentColumnIndex + (currentRowIndex * boardWidth)] === testedValue
						&& checkNextElementInSlope(testedValue, currentRowIndex, currentColumnIndex));
			}

			// Step 1: Checking left-to-right slopes.
			// In fact, we only need to iterate through a first row, and a first column.
			// The recursion of checkNextElementInSlope() function will handle rest fo the job.
			
			for (let columnIndex = 0; columnIndex < boardWidth; columnIndex++) {
				if(fieldsValues[columnIndex] !== null && checkNextElementInSlope(fieldsValues[columnIndex], 0, columnIndex)) {
					winner = fieldsValues[columnIndex];
					break;
				}
			}

			if(winner === null) {
				for (let rowIndex = 0; rowIndex < boardHeight; rowIndex++) {
					if(fieldsValues[rowIndex * boardWidth] !== null && checkNextElementInSlope(fieldsValues[columnIndex * boardWidth], rowIndex, 0)) {
						winner = fieldsValues[columnIndex * boardWidth];
						break;
					}
				}
			}

			// Step 2: Checking right-to-left slopes.
			// TODO: Implementation.

			return winner;
		}

		return checkRows() ?? checkColumns() ?? checkSlopes();
	}
	
	return <Board boardHeight={boardHeight} boardWidth={boardWidth} fieldsValues={fieldsValues} onExecuteTurn={executeTurn}/>;
}
