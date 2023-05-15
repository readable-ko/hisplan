import { errors } from "../engine/errors.js";

export function convertCollectionName(convertionObj, parsedInputArr, index) {
  if (index >= parsedInputArr.length) {
    throw new Error(errors[20].message);
  }
  const collectionName = parsedInputArr[index];
  convertionObj.collectionName = collectionName;
}

export function convertValueExp(parsedInputArr, index) {
  let value = parsedInputArr[index];
  let expectAnother = value[value.length - 1] === ",";
  let foundTerminationOfValue = true;
  let jumpToIndex = index;
  if (value[0] === "'" || value[0] === '"') {
    let terminationChar = value[0];
    if (
      value.length === 1 ||
      (value.slice(-1) === "," && value.length >= 2 && value.slice(-2) !== terminationChar + ",") ||
      (value.slice(-1) !== "," && value.slice(-1) !== terminationChar)
    ) {
      foundTerminationOfValue = false;
      let i = index + 1;
      let curr;
      while (!foundTerminationOfValue && i < parsedInputArr.length) {
        curr = parsedInputArr[i];
        value += " " + curr;
        if (curr.slice(-1) === terminationChar || (curr.length >= 2 && curr.slice(-2) === terminationChar + ",")) {
          expectAnother = curr.length >= 2 && curr.slice(-2) === terminationChar + ",";
          foundTerminationOfValue = true;
          jumpToIndex = i;
        }
        i++;
      }
    }
    if (!foundTerminationOfValue) {
      throw new Error(errors[22].message);
    }
    if (expectAnother) {
      return { value: value.slice(1, -2), jumpToIndex, expectAnother };
    } else {
      return { value: value.slice(1, -1), jumpToIndex, expectAnother };
    }
  } else {
    if (expectAnother) {
      value = value.slice(0, -1);
    }
    value = value.toUpperCase();
    if (value === "TRUE") {
      return { value: true, jumpToIndex, expectAnother };
    } else if (value === "FALSE") {
      return { value: false, jumpToIndex, expectAnother };
    } else {
      return { value: parseFloat(value), jumpToIndex, expectAnother };
    }
  }
}
