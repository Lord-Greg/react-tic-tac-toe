import Field from "./Field";

export default function Board({boardHeight, boardWidth}){
    function createColumns(columnsNumber){
        let columnsCollection = [];
        
        for (let columnIndex = 0; columnIndex < columnsNumber; columnIndex++) {
            columnsCollection.push(<Field/>);
        }

        return columnsCollection;
    }

    let boardRows = [];
    
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