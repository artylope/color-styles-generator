import React from 'react';
import '../styles/ColorBox.scss';
import { HSBToRGB, HSBToHex } from '../helpers/colorConvert';

const ColorBox = (props) => {
  let colorFill = HSBToRGB(
    parseInt(props.h),
    parseInt(props.s),
    parseInt(props.b)
  );
  return (
    <div className="color-box-group">
      <div className="color-box" style={{ background: props.color }}></div>
      <p>{props.name}</p>
      <p>{props.color}</p>
    </div>
  );
};

export default ColorBox;
