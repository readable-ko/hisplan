import { errors } from "../engine/errors.js";
import { convertCollectionName } from "./general.js";

export function convertSelectExp(convertionObj, parsedInputArr, index) {
  const curr = parsedInputArr[index].toUpperCase();
  let jumpToIndex;
  if (curr === "COUNT" || curr === "SUM" || curr === "AVG" || curr === "MIN" || curr === "MAX") {
    convertionObj.expType = "SELECT Functions";
    jumpToIndex = convertFunctionsQueriedColumns(convertionObj, parsedInputArr, index);
  } else if (curr === "DISTINCT") {
    convertionObj.expType = "SELECT DISTINCT";
    jumpToIndex = convertQueriedColumns(convertionObj, parsedInputArr, index + 1);
  } else {
    convertionObj.expType = "SELECT";
    jumpToIndex = convertQueriedColumns(convertionObj, parsedInputArr, index);
  }
  convertCollectionName(convertionObj, parsedInputArr, jumpToIndex);
  return jumpToIndex;
}

function convertQueriedColumns(convertionObj, parsedInputArr, index) {
  convertionObj.queriedColumns = {
    star: false,
    columns: [],
  };
  let foundFROM = false;
  let expectAnotherColumn = true;
  let jumpToIndex;
  for (let i = index; i < parsedInputArr.length && !foundFROM; i++) {
    let curr = parsedInputArr[i];
    if (curr.toUpperCase() === "FROM") {
      jumpToIndex = i + 1;
      foundFROM = true;
    } else {
      if (!expectAnotherColumn) {
        if (curr === "(") {
          throw new Error(errors[48].message);
        } else {
          throw new Error(errors[23].message);
        }
      }
      if (curr[curr.length - 1] === ",") {
        if (curr === "*,") {
          convertionObj.queriedColumns.star = true;
        } else {
          convertionObj.queriedColumns.columns.push(curr.slice(0, -1));
        }
      } else {
        expectAnotherColumn = false;
        if (curr === "*") {
          convertionObj.queriedColumns.star = true;
        } else {
          convertionObj.queriedColumns.columns.push(curr);
        }
      }
    }
  }
  analyzeQueriedColumnsRes(convertionObj, foundFROM, expectAnotherColumn);
  return jumpToIndex;
}

function analyzeQueriedColumnsRes(convertionObj, foundFROM, expectAnotherColumn) {
  if (!foundFROM) {
    throw new Error(errors[8].message);
  }
  if (expectAnotherColumn) {
    throw new Error(errors[9].message);
  }
  if (convertionObj.expType === "SELECT" || convertionObj.expType === "SELECT DISTINCT") {
    if (!convertionObj.queriedColumns.star && convertionObj.queriedColumns.columns.length === 0) {
      throw new Error(errors[10].message);
    }
    if (convertionObj.expType === "SELECT DISTINCT") {
      if (convertionObj.queriedColumns.star || convertionObj.queriedColumns.columns.length >= 2) {
        throw new Error(errors[45].message);
      }
    }
  } else if (convertionObj.expType === "SELECT Functions") {
    if (convertionObj.functionsQueriedColumns.length === 0) {
      throw new Error(errors[10].message);
    }
  }
}

function convertFunctionsQueriedColumns(convertionObj, parsedInputArr, index) {
  convertionObj.functionsQueriedColumns = [];
  let foundFROM = false;
  let expectAnotherColumn = true;
  let jumpToIndex;
  for (let i = index; i < parsedInputArr.length - 1 && !foundFROM; i++) {
    let curr = parsedInputArr[i].toUpperCase();
    if (curr === "FROM") {
      jumpToIndex = i + 1;
      foundFROM = true;
    } else {
      if (!expectAnotherColumn) {
        throw new Error(errors[23].message);
      }
      if (i + 3 >= parsedInputArr.length || parsedInputArr[i + 1] !== "(" || (parsedInputArr[i + 3] !== ")" && parsedInputArr[i + 3] !== "),")) {
        throw new Error(errors[27].message);
      }
      if (parsedInputArr[i + 3] === ")") {
        expectAnotherColumn = false;
      }
      const functionName = curr;
      const columnName = parsedInputArr[i + 2];
      convertionObj.functionsQueriedColumns.push({ functionName, columnName });
      i = i + 3;
    }
  }
  analyzeQueriedColumnsRes(convertionObj, foundFROM, expectAnotherColumn);
  return jumpToIndex;
}
