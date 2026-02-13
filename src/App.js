import { useState } from "react";
import Board from "./GameBoard/Board";

const boardWidth = 3;
const boardHeight = 3;
const players = ["X", "O"];
let gameMessage;
let gameIsOver = false;

export default function Game() {
	const [fieldsValues, setFieldsValues] = useState(Array(boardWidth * boardHeight).fill(null));
	const [gameTurn, setGameTurn] = useState(1);

	function getActivePlayer() {
		return players[gameTurn % players.length];
	}
	
	function executeTurn(clickedField) {
		if(gameIsOver){
			return;
		}
		
		let nextFieldsValues = fieldsValues.slice();
		nextFieldsValues[clickedField] = getActivePlayer();
		const winner = checkWinner(nextFieldsValues);
		
		if(winner !== null) {
			gameMessage = "The winner is " + winner + ". Congratulations!";
			gameIsOver = true;
		}
		else {
			setGameTurn(gameTurn + 1);
		}

		setFieldsValues(nextFieldsValues);
	}

	function checkWinner(fieldsValues) {
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
						if(fieldsValues[columnIndex + (rowIndex * boardWidth)] !== potentialWinner) {
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

			function checkNextElementInSlopeLeftToRight(testedValue, previousRowIndex, previousColumnIndex) {
				const currentRowIndex = previousRowIndex + 1;
				const currentColumnIndex = previousColumnIndex + 1;
				
				return (currentRowIndex >= boardHeight || currentColumnIndex >= boardWidth)
					|| (fieldsValues[currentColumnIndex + (currentRowIndex * boardWidth)] === testedValue
						&& checkNextElementInSlopeLeftToRight(testedValue, currentRowIndex, currentColumnIndex));
			}

			function checkNextElementInSlopeRightToLeft(testedValue, previousRowIndex, previousColumnIndex) {
				const currentRowIndex = previousRowIndex + 1;
				const currentColumnIndex = previousColumnIndex - 1;
				
				return (currentRowIndex >= boardHeight || currentColumnIndex < 0)
					|| (fieldsValues[currentColumnIndex + (currentRowIndex * boardWidth)] === testedValue
						&& checkNextElementInSlopeRightToLeft(testedValue, currentRowIndex, currentColumnIndex));
			}

			// Step 1: Checking left-to-right slopes.
			// In fact, we only need to iterate through first row, and first column.
			// The recursion of inner function will handle rest of the job.
			for (let columnIndex = 0; columnIndex <= boardWidth - winningSlopeSize; columnIndex++) {
				const fieldIndex = columnIndex;
				if(fieldsValues[fieldIndex] !== null && checkNextElementInSlopeLeftToRight(fieldsValues[fieldIndex], 0, columnIndex)) {
					winner = fieldsValues[fieldIndex];
					break;
				}
			}

			if(winner === null) {
				for (let rowIndex = 0; rowIndex <= boardHeight - winningSlopeSize; rowIndex++) {
					const fieldIndex = rowIndex * boardWidth;
					if(fieldsValues[fieldIndex] !== null && checkNextElementInSlopeLeftToRight(fieldsValues[fieldIndex], rowIndex, 0)) {
						winner = fieldsValues[fieldIndex];
						break;
					}
				}
			}

			// Step 2: Checking right-to-left slopes.
			// Similar as in previous step, we only check first row (but in reverse direction), and last column.
			if(winner === null) {
				for (let columnIndex = boardWidth - 1; columnIndex >= winningSlopeSize - 1; columnIndex--) {
					const fieldIndex = columnIndex;
					if(fieldsValues[fieldIndex] !== null && checkNextElementInSlopeRightToLeft(fieldsValues[fieldIndex], 0, columnIndex)) {
						winner = fieldsValues[fieldIndex];
						break;
					}
				}
			}

			if(winner === null) {
				for (let rowIndex = 0; rowIndex <= boardHeight - winningSlopeSize; rowIndex++) {
					const fieldIndex = (boardWidth - 1) + (boardWidth * rowIndex);
					if(fieldsValues[fieldIndex] !== null && checkNextElementInSlopeRightToLeft(fieldsValues[fieldIndex], rowIndex, boardWidth - 1)) {
						winner = fieldsValues[fieldIndex];
						break;
					}
				}
			}

			return winner;
		}

		return checkRows() ?? checkColumns() ?? checkSlopes();
	}
	
	return (
		<>
			<label>{gameMessage}</label>
			<Board boardHeight={boardHeight} boardWidth={boardWidth} fieldsValues={fieldsValues} onExecuteTurn={executeTurn}/>
		</>
	)
}
