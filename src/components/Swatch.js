import React from 'react';
import '../styles/Swatch.scss';

const Swatch = (props) => {
  const HSBToRGB = (h, s, b) => {
    s /= 100;
    b /= 100;
    const k = (n) => (n + h / 60) % 6;
    const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
    return [255 * f(5), 255 * f(3), 255 * f(1)];
  };

  console.log('props', props);

  let colorFill = HSBToRGB(
    parseInt(props.h),
    parseInt(props.s),
    parseInt(props.b)
  );

  console.log(colorFill);

  return (
    <div className="swatch" style={{ background: `rgb(${colorFill})` }}>
      <h5>{props.name}</h5>
      <p>{props.h}</p>
      <p>{props.s}</p>
      <p>{props.b}</p>
    </div>
  );
};

export default Swatch;
