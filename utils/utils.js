import fs from 'fs';

export const getFilesizeInBytes = (filepath) => {
  let stats = fs.statSync(filepath);
  return stats['size'];
}

export const getTimestamp = () => {
  const t = new Date();
  return t.getFullYear() + '-' + (t.getMonth() + 1) + '-'
      + t.getDate() + '_' + t.getHours() + ':' + t.getMinutes() + ':'
      + t.getSeconds();
}

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Including min number, excluding max number. Precision 100 --> 2 decimal places.
 */
export const generateRandomNumber = (min, max, precision) => {
  return Math.floor(Math.random() * (max * precision - min * precision) + min * precision) / (min * precision)
}

/**
 * Including min number, excluding max number.
 */
export const generateRandomInteger =  (min, max) => parseInt(generateRandomNumber(min, max, 10))