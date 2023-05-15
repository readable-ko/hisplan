import { errors } from "../engine/errors.js";
import { convertCollectionName } from "./general.js";
import { convertCondExp } from "./where.js";

export function convertDeleteExp(convertionObj, parsedInputArr, index) {
  convertionObj.expType = "DELETE";
  if (parsedInputArr[index].toUpperCase() !== "FROM") {
    throw new Error(errors[49].message);
  }
  convertCollectionName(convertionObj, parsedInputArr, index + 1);
  if (index + 2 >= parsedInputArr.length || parsedInputArr[index + 2].toUpperCase() !== "WHERE") {
    throw new Error(errors[40].message);
  }
  return convertCondExp(convertionObj, parsedInputArr, index + 3);
}
