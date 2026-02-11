import { useState } from "react";

export default function Field({id, activePlayer, onExecuteTurn}) {
  const [fieldValue, setFieldValue] = useState(null);

  const onFieldClick = function() {
    if(fieldValue === null) {
      setFieldValue(activePlayer);
      onExecuteTurn();
    }
  }

  return <button key={id} className="square" onClick={onFieldClick}>{fieldValue}</button>;
}
