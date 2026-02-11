import Field from "./Field";

export default function Board({boardHeight, boardWidth, activePlayer, onExecuteTurn}){
    let lastFieldId = 0; // We'll start our ids with "1".
    let lastRowId = 0; // Same here.
    let boardRows = [];
    
    function createColumns(columnsNumber){
        let columnsCollection = [];
        
        for (let columnIndex = 0; columnIndex < columnsNumber; columnIndex++) {
            columnsCollection.push(<Field key={++lastFieldId} id={lastFieldId} activePlayer={activePlayer} onExecuteTurn={onExecuteTurn}/>);
        }
        
        return columnsCollection;
    }
    
    for (let rowIndex = 0; rowIndex < boardHeight; rowIndex++) {
        boardRows.push(
            <div key={++lastRowId} className="board-row">
                {createColumns(boardWidth)}
            </div>
        );
    }
    
    return (
        <>
            {boardRows}
        </>
    )
}