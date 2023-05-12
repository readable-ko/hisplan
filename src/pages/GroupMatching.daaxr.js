import wixData from "wix-data";
import { getStudentInfo, groupMatching } from "backend/groupMatchingModule.jsw";
import { collections } from "wix-stores.v2";

$w.onReady(function () {
  $w("#button").onClick(async () => {
    await wixData
      .query("Student")
      .find()
      .then((results) => {
        if (results.items.length > 0) {
          console.log(results.items);
          // let students = getStudentInfo(results.items);
          // console.log(students);
          // let studyGroups = groupMatching(students);
          // console.log(studyGroups);
        } else {
          $w("#responseText").text = "No results";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
