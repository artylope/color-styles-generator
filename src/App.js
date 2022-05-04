import { useState } from 'react';

//styles
import './App.scss';

//components
import Palette from './components/Palette';
import Swatch from './components/Swatch';

//external
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { CopyBlock, dracula } from 'react-code-blocks';

//constants
import { colorLabel } from './constants/global';

//helpers
import { HexToHSB, HSBToHex } from './helpers/colorConvert';
import { getHue, getSaturation, getBrightness } from './helpers/hsb';
import {
  getBrightnessArray,
  getMutedSaturationArray,
  getNormalSaturationArray,
} from './helpers/generateColorScale';

function App() {
  //variables
  const [chosenColor, setChosenColor] = useState('#2B49B5');

  //base hsb
  let hue = getHue(chosenColor);
  let saturation = getSaturation(chosenColor);
  let brightness = getBrightness(chosenColor);

  //get scale
  let brightnessScale = getBrightnessArray(brightness);
  // console.log('brightnessScale', brightnessScale);

  let normalSaturationScale = getNormalSaturationArray(saturation);
  // console.log('normalSaturationScale', normalSaturationScale);

  let neutralSaturationScale = getMutedSaturationArray(saturation);
  // console.log('neutralSaturationScale', neutralSaturationScale);

  let primaryInnerCode = brightnessScale.map((brightness, index) => {
    return `
        "${colorLabel[index]}": {
          "value": "${HSBToHex(hue, normalSaturationScale[index], brightness)}",
          "type": "color"
        }`;
  });

  let neutralInnerCode = brightnessScale.map((brightness, index) => {
    return `
        "${colorLabel[index]}": {
          "value": "${HSBToHex(
            hue,
            neutralSaturationScale[index],
            brightness
          )}",
          "type": "color"
        }`;
  });

  let displayCode = `
      "Primary": {${primaryInnerCode}},
      "Neutral": {${neutralInnerCode}},`;
  return (
    <>
      <HexColorPicker color={chosenColor} onChange={setChosenColor} />;
      <HexColorInput color={chosenColor} onChange={setChosenColor} />
      <div className="group">
        {/* <div className="palette">{primaryElements}</div>
        <div className="palette">{neutralElements}</div> */}
        <Palette
          type="normal"
          name="primary"
          color={chosenColor}
          brightnessScale={brightnessScale}
        />
        <Palette
          type="muted"
          name="neutral"
          color={chosenColor}
          brightnessScale={brightnessScale}
        />
        <Palette
          type="normal"
          name="secondary"
          color="#2E1496"
          brightnessScale={brightnessScale}
        />
        <Palette
          type="normal"
          name="tertiary"
          color="#18ABAB"
          brightnessScale={brightnessScale}
        />
        <div style={{ width: '100%' }}>
          <CopyBlock
            text={displayCode}
            language="javascript"
            theme={dracula}
            codeBlock
          />
        </div>
      </div>
    </>
  );
}

export default App;
