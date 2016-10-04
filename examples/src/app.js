import React from 'react';
import ReactDOM from 'react-dom';
import ReactDataSheet from '../../src/index';
import '../../src/react-datasheet.css';
let data = [
	[{value: '', readOnly: true} , {value: '01'}, {value: '02'}, {value: '03'}, {value: '04'}, {value:'05'}],
	[{value: '2', readOnly: true} , {value: '11'}, {value: '12'}, {value: '13'}, {value: '14'}, {value:'15'}],
	[{value: '2', readOnly: true} , {value: '21'}, {value: '22'}, {value: '23'}, {value: '24'}, {value:'25'}],
];

ReactDOM.render(<ReactDataSheet 
	data={data}
	valueRenderer={(cell) => cell.value}
	onChange={(cell, i, j, value)=> data[i][j].value = value}
	/>, 
	document.getElementById('root'));

