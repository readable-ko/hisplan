// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world

import wixUsers from 'wix-users';
import wixLocation from 'wix-location';

$w.onReady(function () {
  wixUsers.onLogin(function (user) {
    wixLocation.to("/Home");
  });
});

