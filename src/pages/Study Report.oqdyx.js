// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world
// import { getGroup, getGroupMembers, getStudentGroup, increaseGroupReport, getStudentID } from "backend/data";
import { getGroup, getGroupMembers, getProfileImage } from "backend/data";
import wixWindow from "wix-window";
import wixData from "wix-data";
import { currentMember } from "wix-members";

let visitorId;
let visitorEmail;
//let groupNum;

$w.onReady(async function () {
  // Write your JavaScript here

  // To select an element by ID use: $w('#elementID')
  await setVisitor();
  
  const groupMembers = await getGroupMembers(visitorEmail);
  let members = groupMembers.items[0].members;
  let n_members = members.length;

  const checkboxOptions = [];

  for (let i = 0; i < n_members; i++) {
    const member = members[i];

    const checkboxOption = {
      label: member.name, // 체크박스 옵션에 표시할 멤버 이름
      value: member.id, // 체크박스 옵션의 값으로 멤버 ID를 사용 (선택한 멤버를 구분하기 위해)
    };

    checkboxOptions.push(checkboxOption); // 체크박스 옵션 추가
  }

  $w("#checkboxGroup1").options = checkboxOptions;


   console.log('checkbox done');
  

  $w("#button3").onClick(() => {
    let randomStr = generateRandomString(6);
    console.log(randomStr);

    // Set the value of the textbox with the random code
    $w("#generateCode").value = randomStr;
  });
    
  $w("#button4").onClick(() => {
//     setVisitor();
    let randomStr = generateRandomString(6);
    console.log(randomStr);
    console.log(visitorId);
    updateReport();
    //console.log("gloryko: ", groupNum);
  });
});

async function updateReport() {
  await setVisitor();
  await increaseGroupReport(visitorEmail);
}

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
