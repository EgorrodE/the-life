import React from 'react';

const Button = (props) => (
  <button
    type="button"
    onClick={props.callback}
    disabled={props.disabled}>
    {props.text}
  </button>
);

export default Button;
