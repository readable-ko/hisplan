// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world

$w.onReady(function () {
    // Write your JavaScript here

    // To select an element by ID use: $w('#elementID')

    // Click 'Preview' to run your code
    const generateRandomString = (num) => {
      const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      let result = '';
      const charactersLength = characters.length;
      for (let i = 0; i < num; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      return result;
    }
    
    let randomStr = generateRandomString(7);
    console.log(randomStr);
    
    $w('#GroupStudyReport').setFieldValue('randomCode', randomStr)
    .then(() => {
      console.log('Random code saved successfully.');
    })
    .catch((error) => {
      console.error('Error occurred while saving the random code:', error);
    });
});
