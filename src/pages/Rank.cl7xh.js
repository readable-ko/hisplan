// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world
import wixData from 'wix-data';

$w.onReady(async function () {
  const myDataset = $w('#Group');

  await myDataset.onReady(() => {
    myDataset.forEachItem(($w, itemData, itemIndex) => {
      console.log('Item Index:', itemIndex);
      $w("#rank").text = "RANK #" + itemIndex;
    });
  });
});
