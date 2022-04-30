import logo from './logo.svg';
import './App.scss';
import Palette from './components/Palette';
import Swatch from './components/Swatch';
import data from './data/data';
import colorcolor from 'colorcolor';

function App() {
  // console.log('data', data);

  function getHsb(hex) {
    let inputColor = colorcolor(hex, 'hsb');
    let hsb = inputColor
      .split('hsb(')[1]
      .replace(')', '')
      .replace('%', '')
      .replace('%', '')
      .split(',');
    return hsb;
  }

  function getHue(hex) {
    let inputColor = colorcolor(hex, 'hsb');
    let hsb = inputColor
      .split('hsb(')[1]
      .replace(')', '')
      .replace('%', '')
      .replace('%', '')
      .split(',');
    let hValue = hsb[0];
    return parseInt(hValue);
  }

  function getSaturation(hex) {
    let inputColor = colorcolor(hex, 'hsb');
    let hsb = inputColor
      .split('hsb(')[1]
      .replace(')', '')
      .replace('%', '')
      .replace('%', '')
      .split(',');
    let sValue = hsb[1];
    return parseInt(sValue);
  }

  function getBrightness(hex) {
    let inputColor = colorcolor(hex, 'hsb');
    let hsb = inputColor
      .split('hsb(')[1]
      .replace(')', '')
      .replace('%', '')
      .replace('%', '')
      .split(',');
    let bValue = hsb[2];
    return parseInt(bValue);
  }

  console.log('h', getHue('#2B49B5'));
  console.log('s', getSaturation('#2B49B5'));
  console.log('b', getBrightness('#2B49B5'));

  //derive brightness array based on the inputColor's brightness
  let brightnessArray = function (bValue) {
    let bMax = 97;
    let bMin = 15;
    let arrayLeft = [];
    let arrayRight = [];
    let stopsLeft = 6;
    let stopsRight = 4;

    for (let i = 1; i < stopsRight + 1; i++) {
      let averageRight = (bMax - bValue) / stopsRight;
      arrayRight.push(Math.round(bValue + i * averageRight));
    }

    for (let i = 1; i < stopsLeft + 1; i++) {
      let averageLeft = (bValue - bMin) / stopsLeft;

      arrayLeft.push(Math.round(bValue - i * averageLeft));
    }

    arrayLeft = arrayLeft.reverse();

    let array = [...arrayLeft, bValue, ...arrayRight];
    return array;
  };

  let palette = brightnessArray(getBrightness('#2B49B5'));
  let hue = getHue('#2B49B5');
  let saturation = getSaturation('#2B49B5');

  const HSBToRGB = (h, s, b) => {
    s /= 100;
    b /= 100;
    const k = (n) => (n + h / 60) % 6;
    const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
    return [255 * f(5), 255 * f(3), 255 * f(1)];
  };

  let swatchElements = palette.map((value) => {
    return (
      <div
        className="swatch"
        style={{ background: `rgba(${HSBToRGB(hue, saturation, value)})` }}
      >
        {value}
      </div>
    );
  });

  console.log(swatchElements);

  return <div>{swatchElements}</div>;
}

export default App;
