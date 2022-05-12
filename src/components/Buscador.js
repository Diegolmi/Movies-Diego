
import React from 'react';

const Buscador = (props) => {
	return (
		<div className='col col-sm-4'>
			<input
				className='form-control'
				value={props.value}
				onChange={(event) => props.setBusqueda(event.target.value)}
				placeholder='Type to search...'
			></input>
		</div>
	);
};

export default Buscador;