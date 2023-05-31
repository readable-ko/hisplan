// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world
import wixData from "wix-data";

$w.onReady(async () => {
  await wixData
    .query("Student")
    .include("Group-8")
    .find()
    .then((results) => {
        // for(let i = 0 ; i < 22 ; i++) {
        //   if(results.items[0]['Group-8']['groupId'] == "0")
        //   console.log(results.items[0]['Group-8']['groupId']);
        // }
        console.log(results.items);
        
        
    });
});
