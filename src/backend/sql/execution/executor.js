import wixData from "wix-data";
import { buildWixDataQuery, addOrderByToQuery, addLimitToQuery, buildWixDataAggregateQuery, buildWixDataFilter } from "./query-builder.js";
import { buildTableOfFunctionsResults, buildTableFromJoinResults, buildTableFromResults } from "./results-builder.js";

export async function execute(convertionObj) {
  const returnedJson = {
    topLevelOperation: convertionObj.expType,
    timeStartRun: convertionObj.timeStart,
    timeStartExecution: new Date(),
  };

  let wixDataFunc, funcResults;

  switch (convertionObj.expType) {
    case "SELECT":
    case "SELECT DISTINCT": {
      wixDataFunc = buildWixDataQuery(convertionObj.collectionName, convertionObj.filterObj, convertionObj.anotherCondType);
      wixDataFunc = addOrderByToQuery(wixDataFunc, convertionObj.orderBy);
      wixDataFunc = addLimitToQuery(wixDataFunc, convertionObj);

      if (convertionObj.expType === "SELECT") {
        funcResults = await wixDataFunc.find();
      } else if (convertionObj.expType === "SELECT DISTINCT") {
        funcResults = await wixDataFunc.distinct(convertionObj.queriedColumns.columns[0]);
      }

      returnedJson.timeEndExecution = new Date();

      if (funcResults.items.length > 0) {
        returnedJson.payload = buildTableFromResults(funcResults.items, convertionObj.queriedColumns, convertionObj.expType);
      } else {
        returnedJson.payload = { data: { columns: [], rows: [] } };
      }

      break;
    }

    case "SELECT Functions": {
      wixDataFunc = buildWixDataAggregateQuery(convertionObj);
      let wixDataFilter = buildWixDataFilter(convertionObj);
      funcResults = await wixDataFunc.filter(wixDataFilter).run();
      returnedJson.timeEndExecution = new Date();

      if (funcResults.items.length > 0) {
        returnedJson.payload = buildTableOfFunctionsResults(funcResults.items[0]);
      } else {
        returnedJson.payload = { data: { columns: [], rows: [] } };
      }

      break;
    }

    case "UPDATE": {
      wixDataFunc = buildWixDataQuery(convertionObj.collectionName, convertionObj.filterObj, convertionObj.anotherCondType);
      funcResults = await wixDataFunc.find();

      for (let i = 0; i < funcResults.items.length; ++i) {
        funcResults.items[i] = {
          ...funcResults.items[i],
          ...convertionObj.toUpdateObj,
        };
      }

      funcResults = await wixData.bulkUpdate(convertionObj.collectionName, funcResults.items);
      returnedJson.timeEndExecution = new Date();
      returnedJson.payload = { updated: funcResults.updated };
      break;
    }

    case "INSERT": {
      const toInsertObj = {};

      for (let i = 0; i < convertionObj.toInsert.columns.length; ++i) {
        let column = convertionObj.toInsert.columns[i];
        let value = null;

        if (i < convertionObj.toInsert.values.length) {
          value = convertionObj.toInsert.values[i];
        }

        toInsertObj[column] = value;
      }

      funcResults = await wixData.insert(convertionObj.collectionName, toInsertObj);
      returnedJson.timeEndExecution = new Date();
      returnedJson.payload = { inserted: true };
      break;
    }

    case "DELETE": {
      wixDataFunc = buildWixDataQuery(convertionObj.collectionName, convertionObj.filterObj, convertionObj.anotherCondType);
      funcResults = await wixDataFunc.find();
      funcResults = funcResults.items.map((item) => item._id);
      funcResults = await wixData.bulkRemove(convertionObj.collectionName, funcResults);
      returnedJson.timeEndExecution = new Date();
      returnedJson.payload = { deleted: funcResults.removed };
      break;
    }

    case "INNER JOIN":
    case "LEFT JOIN": {
      adjustConvertionObjectToJoin(convertionObj);

      wixDataFunc = buildWixDataQuery(convertionObj.collectionName, convertionObj.condsMap[convertionObj.collectionName], convertionObj.anotherCondType);
      wixDataFunc = addOrderByToQuery(wixDataFunc, convertionObj.orderByMap[convertionObj.collectionName]);
      wixDataFunc = addLimitToQuery(wixDataFunc, convertionObj);

      let joinedWixDataFunc = buildWixDataQuery(
        convertionObj.joinedCollectionName,
        convertionObj.condsMap[convertionObj.joinedCollectionName],
        convertionObj.anotherCondType
      );
      joinedWixDataFunc = addOrderByToQuery(joinedWixDataFunc, convertionObj.orderByMap[convertionObj.joinedCollectionName]);
      joinedWixDataFunc = addLimitToQuery(joinedWixDataFunc, convertionObj);

      funcResults = await wixDataFunc.find();
      if (funcResults.length > 0) {
        let joinedFuncResults = await joinedWixDataFunc.find();
        returnedJson.payload = buildTableFromJoinResults(funcResults.items, joinedFuncResults.items, convertionObj);
      } else {
        returnedJson.payload = { data: { columns: [], rows: [] } };
      }

      returnedJson.timeEndExecution = new Date();
      break;
    }
  }

  return returnedJson;
}

function adjustConvertionObjectToJoin(convertionObj) {
  convertionObj.columnsMap = {};
  for (const collectionAndColumn of convertionObj.queriedColumns.columns) {
    const [collectionName, columnName] = collectionAndColumn.split(".");
    if (!convertionObj.columnsMap[collectionName]) {
      convertionObj.columnsMap[collectionName] = [];
    }

    convertionObj.columnsMap[collectionName].push(columnName);
  }

  convertionObj.condsMap = {};
  for (const filterObj of convertionObj.filterObj) {
    for (const [collectionAndColumn, filterPair] of Object.entries(filterObj)) {
      for (const [filterOp, filterVal] of Object.entries(filterPair)) {
        const [collectionName, columnName] = collectionAndColumn.split(".");
        if (!convertionObj.condsMap[collectionName]) {
          convertionObj.condsMap[collectionName] = [];
        }

        const obj = {
          [columnName]: {
            [filterOp]: filterVal,
          },
        };

        convertionObj.condsMap[collectionName].push(obj);
      }
    }
  }

  convertionObj.orderByMap = {};
  for (const orderObj of convertionObj.orderBy) {
    for (const [collectionAndColumn, orderType] of Object.entries(orderObj)) {
      const [collectionName, columnName] = collectionAndColumn.split(".");
      if (!convertionObj.orderByMap[collectionName]) {
        convertionObj.orderByMap[collectionName] = [];
      }

      const obj = {
        [columnName]: orderType,
      };

      convertionObj.orderByMap[collectionName].push(obj);
    }
  }
}
