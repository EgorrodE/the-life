import React from 'react';

const Cell = (props) => (
  <div
    className={`cell ${props.cell.alive ? 'alive' : ''} age-${props.cell.age >= 8 ? 8 : props.cell.age}`}
    onClick={props.toggle.bind(null, props.cell.x, props.cell.y)} />
);

export default Cell;
