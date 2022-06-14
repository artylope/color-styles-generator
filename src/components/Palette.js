import React from 'react';
import { HexToHSB, HSBToHex } from '../helpers/colorConvert';
import { getHue, getSaturation, getBrightness } from '../helpers/hsb';
import {
  getMutedBrightnessArray,
  getNormalBrightnessArray,
  getMutedSaturationArray,
  getNormalSaturationArray,
} from '../helpers/generateColorScale';

//constants
import { colorLabel } from '../constants/global';

import Swatch from './Swatch';
import '../styles/Palette.scss';

const Palette = (props) => {
  //generate swatch for each color

  //if muted palette
  //if colored palette

  //base hsb
  let hue = getHue(props.color);
  let saturation = getSaturation(props.color);
  let brightness = getBrightness(props.color);

  //get scale
  let normalBrightnessScale = getNormalBrightnessArray(brightness);
  // console.log('brightnessScale', brightnessScale);

  let mutedBrightnessScale = getMutedBrightnessArray(brightness);
  // console.log('brightnessScale', brightnessScale);

  let normalSaturationScale = getNormalSaturationArray(saturation);
  // console.log('normalSaturationScale', normalSaturationScale);

  let mutedSaturationScale = getMutedSaturationArray(saturation);
  // console.log('mutedSaturationScale', mutedSaturationScale);

  let Swatches = normalBrightnessScale.map((brightness, index) => {
    if (props.type === 'muted') {
      return (
        <Swatch
          key={index}
          value={colorLabel[index]}
          name={`${props.name}-${colorLabel[index]}`}
          h={hue}
          s={mutedSaturationScale[index]}
          b={mutedBrightnessScale[index]}
        />
      );
    } else if (props.type === 'normal') {
      return (
        <Swatch
          key={index}
          value={colorLabel[index]}
          name={`${props.name}-${colorLabel[index]}`}
          h={hue}
          s={normalSaturationScale[index]}
          b={brightness}
        />
      );
    } else if (props.type === 'greyscale') {
      return (
        <Swatch
          key={index}
          value={colorLabel[index]}
          name={`${props.name}-${colorLabel[index]}`}
          h="230"
          s={mutedSaturationScale[index]}
          b={brightness}
        />
      );
    }
  });

  let selectedPalette = {
    name: `${props.name}`,
    hue: hue,
    saturation: saturation,
    brightness: brightness,
    color: props.color,
    type: props.type,
  };

  return (
    <div
      className="palette-group"
      onClick={() => {
        props.handleSelectColor(selectedPalette);
      }}
    >
      <div className="palette-label ">{props.name}</div>
      <div className="palette-swatches">{Swatches}</div>
    </div>
  );
};

export default Palette;
