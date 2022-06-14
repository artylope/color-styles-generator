import React from 'react';
import { HexToHSB, HSBToHex } from '../helpers/colorConvert';
import { getHue, getSaturation, getBrightness } from '../helpers/hsb';
import {
  getNormalBrightnessArray,
  getMutedSaturationArray,
  getNormalSaturationArray,
} from '../helpers/generateColorScale';
import { CopyBlock, dracula } from 'react-code-blocks';
//constants
import { colorLabel } from '../constants/global';

const CodePanel = (props) => {
  let color = props.color;
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  let colorName = capitalizeFirstLetter(color.name);

  console.log('code panel', props.color);

  let hue = getHue(color.hex);
  let brightness = getBrightness(color.hex);
  let saturation = getSaturation(color.hex);
  let brightnessScale = getNormalBrightnessArray(brightness);

  //get the selected color

  //need to generate hex code for each value in the scale
  // if muted color , differnt saturation scale from normal colors

  let saturationScale = getNormalSaturationArray(saturation);
  if (color.type === 'muted') {
    saturationScale = getMutedSaturationArray(saturation);
  }

  let innerCode = brightnessScale.map((brightness, index) => {
    return `
        "${colorLabel[index]}": {
          "value": "${HSBToHex(hue, saturationScale[index], brightness)}",
          "type": "color"
        }`;
  });

  let displayCode = `
      "${colorName}": {${innerCode}},`;

  return (
    <div className="code-panel">
      <CopyBlock
        text={displayCode}
        language="javascript"
        theme={dracula}
        codeBlock
      />
    </div>
  );
};

export default CodePanel;
