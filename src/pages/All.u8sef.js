// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world

import wixUsers from "wix-users";
import wixLocation from "wix-location";
import { authentication } from "wix-members";

$w.onReady(async () => {
  const isLoggedIn = authentication.loggedIn();
  wixUsers.onLogin(function (user) {
    wixLocation.to("https://seohwee.editorx.io/hisplan/home");
  });

  if (isLoggedIn) wixLocation.to("https://seohwee.editorx.io/hisplan/home");
});
