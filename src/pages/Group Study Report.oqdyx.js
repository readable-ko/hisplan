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
    console.log(visitorId.id);
    
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

// async function incrementReportCount(visitor) {
//     try {
//       // Group 데이터베이스 컬렉션 이름
// //       const collectionName = 'Group';
      
//       // visitorId에 해당하는 Group 데이터 가져오기
//       const group = await wixData.query('Student')
//         .eq('_id', visitor.id)
//         .find();
      
//       const group = await wixData.query(collectionName)
//         .eq('_id', visitor.id)
//         .find();
        
//       if (group.items.length > 0) {
//         const groupItem = group.items[0];
        
//         // reportCount 값을 1 증가시키고 업데이트
//         groupItem.reportCount += 1;
//         await wixData.update(collectionName, groupItem);
        
//         console.log('Report count incremented.');
//       } else {
//         console.error('Group data not found.');
//       }
//     } catch (error) {
//       console.error('Error incrementing report count:', error);
//     }
//   }
