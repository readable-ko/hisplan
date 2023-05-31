// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world
import wixData from "wix-data";

$w.onReady(function () {
  // Write your JavaScript here
  
  // To select an element by ID use: $w('#elementID')
  fetchValueFromDatabase();

  // Click 'Preview' to run your code
});

async function fetchValueFromDatabase() {
  try {
    const collection = "Student";
    const filter = wixData.filter().eq("Name");

    console.log(filter);

    // const results = await wixData.query(collection)
    //     .limit(1)
    //     .find(filter);

    // const value = results.items[0].field;
    // $w('#text6').value = value;
  } catch (err) {
    console.error("Error : " + err);
  }
}
