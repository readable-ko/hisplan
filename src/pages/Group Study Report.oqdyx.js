// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world
import wixWindow from "wix-window";
import wixData from "wix-data";
import { currentMember } from "wix-members";

let visitorId;

$w.onReady(function () {
  // Write your JavaScript here

  // To select an element by ID use: $w('#elementID')
  setVisitor();
  

  // Click 'Preview' to run your code
  const generateRandomString = (num) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };

  $w("#button3").onClick(() => {
    let randomStr = generateRandomString(6);
    console.log(randomStr);

    // Set the value of the textbox with the random code
    $w("#generateCode").value = randomStr;
  });
    
  $w("#button4").onClick(() => {
    let randomStr = generateRandomString(6);
    console.log(randomStr);
    console.log(visitorId);
    
    const person = await wixData.query('Group')
      .eq('_id', visitor)
      .find();

    console.log('mem = ', group.items.length);
  });
  
});

async function setVisitor() {
  const memInfo = await currentMember
    .getMember()
    .then((member) => {
      const id = member._id;
      const fullName = `${member.contactDetails.firstName} ${member.contactDetails.lastName}`;
      return id;
    })
    .catch((error) => {
      console.error(error);
    });
  visitorId = memInfo;
 
  //local.getItem('studentId');
  console.log("visitorId is:", visitorId);
}
