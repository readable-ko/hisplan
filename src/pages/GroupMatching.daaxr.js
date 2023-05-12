// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world

import { sql } from "@velo/wix-data-sql-backend";

$w.onReady(function () {
  $w("#button").onClick(async () => {
    $w("#responseText").text = await sql("SELECT 'hello, world!'");
    $w("#responseText").show();
  });
});
