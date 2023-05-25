import { errors } from "./errors.js";

export function parseIntoArr(inputStr) {
  let parsedInputStr = inputStr;

  if (parsedInputStr.match(/\/\//g) || parsedInputStr.match(/\/\*/g) || parsedInputStr.match(/\*\//g) || parsedInputStr.match(/\$\{/g)) {
    throw new Error(errors[0].message);
  }

  parsedInputStr = parsedInputStr.replace(/\n[\n]*/g, " "); // replace all newline chars with space char
  parsedInputStr = parsedInputStr.replace(/\(/g, " ( ");
  parsedInputStr = parsedInputStr.replace(/\)/g, " ) ");

  // adding spaces before and after operators to force pattern of <column><space><op><space><value>
  parsedInputStr = parsedInputStr.replace(/>=/g, " >= ");
  parsedInputStr = parsedInputStr.replace(/<=/g, " <= ");
  parsedInputStr = parsedInputStr.replace(/<>/g, " <> ");
  parsedInputStr = parsedInputStr.replace(/!=/g, " != ");
  parsedInputStr = parsedInputStr.replace(/=/g, " = ");
  parsedInputStr = parsedInputStr.replace(/>/g, " > ");
  parsedInputStr = parsedInputStr.replace(/</g, " < ");
  parsedInputStr = parsedInputStr.replace(/>\s\s=/g, ">=");
  parsedInputStr = parsedInputStr.replace(/!\s=/g, "!=");
  parsedInputStr = parsedInputStr.replace(/<\s\s=/g, "<=");
  parsedInputStr = parsedInputStr.replace(/<\s\s>/g, "<>");
  parsedInputStr = parsedInputStr.replace(/\s[\s]+/g, " "); // replace all sequences of 2 spaces or more with 1 space char
  parsedInputStr = parsedInputStr.replace(/\s,/g, ","); // remove space before commas

  return parsedInputStr.split(" ");
}
