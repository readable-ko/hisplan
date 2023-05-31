import { getStudentsInfo, matchGroups } from "backend/groupMatchingModule.jsw";
import wixData from "wix-data";
import wixUsers from "wix-users";
import { currentMember } from "wix-members";

$w.onReady(() => {
  // 어느 페이지에서든 자신의 학번을 불러올 수 있는 코드
  let userId;
  wixUsers.currentUser["id"];
  // console.log(wixUsers.currentUser["id"]);
  // console.log("67561d24-e9f2-4d04-a048-e67d44ddd2a9");

  wixData
    .query("PrivateMembersData")
    .eq("_id", wixUsers.currentUser["id"])
    .find()
    .then((results) => {
      console.log(results);
      console.log(results.items[0]["studentId"]);
      userId = results.items[0]["studentId"];
      $w("#input1").value = userId;
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
    const visitorEmail = memInfo;
    console.log("visitorEmail is:", visitorEmail);
  }

  // 1번 Drop Down 누른 경우
  $w("#dropdownSubject1").onChange(async () => {
    const selectedValue1 = $w("#dropdownSubject1").value;

    wixData
      .query("Course")
      .eq("subject", selectedValue1)
      .find()
      .then((results) => {
        const optionValues = results.items.map((subject) => ({ label: subject.instructor, value: subject.courseId }));
        $w("#dropdownInstructor1").options = optionValues;
      });
  });

  // 2번 Drop Down 누른 경우
  $w("#dropdownSubject2").onChange(async () => {
    const selectedValue2 = $w("#dropdownSubject2").value;

    wixData
      .query("Course")
      .eq("subject", selectedValue2)
      .find()
      .then((results) => {
        const optionValues = results.items.map((subject) => ({ label: subject.instructor, value: subject.courseId }));
        $w("#dropdownInstructor2").options = optionValues;
      });
  });

  // 3번 Drop Down 누른 경우
  $w("#dropdownSubject3").onChange(async () => {
    const selectedValue3 = $w("#dropdownSubject3").value;

    wixData
      .query("Course")
      .eq("subject", selectedValue3)
      .find()
      .then((results) => {
        const optionValues = results.items.map((subject) => ({ label: subject.instructor, value: subject.courseId }));
        $w("#dropdownInstructor3").options = optionValues;
      });
  });

  $w("#dropdownFriends").onChange(async () => {
    console.log("friends chosen");
    const selectedOption = $w("#dropdownFriends").value;
    $w("#textboxFriends").value += selectedOption;
    $w("#textboxFriends").value += " ";
  });

  // Submit 버튼 누른 경우
  $w("#buttonSubmit").onClick(async () => {
    try {
      wixData.insert("Preference", {
        studentId: userId,
        first: $w("#dropdownInstructor1").options[$w("#dropdownInstructor1").selectedIndex].value,
        second: $w("#dropdownInstructor2").options[$w("#dropdownInstructor2").selectedIndex].value,
        third: $w("#dropdownInstructor3").options[$w("#dropdownInstructor3").selectedIndex].value,
      });
    } catch {
      console.error("Failed to update data:");
    }
  });

  // Call backend Funciton 누른 경우
  $w("#buttonMatchGroup").onClick(async () => {
    try {
      const studentsInfo = await getStudentsInfo();
      console.log(studentsInfo);
      // const studyGroups = await matchGroups();
      // console.log(studyGroups);
    } catch (error) {
      console.error(error.message);
    }
  });
});
