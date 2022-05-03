import React from 'react';
import '../styles/Swatch.scss';
import { HSBToRGB, HSBToHex } from '../helpers/colorConvert';

const Swatch = (props) => {
  let colorFill = HSBToRGB(
    parseInt(props.h),
    parseInt(props.s),
    parseInt(props.b)
  );

  let textStyle = {
    color: 'white',
  };

  if (props.b > 70) {
    textStyle = {
      color: 'black',
    };
  }

  return (
    <div className="swatch" style={{ background: `rgb(${colorFill})` }}>
      <h5 style={textStyle}>{props.name}</h5>
      <p style={textStyle}>h {props.h}</p>
      <p style={textStyle}>s {props.s}</p>
      <p style={textStyle}>b {props.b}</p>
      <p style={textStyle}>{HSBToHex(props.h, props.s, props.b)}</p>
    </div>
  );
};

export default Swatch;
