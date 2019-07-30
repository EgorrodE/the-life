import React from 'react';
import styled from "styled-components";

const color = (alive, age) => {
  if (!alive) { return '#fff'; }
  switch (age) {
    case 2:
      return '#1B76C4';
    case 3:
      return '#366EA3';
    case 4:
      return '#516682';
    case 5:
      return '#6D5E62';
    case 6:
      return '#885641';
    case 7:
      return '#A34E20';
    case 8:
      return '#BF4600';
    default:
      return '#007FE5';
  }
};

const UnstyledCell = (props) => (
  <div className={props.className} onClick={props.toggle.bind(null, props.cell.x, props.cell.y)} />
);

const Cell = styled(UnstyledCell)`
  display: inline-block;
  margin: 2px;
  width: 10px;
  height: 10px;
  border: 1px solid #666;
  border-radius: 10px;
  background-color: ${props => color(props.cell.alive, props.cell.age)};
  cursor: pointer;
`;

export default Cell;
