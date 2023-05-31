// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world
$w.onReady(function () {
  $w("#repeater").onItemReady(($w, itemData, index) => {
    $w("#rank").text = 'Rank #' + index +' ';
  });
});

