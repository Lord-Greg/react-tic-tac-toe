export default function Field({id, fieldValue, onExecuteTurn}) {
	const onFieldClick = function() {
		if(fieldValue === null) {
			onExecuteTurn(id);
		}
	}

	return <button key={id} className="square" onClick={onFieldClick}>{fieldValue}</button>;
}
