import logo from './logo.svg';
import './App.scss';
import Palette from './components/Palette';
import Swatch from './components/Swatch';
import data from './data/data';
import colorcolor from 'colorcolor';
import { useState } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { CopyBlock, dracula } from 'react-code-blocks';
import { HexToHSB, HSBToHex } from './helpers/colorConvert';
import { getHue, getSaturation, getBrightness } from './helpers/hsb';

function App() {
  const [chosenColor, setChosenColor] = useState('#2B49B5');
  const [noOfStops, setNoOfStops] = useState(11);
  const [stopsMid, setStopsMid] = useState(7);
  const stopsLeft = stopsMid - 1;
  const stopsRight = noOfStops - stopsMid;
  const colorRange = [
    '025',
    '050',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
  ];

  // console.log('h', getHue(chosenColor));
  // console.log('s', getSaturation(chosenColor));
  // console.log('b', getBrightness(chosenColor));

  //derive brightness array based on the inputColor's brightness
  let brightnessArray = function (bValue) {
    let bMax = 98;
    let bOne = 95;
    let bMin = 15;
    let arrayLeft = [bMax, bOne];
    let arrayRight = [];

    console.log('bValue', bValue);
    console.log('b arrayL first', arrayLeft);

    for (let i = 1; i < stopsLeft - 1; i++) {
      let averageLeft = (bOne - bValue) / (stopsLeft - 1);
      arrayLeft.push(Math.round(bOne - i * averageLeft));
    }

    console.log('b arrayL', arrayLeft);

    for (let i = 1; i < stopsRight + 1; i++) {
      let averageRight = (bValue - bMin) / stopsRight;
      arrayRight.push(Math.round(bValue - i * averageRight));
    }

    let array = [...arrayLeft, bValue, ...arrayRight];
    return array;
  };

  //derive saturation array based on the inputColor's saturation for normal colors
  let normalSaturationArray = function (sValue) {
    let sMax = sValue;
    let sMin = 5;
    let arrayLeft = [];
    let arrayRight = [];

    for (let i = 1; i < stopsRight + 1; i++) {
      let averageRight = (sMax - sValue) / stopsRight;
      arrayRight.push(sValue + i * averageRight);
    }

    for (let i = 1; i < stopsLeft + 1; i++) {
      let averageLeft = (sValue - sMin) / stopsLeft;

      arrayLeft.push(Math.round(sValue - i * averageLeft));
    }

    arrayLeft = arrayLeft.reverse();

    let array = [...arrayLeft, sValue, ...arrayRight];
    return array;
  };

  //derive saturation array based on the inputColor's saturation for neutral colors
  //this means saturation is between 0-25. low saturation

  let neutralSaturationArray = function (sValue) {
    let sMax = 25;
    let sMid = 15;
    let sMin = 0;
    let arrayLeft = [];
    let arrayRight = [];

    for (let i = 1; i < stopsRight + 1; i++) {
      let averageRight = (sMid - sMin) / stopsRight;
      arrayRight.push(Math.round(sMid + i * averageRight));
    }

    for (let i = 1; i < stopsLeft + 1; i++) {
      let averageLeft = (sMax - sMid) / stopsLeft;
      arrayLeft.push(Math.round(i * averageLeft));
    }

    let array = [...arrayLeft, sMid, ...arrayRight];
    return array;
  };

  let brightnessRange = brightnessArray(getBrightness(chosenColor));
  console.log('brightnessRange', brightnessRange);
  let hue = getHue(chosenColor);
  let normalSaturationRange = normalSaturationArray(getSaturation(chosenColor));
  console.log('normalSaturationRange', normalSaturationRange);

  let neutralSaturationRange = neutralSaturationArray(
    getSaturation(chosenColor)
  );
  console.log('neutralSaturationRange', neutralSaturationRange);

  let primaryElements = brightnessRange.map((brightness, index) => {
    return (
      <Swatch
        key={index}
        name={`primary-${colorRange[index]}`}
        h={hue}
        s={normalSaturationRange[index]}
        b={brightness}
      />
    );
  });

  let neutralElements = brightnessRange.map((brightness, index) => {
    return (
      <Swatch
        key={index}
        name={`neutral-${colorRange[index]}`}
        h={hue}
        s={neutralSaturationRange[index]}
        b={brightness}
      />
    );
  });

  let primaryInnerCode = brightnessRange.map((brightness, index) => {
    return `
        "${colorRange[index]}": {
          "value": "${HSBToHex(hue, normalSaturationRange[index], brightness)}",
          "type": "color"
        }`;
  });

  let neutralInnerCode = brightnessRange.map((brightness, index) => {
    return `
        "${colorRange[index]}": {
          "value": "${HSBToHex(
            hue,
            neutralSaturationRange[index],
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
        <div className="palette">{primaryElements}</div>
        <div className="palette">{neutralElements}</div>
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
