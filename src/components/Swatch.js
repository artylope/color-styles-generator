import React from 'react';
import '../styles/Swatch.scss';
import colorcolor from 'colorcolor';

const Swatch = (props) => {
  const HSBToRGB = (h, s, b) => {
    s /= 100;
    b /= 100;
    const k = (n) => (n + h / 60) % 6;
    const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
    return [
      Math.round(255 * f(5)),
      Math.round(255 * f(3)),
      Math.round(255 * f(1)),
    ];
  };

  const HSBToHex = (h, s, b) => {
    let colorFill = HSBToRGB(parseInt(h), parseInt(s), parseInt(b));

    let rgb = `rgb(${colorFill})`;
    let hexCode = colorcolor(`rgb(${colorFill})`, 'hex');

    return hexCode;
  };

  let colorFill = HSBToRGB(
    parseInt(props.h),
    parseInt(props.s),
    parseInt(props.b)
  );

  return (
    <div className="swatch" style={{ background: `rgb(${colorFill})` }}>
      <h5>{props.name}</h5>
      <p>h {props.h}</p>
      <p>s {props.s}</p>
      <p>b {props.b}</p>
      <p>{HSBToHex(props.h, props.s, props.b)}</p>
    </div>
  );
};

export default Swatch;
