import { getStudentsInfo, matchGroups } from "backend/groupMatchingModule.jsw";
import wixData from "wix-data";
import wixUsers from "wix-users";
import { currentMember } from "wix-members";

$w.onReady(() => {
  // 어느 페이지에서든 자신의 학번을 불러올 수 있는 코드
  // let userId;

  // wixData
  //   .query("PrivateMembersData")
  //   .eq("_id", wixUsers.currentUser["id"])
  //   .find()
  //   .then((results) => {
  //     console.log(results);
  //     console.log(results.items[0]["studentId"]);
  //     userId = results.items[0]["studentId"];
  //     // $w("#input1").value = userId;
  //   });

  // async function setVisitor() {
  //   const memInfo = await currentMember
  //     .getMember()
  //     .then((member) => {
  //       const email = member.loginEmail;
  //       return email;
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });

  //   const visitorEmail = memInfo;
  //   console.log("visitorEmail is:", visitorEmail);
  // }

  // setVisitor();

  // 1번 Dropdown 누른 경우
  $w("#dropdownSubject1").onChange(async () => {
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

  function setVisitor() {
    const memInfo = currentMember
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

    wixData
    .query("Student")
    .eq("email", visitorEmail)
    .find()
    .then((results) => {
      studentNumber = results.items[0]['studentId'];
      console.log(studentNumber);
      console.log(results.items[0]['studentId']);
      
    });
    console.log(studentNumber);
  } 

  setVisitor();

  console.log(studentNumber);

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
