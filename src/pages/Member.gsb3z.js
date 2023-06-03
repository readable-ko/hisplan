// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world
import wixData from "wix-data";
import { currentMember } from "wix-members";
import { getGroup, getGroupMembers, getProfileImage } from "backend/data";
let visitorId;
let visitorEmail;
let visitorGroupId;




$w("#repeater1").onItemReady( async ($w, itemData, index) => {
  // Repeater의 각 아이템에서 text1의 정보를 가져와서 출력

  const name = itemData.name;  // text1 필드의 값을 가져옴
  const studentId = itemData.studentId;  // text1 필드의 값을 가져옴
  const email = itemData.email;

  let img = await getProfileImage(email);

  $w("#text3").text = name;  // text1 요소에 가져온 값을 설정하여 출력
  $w("#text4").text = studentId;  // text1 요소에 가져온 값을 설정하여 출력
  $w("#text6").text = email;  // text1 요소에 가져온 값을 설정하여 출력
  $w("#imageX3").src = img;

//     console.log(name, studentId, email);  // 콘솔에 출력하거나 원하는 작업 수행
});



$w.onReady(async () => {
  $w("#text3").text = '';  // text1 요소에 가져온 값을 설정하여 출력
  $w("#text4").text = '';  // text1 요소에 가져온 값을 설정하여 출력
  $w("#text6").text = '';  // text1 요소에 가져온 값을 설정하여 출력
  $w("#imageX3").src = '';
  await setVisitor();
  const groupMembers = await getGroupMembers(visitorEmail);
  let members = groupMembers.items[0].members;
  let n_members = members.length;
  
  console.log('groupMem' , groupMembers);
  
  $w('#repeater1').data = members;
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
