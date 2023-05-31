// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world
import wixData from "wix-data";
import { currentMember } from "wix-members";

$w.onReady(async () => {

  // async function setVisitor() {
  //   const memInfo = await currentMember
  //       .getMember()
  //       .then((member) => {
  //         const email = member.loginEmail;
  //         return email;
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   visitorEmail = memInfo;

  //   console.log(visitorEmail);
  // }

  // await setVisitor();

  await wixData
    .query("Student")
    .include("Group-8")
    .find()
    .then((results) => {
      console.log(results.items[0]['Group-8'])
      console.log(results.items[0]['email'])
        // for(let i = 0 ; i < 22 ; i++) {
        //   if(results.items[i]['Group-8']['email'] == visitorEmail){
        //     console.log(results.items[i]['Group-8']['email']);
        //     console.log(results.items[i]['Group-8']['name']);
        //     console.log(results.items[i]['Group-8'][0]['groupId']);
        //   }
        // }
    });
});
