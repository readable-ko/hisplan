import { errors } from "../engine/errors.js";

export function convertLimitExp(convertionObj, parsedInputArr, index) {
  if (index >= parsedInputArr.length) {
    throw new Error(errors[26].message);
  }
  const limitationValue = parseInt(parsedInputArr[index]);
  convertionObj.limit = limitationValue;
  return index;
}
