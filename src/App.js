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
  const [selectedColor, setSelectedColor] = useState({
    name: 'primary',
    hue: getHue(primaryColor),
    saturation: getSaturation(primaryColor),
    brightness: getBrightness(primaryColor),
    hex: primaryColor,
    type: 'normal',
  });

  function handleSelectColor(palette) {
    console.log('color selected', palette);

    let updatedValues = {
      name: palette.name,
      hue: palette.hue,
      saturation: palette.saturation,
      brightness: palette.brightness,
      hex: palette.color,
      type: palette.type,
    };
    setSelectedColor((prevState) => ({
      ...prevState,
      ...updatedValues,
    }));
  }

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
            handleSelectColor={handleSelectColor}
            selected={selectedColor}
          />
          <Palette
            type="muted"
            name="neutral"
            color={primaryColor}
            handleSelectColor={handleSelectColor}
            selected={selectedColor}
          />
          <Palette
            type="normal"
            name="success"
            color={successColor}
            handleSelectColor={handleSelectColor}
            selected={selectedColor}
          />
          <Palette
            type="normal"
            name="danger"
            color={dangerColor}
            handleSelectColor={handleSelectColor}
            selected={selectedColor}
          />

          <Palette
            type="normal"
            name="warning"
            color={warningColor}
            handleSelectColor={handleSelectColor}
            selected={selectedColor}
          />
          <Palette
            type="normal"
            name="info"
            color={infoColor}
            handleSelectColor={handleSelectColor}
            selected={selectedColor}
          />
          <Palette
            type="normal"
            name="secondary"
            color={secondaryColor}
            handleSelectColor={handleSelectColor}
            selected={selectedColor}
          />
          <Palette
            type="normal"
            name="tertiary"
            color={tertiaryColor}
            handleSelectColor={handleSelectColor}
            selected={selectedColor}
          />
        </div>
        <CodePanel color={selectedColor} />
      </div>
    </>
  );
}

export default App;
