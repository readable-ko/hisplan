// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world

// $w.onReady(function () {
    // Write your JavaScript here

    // To select an element by ID use: $w('#elementID')

    // Click 'Preview' to run your code
// });

import wixUsers from 'wix-users';
import wixLocation from 'wix-location';

$w.onReady(function () {
  wixUsers.register.onSuccess(function (user) {
    wixLocation.to("https://www.naver.com/");
  });
});
