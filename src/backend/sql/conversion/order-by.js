import { errors } from "../engine/errors.js";

export function convertOrderByExp(convertionObj, parsedInputArr, index) {
  if (parsedInputArr[index].toUpperCase() !== "BY") {
    throw new Error(errors[1].message);
  }
  let expectAnotherColumn = true;
  let lastEncounteredColumn = null;
  let foundLIMIT = false;
  let jumpToIndex = parsedInputArr.length - 1;
  for (let i = index + 1; i < parsedInputArr.length && expectAnotherColumn && !foundLIMIT; i++) {
    let curr = parsedInputArr[i].toUpperCase(); // column | column, | ASC | DESC | ASC, | DESC,
    if (curr === "LIMIT") {
      foundLIMIT = true;
      jumpToIndex = i - 1;
    } else {
      let orderByObj = {};
      if (curr === "ASC" || curr === "ASC,") {
        if (lastEncounteredColumn === null) {
          throw new Error(errors[12].message);
        }
        orderByObj[lastEncounteredColumn] = "asc";
        convertionObj.orderBy.push(orderByObj);
        lastEncounteredColumn = null;
        if (curr === "ASC") {
          expectAnotherColumn = false;
          jumpToIndex = i;
        } else {
          expectAnotherColumn = true;
        }
      } else if (curr === "DESC" || curr === "DESC,") {
        if (lastEncounteredColumn === null) {
          throw new Error(errors[25].message);
        }
        orderByObj[lastEncounteredColumn] = "desc";
        convertionObj.orderBy.push(orderByObj);
        lastEncounteredColumn = null;
        if (curr === "DESC") {
          expectAnotherColumn = false;
          jumpToIndex = i;
        } else {
          expectAnotherColumn = true;
        }
      } else if (curr[curr.length - 1] === ",") {
        orderByObj[lastEncounteredColumn] = "asc";
        convertionObj.orderBy.push(orderByObj);
        lastEncounteredColumn = null;
        expectAnotherColumn = true;
      } else {
        if (lastEncounteredColumn !== null) {
          throw new Error(errors[24].message);
        }
        lastEncounteredColumn = parsedInputArr[i];
      }
    }
  }
  analyzeOrderByRes(convertionObj, expectAnotherColumn, lastEncounteredColumn);
  return jumpToIndex;
}

function analyzeOrderByRes(convertionObj, expectAnotherColumn, lastEncounteredColumn) {
  let orderByObj = {};
  if (lastEncounteredColumn !== null) {
    orderByObj[lastEncounteredColumn] = "asc";
    convertionObj.orderBy.push(orderByObj);
  } else if (expectAnotherColumn) {
    throw new Error(errors[14].message);
  }
}
