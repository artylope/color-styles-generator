import colorcolor from 'colorcolor';

export function HSBToRGB(h, s, b) {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [
    Math.round(255 * f(5)),
    Math.round(255 * f(3)),
    Math.round(255 * f(1)),
  ];
}

export function HSBToHex(h, s, b) {
  let colorFill = HSBToRGB(parseInt(h), parseInt(s), parseInt(b));

  let rgb = `rgb(${colorFill})`;
  let hexCode = colorcolor(`rgb(${colorFill})`, 'hex');

  return hexCode;
}

export function HexToHSB(hex) {
  let hsbStr = colorcolor(hex, 'hsb');
  let hsb = hsbStr
    .split('hsb(')[1]
    .replace(')', '')
    .replace('%', '')
    .replace('%', '')
    .split(',');
  console.log('hsb', hsb);
  return hsb;
}
