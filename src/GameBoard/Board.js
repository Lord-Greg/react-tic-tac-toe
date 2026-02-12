import Field from "./Field";

export default function Board({boardHeight, boardWidth, fieldsValues, onExecuteTurn}){
    let lastFieldId = -1; // We'll start our ids with "0".
    let lastRowId = -1; // Same here.
    let boardRows = [];
    
    function createColumns(columnsNumber){
        let columnsCollection = [];
        
        for (let columnIndex = 0; columnIndex < columnsNumber; columnIndex++) {
            const fieldId = ++lastFieldId;
            columnsCollection.push(<Field key={fieldId} id={fieldId} fieldValue={fieldsValues[fieldId]} onExecuteTurn={onExecuteTurn}/>);
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