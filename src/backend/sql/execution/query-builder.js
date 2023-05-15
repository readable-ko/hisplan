import wixData from "wix-data";
import { errors } from "../engine/errors.js";

export function buildWixDataQuery(collectionName, filterObj, anotherCondType) {
  let first = true;
  let wixDataFunc = wixData.query(collectionName);
  if (filterObj && Object.keys(filterObj).length !== 0) {
    for (const obj of filterObj) {
      for (const [filterFieldName, filterPair] of Object.entries(obj)) {
        for (const [filterOp, filterVal] of Object.entries(filterPair)) {
          switch (filterOp) {
            case "eq": {
              if (anotherCondType === "OR" && !first) {
                wixDataFunc = wixDataFunc.or(wixData.query(collectionName).eq(filterFieldName, filterVal));
              } else {
                wixDataFunc = wixDataFunc.eq(filterFieldName, filterVal);
                first = false;
              }
              break;
            }
            case "gt": {
              if (anotherCondType === "OR" && !first) {
                wixDataFunc = wixDataFunc.or(wixData.query(collectionName).gt(filterFieldName, filterVal));
              } else {
                wixDataFunc = wixDataFunc.gt(filterFieldName, filterVal);
                first = false;
              }
              break;
            }
            case "ge": {
              if (anotherCondType === "OR" && !first) {
                wixDataFunc = wixDataFunc.or(wixData.query(collectionName).ge(filterFieldName, filterVal));
              } else {
                wixDataFunc = wixDataFunc.ge(filterFieldName, filterVal);
                first = false;
              }
              break;
            }
            case "lt": {
              if (anotherCondType === "OR" && !first) {
                wixDataFunc = wixDataFunc.or(wixData.query(collectionName).lt(filterFieldName, filterVal));
              } else {
                wixDataFunc = wixDataFunc.lt(filterFieldName, filterVal);
                first = false;
              }
              break;
            }
            case "le": {
              if (anotherCondType === "OR" && !first) {
                wixDataFunc = wixDataFunc.or(wixData.query(collectionName).le(filterFieldName, filterVal));
              } else {
                wixDataFunc = wixDataFunc.le(filterFieldName, filterVal);
                first = false;
              }
              break;
            }
            case "ne": {
              if (anotherCondType === "OR" && !first) {
                wixDataFunc = wixDataFunc.or(wixData.query(collectionName).ne(filterFieldName, filterVal));
              } else {
                wixDataFunc = wixDataFunc.ne(filterFieldName, filterVal);
                first = false;
              }
              break;
            }
            case "startsWith": {
              if (anotherCondType === "OR" && !first) {
                wixDataFunc = wixDataFunc.or(wixData.query(collectionName).startsWith(filterFieldName, filterVal));
              } else {
                wixDataFunc = wixDataFunc.startsWith(filterFieldName, filterVal);
                first = false;
              }
              break;
            }
            case "endsWith": {
              if (anotherCondType === "OR" && !first) {
                wixDataFunc = wixDataFunc.or(wixData.query(collectionName).endsWith(filterFieldName, filterVal));
              } else {
                wixDataFunc = wixDataFunc.endsWith(filterFieldName, filterVal);
                first = false;
              }
              break;
            }
            case "contains": {
              if (anotherCondType === "OR" && !first) {
                wixDataFunc = wixDataFunc.or(wixData.query(collectionName).contains(filterFieldName, filterVal));
              } else {
                wixDataFunc = wixDataFunc.contains(filterFieldName, filterVal);
                first = false;
              }
              break;
            }
            default: {
              throw new Error(errors[44].message);
            }
          }
        }
      }
    }
  }
  return wixDataFunc;
}

export function addOrderByToQuery(prevWixDataFunc, orderByArr) {
  let wixDataFunc = prevWixDataFunc;
  if (orderByArr && orderByArr.length > 0) {
    for (const order of orderByArr) {
      let columnName = Object.keys(order)[0];
      let orderType = Object.values(order)[0];
      if (orderType === "asc") {
        wixDataFunc = wixDataFunc.ascending(columnName);
      } else {
        wixDataFunc = wixDataFunc.descending(columnName);
      }
    }
  }
  return wixDataFunc;
}

export function addLimitToQuery(prevWixDataFunc, convertionObj) {
  let wixDataFunc = prevWixDataFunc;
  if (convertionObj.limit) {
    wixDataFunc = wixDataFunc.limit(convertionObj.limit);
  }
  return wixDataFunc;
}

export function buildWixDataAggregateQuery(convertionObj) {
  let wixDataAggFunc = wixData.aggregate(convertionObj.collectionName);
  for (const funcQueryObj of convertionObj.functionsQueriedColumns) {
    switch (funcQueryObj.functionName) {
      case "MIN": {
        wixDataAggFunc = wixDataAggFunc.min(funcQueryObj.columnName);
        break;
      }
      case "MAX": {
        wixDataAggFunc = wixDataAggFunc.max(funcQueryObj.columnName);
        break;
      }
      case "AVG": {
        wixDataAggFunc = wixDataAggFunc.avg(funcQueryObj.columnName);
        break;
      }
      case "SUM": {
        wixDataAggFunc = wixDataAggFunc.sum(funcQueryObj.columnName);
        break;
      }
      case "COUNT": {
        wixDataAggFunc = wixDataAggFunc.count();
        break;
      }
      default: {
        throw new Error(errors[43].message);
      }
    }
  }
  return wixDataAggFunc;
}

export function buildWixDataFilter(convertionObj) {
  let wixDataAggFilter = wixData.filter();
  let first = true;
  if (Object.keys(convertionObj.filterObj).length !== 0) {
    for (const filterObj of convertionObj.filterObj) {
      for (const [filterFieldName, filterPair] of Object.entries(filterObj)) {
        for (const [filterOp, filterVal] of Object.entries(filterPair)) {
          switch (filterOp) {
            case "eq": {
              if (convertionObj.anotherCondType === "OR" && !first) {
                wixDataAggFilter = wixDataAggFilter.or(wixData.query(convertionObj.collectionName).eq(filterFieldName, filterVal));
              } else {
                wixDataAggFilter = wixDataAggFilter.eq(filterFieldName, filterVal);
                first = false;
              }
              break;
            }
            case "gt": {
              if (convertionObj.anotherCondType === "OR" && !first) {
                wixDataAggFilter = wixDataAggFilter.or(wixData.query(convertionObj.collectionName).gt(filterFieldName, filterVal));
              } else {
                wixDataAggFilter = wixDataAggFilter.gt(filterFieldName, filterVal);
                first = false;
              }
              break;
            }
            case "ge": {
              if (convertionObj.anotherCondType === "OR" && !first) {
                wixDataAggFilter = wixDataAggFilter.or(wixData.query(convertionObj.collectionName).ge(filterFieldName, filterVal));
              } else {
                wixDataAggFilter = wixDataAggFilter.ge(filterFieldName, filterVal);
                first = false;
              }
              break;
            }
            case "lt": {
              if (convertionObj.anotherCondType === "OR" && !first) {
                wixDataAggFilter = wixDataAggFilter.or(wixData.query(convertionObj.collectionName).lt(filterFieldName, filterVal));
              } else {
                wixDataAggFilter = wixDataAggFilter.lt(filterFieldName, filterVal);
                first = false;
              }
              break;
            }
            case "le": {
              if (convertionObj.anotherCondType === "OR" && !first) {
                wixDataAggFilter = wixDataAggFilter.or(wixData.query(convertionObj.collectionName).le(filterFieldName, filterVal));
              } else {
                wixDataAggFilter = wixDataAggFilter.le(filterFieldName, filterVal);
                first = false;
              }
              break;
            }
            case "ne": {
              if (convertionObj.anotherCondType === "OR" && !first) {
                wixDataAggFilter = wixDataAggFilter.or(wixData.query(convertionObj.collectionName).ne(filterFieldName, filterVal));
              } else {
                wixDataAggFilter = wixDataAggFilter.ne(filterFieldName, filterVal);
                first = false;
              }
              break;
            }
            case "startsWith": {
              if (convertionObj.anotherCondType === "OR" && !first) {
                wixDataAggFilter = wixDataAggFilter.or(wixData.query(convertionObj.collectionName).startsWith(filterFieldName, filterVal));
              } else {
                wixDataAggFilter = wixDataAggFilter.startsWith(filterFieldName, filterVal);
                first = false;
              }
              break;
            }
            case "endsWith": {
              if (convertionObj.anotherCondType === "OR" && !first) {
                wixDataAggFilter = wixDataAggFilter.or(wixData.query(convertionObj.collectionName).endsWith(filterFieldName, filterVal));
              } else {
                wixDataAggFilter = wixDataAggFilter.endsWith(filterFieldName, filterVal);
                first = false;
              }
              break;
            }
            case "contains": {
              if (convertionObj.anotherCondType === "OR" && !first) {
                wixDataAggFilter = wixDataAggFilter.or(wixData.query(convertionObj.collectionName).contains(filterFieldName, filterVal));
              } else {
                wixDataAggFilter = wixDataAggFilter.contains(filterFieldName, filterVal);
                first = false;
              }
              break;
            }
            default: {
              throw new Error(errors[42].message);
            }
          }
        }
      }
    }
  }
  return wixDataAggFilter;
}
