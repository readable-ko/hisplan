import wixData from "wix-data";
// import { getStudentInfo, groupMatching } from "backend/groupMatchingModule.jsw";

$w.onReady(function () {
  $w("#button").onClick(async () => {
    await wixData
      .query("Student")
      .find()
      .then((results) => {
        if (results.items.length > 0) {
          // let students =
          // getStudentInfo(results.items);
          // console.log(students);
          // let studyGroups = groupMatching(students);
          // console.log(studyGroups);
        } else {
          $w("#responseText").text = "No students";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

function getStudentInfo(items) {
  // let students = [];

  for (let i = 0; i < items.length; ++i) {
    wixData
      .query("Preference")
      .eq("student", items[i]._id)
      .find()
      .then((results) => {
        if (results.items.length > 0) {
          let preferences = results.items;
        } else {
          $w("#responseText").text = "No preferences";
        }
      });

    // let student = {
    //   id: items[i].studentId,
    //   friends: preference.friends,
    //   first: preference.first,
    //   second: preference.second,
    //   third: preference.third,
    // };
    // students.push(student);
  }

  // return students;
}
