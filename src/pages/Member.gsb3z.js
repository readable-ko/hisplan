// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world
import wixData from "wix-data";
import { currentMember } from "wix-members";
import { getGroup, getGroupMembers } from "backend/data";
let visitorId;
let visitorEmail;
let visitorGroupId;

$w.onReady(async () => {
  
  await setVisitor();

  const groupMembers = await getGroupMembers(visitorEmail);
  
  console.log('groupMem' , groupMembers);

});

async function setVisitor() {
  const memInfo = await currentMember
    .getMember()
    .then((member) => {
      const id = member._id;
      const email = member.loginEmail ;
      return member;
    })
    .catch((error) => {
      console.error(error);
    });
  visitorId = memInfo._id;
  visitorEmail = memInfo.loginEmail;
  //const groupNum = await getStudentGroup(visitorEmail);
  //console.log("gloryko: ", groupNum.items[0]['Group-8'][0].groupId);
  //local.getItem('studentId');
  console.log("visitorId is:", memInfo.loginEmail);
}
