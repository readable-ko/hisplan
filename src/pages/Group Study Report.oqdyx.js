// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world
import wixWindow from 'wix-window';

$w.onReady(function () {
    // Write your JavaScript here

    // To select an element by ID use: $w('#elementID')

    // Click 'Preview' to run your code
    const generateRandomString = (num) => {
      const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      const charactersLength = characters.length;
      for (let i = 0; i < num; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      return result;
    }
    
    $w('#button3').onClick(() => {
        let randomStr = generateRandomString(6);
        console.log(randomStr);

        // Set the value of the textbox with the random code
        $w('#generateCode').value = randomStr;

        // Open the lightbox
        //$w('#randomCodeLightBox').show();
        //wixWindow.openLightbox('randomCodeLightBox');        
    });
});
