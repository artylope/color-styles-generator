import { useState } from 'react';

//styles
import './App.scss';

//components
import Palette from './components/Palette';
import Swatch from './components/Swatch';
import CodePanel from './components/CodePanel';

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
  const [primaryColor, setPrimaryColor] = useState('#2B49B5');
  const [secondaryColor, setSecondaryColor] = useState('#2e1496');
  const [tertiaryColor, setTertiaryColor] = useState('#18abab');
  const [successColor, setSuccessColor] = useState('#018c50');
  const [dangerColor, setDangerColor] = useState('#c21919');
  const [warningColor, setWarningColor] = useState('#e89c2a');
  const [infoColor, setInfoColor] = useState('#3d89d1');

  //name of the color to display in code panel
  const [selectedColor, setSelectedColor] = useState('primary');

  function handleSelectColor(palette) {
    console.log('color selected');
    console.log(...palette);
    setSelectedColor(palette.name);
  }

  //base hsb
  let hue = getHue(primaryColor);
  let saturation = getSaturation(primaryColor);
  let brightness = getBrightness(primaryColor);

  //get scale
  let brightnessScale = getBrightnessArray(brightness);
  // console.log('brightnessScale', brightnessScale);

  let normalSaturationScale = getNormalSaturationArray(saturation);
  // console.log('normalSaturationScale', normalSaturationScale);

  let neutralSaturationScale = getMutedSaturationArray(saturation);
  // console.log('neutralSaturationScale', neutralSaturationScale);

  let innerCode = brightnessScale.map((brightness, index) => {
    return `
        "${colorLabel[index]}": {
          "value": "${HSBToHex(hue, normalSaturationScale[index], brightness)}",
          "type": "color"
        }`;
  });

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
      <HexColorPicker color={primaryColor} onChange={setPrimaryColor} />;
      <HexColorInput color={primaryColor} onChange={setPrimaryColor} />
      <div className="canvas">
        <div className="palette-panel">
          <Palette
            type="normal"
            name="primary"
            color={primaryColor}
            brightnessScale={brightnessScale}
            handleSelectColor={handleSelectColor}
            selected={selectedColor}
          />
          <Palette
            type="muted"
            name="neutral"
            color={primaryColor}
            brightnessScale={brightnessScale}
            handleSelectColor={handleSelectColor}
            selected={selectedColor}
          />
          <Palette
            type="normal"
            name="success"
            color={successColor}
            brightnessScale={brightnessScale}
            handleSelectColor={handleSelectColor}
            selected={selectedColor}
          />
          <Palette
            type="normal"
            name="danger"
            color={dangerColor}
            brightnessScale={brightnessScale}
            handleSelectColor={handleSelectColor}
            selected={selectedColor}
          />

          <Palette
            type="normal"
            name="warning"
            color={warningColor}
            brightnessScale={brightnessScale}
            handleSelectColor={handleSelectColor}
            selected={selectedColor}
          />
          <Palette
            type="normal"
            name="info"
            color={infoColor}
            brightnessScale={brightnessScale}
            handleSelectColor={handleSelectColor}
            selected={selectedColor}
          />
          <Palette
            type="normal"
            name="secondary"
            color={secondaryColor}
            brightnessScale={brightnessScale}
            handleSelectColor={handleSelectColor}
            selected={selectedColor}
          />
          <Palette
            type="normal"
            name="tertiary"
            color={tertiaryColor}
            brightnessScale={brightnessScale}
            handleSelectColor={handleSelectColor}
            selected={selectedColor}
          />
        </div>
        {/* <div className="palette">{primaryElements}</div>
        <div className="palette">{neutralElements}</div> */}
        <div className="code-panel">
          <CopyBlock
            text={displayCode}
            language="javascript"
            theme={dracula}
            codeBlock
          />
        </div>
        <CodePanel color={selectedColor} innerCode={innerCode} />
      </div>
    </>
  );
}

export default App;
