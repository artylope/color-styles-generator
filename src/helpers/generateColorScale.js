//declare variables
import { stopsLeft, stopsRight } from '../constants/global';

//generate brightness array for light mode based on brightness of input color
export function getNormalBrightnessArray(bValue) {
  let bMax = 98;
  let bOne = 97;
  let bMin = 15;
  let arrayLeft = [bMax, bOne];
  let arrayRight = [];

  for (let i = 1; i < stopsLeft - 1; i++) {
    let averageLeft = (bOne - bValue) / (stopsLeft - 1);
    arrayLeft.push(Math.round(bOne - i * averageLeft));
  }

  for (let i = 1; i < stopsRight + 1; i++) {
    let averageRight = (bValue - bMin) / stopsRight;
    arrayRight.push(Math.round(bValue - i * averageRight));
  }

  let array = [...arrayLeft, bValue, ...arrayRight];
  return array;
}

//generate brightness array for neutral colors based on brightness of input color
export function getMutedBrightnessArray(bValue) {
  let bMax = 99;
  let bOne = 97;
  let bMin = 15;
  let arrayLeft = [bMax, bOne];
  let arrayRight = [];

  for (let i = 1; i < stopsLeft - 1; i++) {
    let averageLeft = (bOne - bValue) / (stopsLeft - 1);
    arrayLeft.push(Math.round(bOne - i * averageLeft));
  }

  for (let i = 1; i < stopsRight + 1; i++) {
    let averageRight = (bValue - bMin) / stopsRight;
    arrayRight.push(Math.round(bValue - i * averageRight));
  }

  let array = [...arrayLeft, bValue, ...arrayRight];
  return array;
}

//generate saturation array for muted/neutral colors based on saturation of input color
export function getMutedSaturationArray(sValue) {
  let sMax = 15;
  let sMid = 15;
  let sMin = 0;
  let arrayLeft = [];
  let arrayRight = [];

  for (let i = 1; i < stopsLeft + 1; i++) {
    let averageLeft = (sMid - sMin) / stopsLeft;
    arrayLeft.push(Math.round(sMin + i * averageLeft));
  }
  for (let i = 1; i < stopsRight + 1; i++) {
    let averageRight = (sMax - sMid) / stopsRight;
    arrayRight.push(Math.round(sMid + i * averageRight));
  }

  let array = [...arrayLeft, sMid, ...arrayRight];
  console.log('muted', array);
  return array;
}

//genterate saturation array for normal colors based on saturation of input color
export function getNormalSaturationArray(sValue) {
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
}
