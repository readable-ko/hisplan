import { errors } from "../engine/errors.js";
import { convertValueExp } from "./general.js";

export function convertCondExp(convertionObj, parsedInputArr, index) {
  if (index + 2 >= parsedInputArr.length) {
    throw new Error(errors[21].message);
  }
  const columnName = parsedInputArr[index];
  const operator = parsedInputArr[index + 1];
  const convertedOperator = convertCondOperator(operator);
  let [value, jumpToIndex] = Object.values(convertValueExp(parsedInputArr, index + 2));
  if (convertedOperator === "LIKE") {
    convertLikeValueExp(columnName, value, convertionObj);
  } else {
    const condObj = {
      [columnName]: {
        [convertedOperator]: value,
      },
    };
    convertionObj.filterObj.push(condObj);
  }
  const anotherCondType = checkIfAnotherCondExp(parsedInputArr, jumpToIndex + 1);
  if (anotherCondType) {
    if (convertionObj.anotherCondType && convertionObj.anotherCondType !== anotherCondType) {
      throw new Error(errors[41].message);
    }
    convertionObj.anotherCondType = anotherCondType;
    jumpToIndex = convertCondExp(convertionObj, parsedInputArr, jumpToIndex + 2);
  }
  return jumpToIndex;
}

function convertLikeValueExp(columnName, condValue, convertionObj) {
  let condObj = {
    [columnName]: {},
  };
  let condValueStr = condValue;
  if ((condValue[0] === '"' && condValue[condValue.length - 1] === '"') || (condValue[0] === "'" && condValue[condValue.length - 1] === "'")) {
    condValueStr = condValueStr.slice(1, -1);
  }
  const splitCondValue = condValueStr.split("%");
  if (splitCondValue.length === 1) {
    condObj[columnName]["eq"] = splitCondValue[0];
    convertionObj.filterObj.push(condObj);
  } else {
    if (splitCondValue[0]) {
      condObj[columnName]["startsWith"] = splitCondValue[0];
      convertionObj.filterObj.push(condObj);
    }
    if (splitCondValue[splitCondValue.length - 1]) {
      condObj[columnName]["endsWith"] = splitCondValue[splitCondValue.length - 1];
      convertionObj.filterObj.push(condObj);
    }
    for (let i = 1; i < splitCondValue.length - 1; i++) {
      condObj[columnName]["contains"] = splitCondValue[i];
      convertionObj.filterObj.push(condObj);
    }
  }
}

function checkIfAnotherCondExp(parsedInputArr, index) {
  if (index >= parsedInputArr.length) {
    return "";
  }
  const nextScannedWord = parsedInputArr[index].toUpperCase();
  return nextScannedWord === "AND" ? "AND" : nextScannedWord === "OR" ? "OR" : "";
}

function convertCondOperator(operator) {
  switch (operator.toUpperCase()) {
    case "=": {
      return "eq";
    }
    case ">": {
      return "gt";
    }
    case ">=": {
      return "ge";
    }
    case "<": {
      return "lt";
    }
    case "<=": {
      return "le";
    }
    case "<>":
    case "!=": {
      return "ne";
    }
    case "LIKE": {
      return "LIKE";
    }
    default: {
      throw new Error(errors[15].message + " " + operator);
    }
  }
}
