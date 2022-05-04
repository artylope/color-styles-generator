import React from 'react';
import '../styles/Swatch.scss';
import { HSBToRGB, HSBToHex } from '../helpers/colorConvert';

const Swatch = (props) => {
  console.log(props);
  let colorFill = HSBToRGB(
    parseInt(props.h),
    parseInt(props.s),
    parseInt(props.b)
  );

  let stylesClasses = 'swatch';

  if (props.b > 70) {
    stylesClasses += ' text-is-dark';
  }

  if (props.value == 500) {
    stylesClasses += ' swatch-is-500';
  }

  return (
    <div className={stylesClasses} style={{ background: `rgb(${colorFill})` }}>
      <h5>{props.value}</h5>
      <p>h {props.h}</p>
      <p>s {props.s}</p>
      <p>b {props.b}</p>
      <p>{HSBToHex(props.h, props.s, props.b)}</p>
    </div>
  );
};

export default Swatch;
