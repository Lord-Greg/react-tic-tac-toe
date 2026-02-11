import Field from "./Field";

export default function Board({boardHeight, boardWidth}){
    let lastFieldId = 0; // We'll start our ids with "1".
    let boardRows = [];
    
    function createColumns(columnsNumber){
        let columnsCollection = [];
        
        for (let columnIndex = 0; columnIndex < columnsNumber; columnIndex++) {
            columnsCollection.push(<Field id={++lastFieldId}/>);
        }

        return columnsCollection;
    }
    
    for (let rowIndex = 0; rowIndex < boardHeight; rowIndex++) {
        boardRows.push(
            <div className="board-row">
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