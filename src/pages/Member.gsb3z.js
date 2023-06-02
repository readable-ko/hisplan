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
   
  let members = groupMembers.items[0].members;
  let n_members = members.length;
  
  console.log('len ', n_members);
  
  $w("#repeater1").onItemReady(($w, itemData, index) => {
    // Repeater의 각 아이템에서 text1의 정보를 가져와서 출력
    
    const name = members.name;  // text1 필드의 값을 가져옴
    const studentId = members.studentId;  // text1 필드의 값을 가져옴
    
    $w("#text3").text = name;  // text1 요소에 가져온 값을 설정하여 출력
    $w("#text4").text = studentId;  // text1 요소에 가져온 값을 설정하여 출력
    
    console.log(name, studentId);  // 콘솔에 출력하거나 원하는 작업 수행
  });
  

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
