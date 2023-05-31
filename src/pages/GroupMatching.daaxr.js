import { matchGroups } from "backend/groupMatchingModule.jsw";
import wixData from "wix-data";
import wixUsers from "wix-users";
import { currentMember } from "wix-members";

$w.onReady(() => {
  // 어느 페이지에서든 자신의 학번을 불러올 수 있는 코드
  // let userId;
  // wixUsers.currentUser['id']
  // console.log(wixUsers.currentUser['id']);
  // console.log('67561d24-e9f2-4d04-a048-e67d44ddd2a9')

  // wixData.query('PrivateMembersData').eq('_id', wixUsers.currentUser['id']).find().then(results => {
  //   console.log(results)
  //   console.log(results.items[0]['studentId']); 
  //   userId = results.items[0]['studentId'];
  //   $w('#input1').value = userId;
  // })

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

    console.log("visitorEmail is:", visitorEmail);
  }


  // 1번 Drop Down 누른 경우
  $w("#dropdown1").onChange(async () => {
    const selectedvalue1 = $w("#dropdown1").value;

    wixData
      .query("Course")
      .eq("subject", selectedvalue1)
      .find()
      .then((results) => {
        let optionvalue = results.items.map((subject) => ({ label: subject.courseId, value: subject._id }));
        $w("#dropdown4").options = optionvalue;
      });
  });

  // 2번 Drop Down 누른 경우
  $w("#dropdown2").onChange(async () => {
    const selectedvalue2 = $w("#dropdown2").value;

    wixData
      .query("Course")
      .eq("subject", selectedvalue2)
      .find()
      .then((results) => {
        let optionvalue = results.items.map((subject) => ({ label: subject.courseId, value: subject._id }));
        $w("#dropdown5").options = optionvalue;
      });
  });

  // 3번 Drop Down 누른 경우
  $w("#dropdown3").onChange(async () => {
    const selectedvalue3 = $w("#dropdown3").value;

    wixData
      .query("Course")
      .eq("subject", selectedvalue3)
      .find()
      .then((results) => {
        let optionvalue = results.items.map((subject) => ({ label: subject.courseId, value: subject._id }));
        $w("#dropdown6").options = optionvalue;
      });
  });
  
  $w('#dropdownFriends').onChange(function () {
    console.log("friends chosen");
    const selectedOption = $w('#dropdownFriends').value;
    $w('#textboxFriends').value += selectedOption;
    $w('#textboxFriends').value += " ";
  });

  // Submit 버튼 누른 경우
  $w("#button1").onClick(async () => {
    try {
      wixData.insert("Preference", {
        student: userId,
        first: $w("#dropdown4").options[$w("#dropdown4").selectedIndex].label,
        second: $w("#dropdown5").options[$w("#dropdown5").selectedIndex].label,
        third: $w("#dropdown6").options[$w("#dropdown6").selectedIndex].label,
        friends: $w('#textboxFriends').value
      });
    } catch {
      console.error("Failed to update data:");
    }
  });

  // Call backend Funciton 누른 경우
  $w("#button").onClick(async () => {
    try {
      const studyGroups = await matchGroups();
      console.log(studyGroups);
    } catch (error) {
      console.error(error.message);
    }
  });
});
