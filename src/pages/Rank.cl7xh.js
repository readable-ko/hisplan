// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world
import wixData from 'wix-data';

$w.onReady( function () {
  const myDataset = $w('#Group');

  myDataset.onReady(() => {
    $w("repeater").forEachItem(($item, itemData, itemIndex) => {
      console.log('Item Index:', itemIndex);
      $w("#rank").text = "RANK #";
    });
  });
});
