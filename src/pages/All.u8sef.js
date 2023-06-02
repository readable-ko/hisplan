// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world

import wixUsers from "wix-users";
import wixLocation from "wix-location";
import { authentication } from "wix-members";


let interval;
let timeInterval = 300;
let typeStr = "“\
In his heart a man plans his course, but the LORD determines his steps.\
Proverb 16:9\
”";
let typeIdx;
let htmlStr = '';
let displayStr;

$w.onReady(async () => {
  const isLoggedIn = authentication.loggedIn();
  
  if (htmlStr.length === 0) {	// just get the original html text the first time
		htmlStr = $w("#text3").html;
	}
	$w("#text3").html = ''; // don't show the original text
	let strPieces = htmlStr.split("!##!");

	displayStr = ''; // init string that we will "type" to
	typeIdx = 0; // start at beginning of string we want to "type"

	// Declare an interval function that will run in the background.
	// This function will be triggered by the defined timeInterval.
	interval = setInterval(function () {
		// Get next char from string to be typed and concatenate to the display string.
		displayStr = displayStr + typeStr[typeIdx++];
		// Make a sandwich with the display string in between the original html pieces.
		$w("#text3").html = strPieces[0] + displayStr + strPieces[1];
		// Stop the interval from running when we get to the last character to by "typed".
		if (typeIdx === typeStr.length) clearInterval(interval);
	}, timeInterval);
   
  
  
  wixUsers.onLogin(function (user) {
    wixLocation.to("https://seohwee.editorx.io/hisplan/home");
  });

  if (isLoggedIn) wixLocation.to("https://seohwee.editorx.io/hisplan/home");
});
