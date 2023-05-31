// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world
import wixData from "wix-data";
import { currentMember } from "wix-members";

let visitorEmail;
let visitorGroupId;

$w.onReady(async () => {
  await setVisitor();

  await wixData
    .query("Student")
    .include("Group-8")
    .find()
    .then((results) => {
        for(let i = 0 ; i < 22 ; i++) {
          if(results.items[i]['email'] == visitorEmail){
            // console.log(results.items[i]['email']);
            // console.log(results.items[i]['name']);
            // console.log(results.items[i]['Group-8'][0]['groupId']);
            visitorGroupId = results.items[i]['Group-8'][0]['groupId']
          }
        }

        for(let i = 0 ; i < 22 ; i++) {
          if(results.items[i]['Group-8'][0]['groupId'] == visitorGroupId) {
            console.log(results.items[i]['name']);
          }
        }
    });
});

async function setVisitor() {
  const memInfo = await currentMember
    .getMember()
    .then((member) => {
      const email = member.loginEmail;
      return email;
    })
    .catch((error) => {
      console.error(error);
    });
  visitorEmail = memInfo;
  // console.log(visitorEmail);
}