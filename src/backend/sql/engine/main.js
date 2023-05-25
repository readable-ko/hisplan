import { errors } from "./errors.js";
import { parseIntoArr } from "./parser.js";
import { convertSelectExp } from "../conversion/select.js";
import { convertCondExp } from "../conversion/where.js";
import { convertOrderByExp } from "../conversion/order-by.js";
import { convertUpdateExp } from "../conversion/update.js";
import { convertLimitExp } from "../conversion/limit.js";
import { convertInsertExp } from "../conversion/insert.js";
import { convertDeleteExp } from "../conversion/delete.js";
import { convertJoinExp } from "../conversion/join.js";
import { execute } from "../execution/executor.js";

let parsedInputArr = []; // input string break down into an array of words for iteration
let convertionObj = {}; // gathers and holds all the extracted info from the input

// The package's entry point
export async function sql(inputStr) {
  init();
  parsedInputArr = parseIntoArr(inputStr.trim());
  convertor();
  return await execute(convertionObj);
}

// initialize global array and object
function init() {
  parsedInputArr = [];
  convertionObj = {
    filterObj: [],
    orderBy: [],
    timeStart: new Date(),
  };
}

// Iterates over the input array and handles the conversion according to the expression's type
function convertor() {
  for (let i = 0; i < parsedInputArr.length; ++i) {
    switch (parsedInputArr[i].toUpperCase()) {
      case "SELECT": {
        i = convertSelectExp(convertionObj, parsedInputArr, i + 1);
        break;
      }

      case "WHERE": {
        i = convertCondExp(convertionObj, parsedInputArr, i + 1);
        break;
      }

      case "ORDER": {
        i = convertOrderByExp(convertionObj, parsedInputArr, i + 1);
        break;
      }

      case "UPDATE": {
        i = convertUpdateExp(convertionObj, parsedInputArr, i + 1);
        break;
      }

      case "LIMIT": {
        i = convertLimitExp(convertionObj, parsedInputArr, i + 1);
        break;
      }

      case "INSERT": {
        i = convertInsertExp(convertionObj, parsedInputArr, i + 1);
        break;
      }

      case "DELETE": {
        i = convertDeleteExp(convertionObj, parsedInputArr, i + 1);
        break;
      }

      case "INNER":
      case "LEFT": {
        i = convertJoinExp(convertionObj, parsedInputArr, i);
        break;
      }

      default: {
        throw new Error(errors[0].message + " " + parsedInputArr[i]);
      }
    }
  }
}
