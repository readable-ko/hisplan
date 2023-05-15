export let errors = [
  { code: "0", message: "Unknown command. Please review the readme file to learn about the current supported features. Error triggered by: " },
  { code: "1", message: 'Syntax error near "ORDER". Reason: "ORDER" is not a valid command. Did you mean "ORDER BY"?' },
  { code: "2", message: "Syntax error. Reason: illegal table name - can not end a table name with a comma" },
  { code: "3", message: 'Syntax error near "UPDATE". missing "SET"' },
  { code: "4", message: 'Syntax error near "SET". Reason: no column name specified before comma' },
  { code: "5", message: 'Syntax error near "SET". Reason: SET statments must be seperated with commas' },
  { code: "6", message: 'Syntax error near "SET". Reason: can not execute SET with operator different than =. got:' },
  { code: "7", message: 'Syntax error near "SET". Reason: can not end SET statements list with a comma' },
  { code: "8", message: 'Syntax error near "SELECT". Reason: missing "FROM"' },
  { code: "9", message: 'Syntax error near "SELECT". Reason: illegal list of columns - can not end a list with comma' },
  { code: "10", message: 'Syntax error near "SELECT". Reason: illegal list of columns - can not handle an empty list' },
  { code: "11", message: "not in use" },
  { code: "12", message: 'Syntax error near "ORDER BY". Reason: no column name specifeid before ASC' },
  { code: "13", message: "not in use" },
  { code: "14", message: 'Syntax error near: "ORDER BY". Reason: can not end columns list with a comma' },
  { code: "15", message: 'Syntax error near "WHERE". Reason: unknown operator:' },
  { code: "16", message: "not in use" },
  { code: "17", message: 'Syntax error near "SELECT". Reason: column does not exist' },
  { code: "18", message: "Rejected for your safety. Reason: using UPDATE with no WHERE specification is not a best practice" },
  { code: "19", message: 'Syntax error near "SET". Reason: no value was provided to update field' },
  { code: "20", message: 'Syntax error near "FROM". Reason: no collection name provided' },
  { code: "21", message: 'Syntax error near "WHERE". Reason: missing parameters, expected <coulmn_name, operator, value>' },
  { code: "22", message: `Syntax error. Reason: no termination char for string value (" / ')` },
  { code: "23", message: `Syntax error near "SELECT". Reason: no comma separation found in a multiple columns list` },
  { code: "24", message: `Syntax error near "ORDER BY". Reason: no comma separation found in a multiple columns list` },
  { code: "25", message: `Syntax error near "ORDER BY". Reason: no column name specifeid before DESC` },
  { code: "26", message: `Syntax error near "LIMIT". Reason: no value provided for row count limitation. Expected LIMIT <Number>` },
  {
    code: "27",
    message: `Syntax error near "SELECT". Reason: missing or illegal parentheses stracture. Expected all columns to be wrapped with functions, in the following structure: <Function><open parentheses><Column><close parentheses>`,
  },
  { code: "28", message: `not in use` },
  { code: "29", message: 'Syntax error near "INSERT". Reason: "INSERT" is not a valid command. Did you mean "INSERT INTO"?' },
  { code: "30", message: `Syntax error near "INSERT". Reason: no comma separation found in a multiple columns list` },
  { code: "31", message: 'Syntax error near "INSERT". Reason: can not end columns list with a comma' },
  { code: "32", message: 'Syntax error near "INSERT". Reason: missing VALUES keyword in the beginning of the values-to-insert list' },
  { code: "33", message: 'Syntax error near "INSERT". Reason: missing brackets at the begining/end of columns list' },
  { code: "34", message: 'Syntax error near "INSERT". Reason: illegal list of VALUES - can not handle an empty list' },
  { code: "35", message: 'Syntax error near "INSERT". Reason: missing brackets at the begining/end of values list' },
  { code: "36", message: `Syntax error near "INSERT". Reason: no comma separation found in a multiple values list` },
  { code: "37", message: 'Syntax error near "INSERT". Reason: can not end values list with a comma' },
  { code: "38", message: "not in use" },
  { code: "39", message: `not in use` },
  { code: "40", message: "Rejected for your safety. Reason: you need to add a WHERE clause to your DELETE statement" },
  { code: "41", message: "Unsupported syntax. Reason: can not handle both AND + OR in one expression" },
  { code: "42", message: "ERROR IN EXECUTOR <buildWixDataFilter> : unknown filter" },
  { code: "43", message: "ERROR IN EXECUTOR <buildWixDataAggregateQuery> : unknown query function" },
  { code: "44", message: "ERROR IN EXECUTOR <buildWixDataQuery> : unknown filter" },
  { code: "45", message: "Unsupported syntax. Reason: can not distinct by more than 1 column" },
  { code: "46", message: 'Syntax error near "INNER". Reason: "INNER" is not a valid command. Did you mean "INNER JOIN"?' },
  { code: "47", message: 'Syntax error near "JOIN". Reason: missing "ON" specification' },
  { code: "48", message: 'Syntax error near "SELECT". Reason: can not query both columns and functions in a single expression' },
  { code: "49", message: 'Syntax error near "DELETE". Reason: missing "FROM"' },
];
