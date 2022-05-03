import { HexToHSB } from './colorConvert';

export function getHue(hex) {
  let hsb = HexToHSB(hex);
  let hValue = hsb[0];
  return parseInt(hValue);
}

export function getSaturation(hex) {
  let hsb = HexToHSB(hex);
  let sValue = hsb[1];
  return parseInt(sValue);
}

export function getBrightness(hex) {
  let hsb = HexToHSB(hex);
  let bValue = hsb[2];
  return parseInt(bValue);
}
