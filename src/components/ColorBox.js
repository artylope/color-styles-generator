import React, { useState } from 'react';
import '../styles/ColorBox.scss';
import { HSBToRGB, HSBToHex } from '../helpers/colorConvert';
//external
import { HexColorPicker, HexColorInput } from 'react-colorful';

const ColorBox = (props) => {
  const [colorPickerOpen, setColorPickerOpen] = useState(false);

  let colorFill = HSBToRGB(
    parseInt(props.h),
    parseInt(props.s),
    parseInt(props.b)
  );

  function handleColorPicker() {
    console.log('clicked', colorPickerOpen);
    setColorPickerOpen((prevState) => !prevState);
  }

  let displayColorPicker;

  if (colorPickerOpen === true) {
    displayColorPicker = (
      <div className="color-picker-modal">
        <HexColorPicker color="#2B49B5" />;
        <HexColorInput color="#2B49B5" />
      </div>
    );
  }
  return (
    <div className="color-box-group" onClick={handleColorPicker}>
      {displayColorPicker}

      <div className="color-box" style={{ background: props.color }}></div>
      <p>{props.name}</p>
      <p>{props.color}</p>
    </div>
  );
};

export default ColorBox;
