// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world

import wixLocation from 'wix-location';

$w.onReady(function () {
  if (wixUsers.currentUser.loggedIn) {
    wixLocation.to("/Home.c1dmp.js");
  }
});
