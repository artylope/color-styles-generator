import React from 'react';
import { HexToHSB, HSBToHex } from '../helpers/colorConvert';
import { getHue, getSaturation, getBrightness } from '../helpers/hsb';
import {
  getBrightnessArray,
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
  let brightnessScale = getBrightnessArray(brightness);
  console.log('brightnessScale', brightnessScale);

  let normalSaturationScale = getNormalSaturationArray(saturation);
  console.log('normalSaturationScale', normalSaturationScale);

  let mutedSaturationScale = getMutedSaturationArray(saturation);
  console.log('mutedSaturationScale', mutedSaturationScale);

  let Swatches = brightnessScale.map((brightness, index) => {
    if (props.type === 'muted') {
      return (
        <Swatch
          key={index}
          name={`${props.name}-${colorLabel[index]}`}
          h={hue}
          s={mutedSaturationScale[index]}
          b={brightness}
        />
      );
    } else {
      return (
        <Swatch
          key={index}
          name={`${props.name}-${colorLabel[index]}`}
          h={hue}
          s={normalSaturationScale[index]}
          b={brightness}
        />
      );
    }
  });

  return <div className="palette">{Swatches}</div>;
};

export default Palette;
