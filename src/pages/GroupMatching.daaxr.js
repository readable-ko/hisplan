import { getStudentsInfo, matchGroups } from "backend/groupMatchingModule.jsw";
import wixData from "wix-data";
import wixUsers from "wix-users";
import { currentMember } from "wix-members";

$w.onReady(async () => {

  // 1번 Dropdown 누른 경우
  $w("#dropdownSubject1").onChange(() => {
    const selectedSubject = $w("#dropdownSubject1").value;

    wixData
      .query("Course")
      .eq("subject", selectedSubject)
      .find()
      .then((courses) => {
        const optionsForSelectedSubject = courses.items.map((course) => ({ label: course.instructor, value: course.courseId }));
        $w("#dropdownInstructor1").options = optionsForSelectedSubject;
      });
  });

  // 2번 Dropdown 누른 경우
  $w("#dropdownSubject2").onChange(async () => {
    const selectedSubject = $w("#dropdownSubject2").value;

    wixData
      .query("Course")
      .eq("subject", selectedSubject)
      .find()
      .then((courses) => {
        const optionsForSelectedSubject = courses.items.map((course) => ({ label: course.instructor, value: course.courseId }));
        $w("#dropdownInstructor2").options = optionsForSelectedSubject;
      });
  });

  // 3번 Dropdown 누른 경우
  $w("#dropdownSubject3").onChange(async () => {
    const selectedSubject = $w("#dropdownSubject3").value;

    wixData
      .query("Course")
      .eq("subject", selectedSubject)
      .find()
      .then((courses) => {
        const optionsForSelectedSubject = courses.items.map((course) => ({ label: course.instructor, value: course.courseId }));
        $w("#dropdownInstructor3").options = optionsForSelectedSubject;
      });
  });

  // Friends Dropdown 누른 경우
  $w("#dropdownFriends").onChange(async () => {
    const selectedOption = $w("#dropdownFriends").value;
    $w("#textboxFriends").value += selectedOption + " ";
  });

  let visitorEmail;
  let studentNumber = 0;
  let groupNumber;

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

    await wixData
    .query("Student")
    .eq("email", visitorEmail)
    .find()
    .then((results) => {
      studentNumber = results.items[0]['studentId'];
      console.log(results.items)
      groupNumber = wixData.get('Group-8');
      console.log(groupNumber);
    });
  } 

  await setVisitor();

  console.log(studentNumber);

  const multiReferenceFeild = ['0', '1'];
  const referncedItems = await wixData.get({
    "ids": multiReferenceFeild,
    "suppressAuth": true 
  })
  console.log(referncedItems);

  // Submit 버튼 누른 경우
  $w("#buttonSubmit").onClick(async () => {
    try {
      wixData.insert("Preference", {
        studentId: studentNumber,
        first: $w("#dropdownInstructor1").options[$w("#dropdownInstructor1").selectedIndex].value,
        second: $w("#dropdownInstructor2").options[$w("#dropdownInstructor2").selectedIndex].value,
        third: $w("#dropdownInstructor3").options[$w("#dropdownInstructor3").selectedIndex].value,
        friends: $w("#textboxFriends").value,
      });
    } catch {
      console.error("Failed to update data:"); 
    }
  });

  // Call backend Funciton 버튼 누른 경우
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
