import { getStudentsInfo, matchGroups } from "backend/groupMatchingModule.jsw";

$w.onReady(function () {
  $w("#button").onClick(async () => {
    try {
      const students = await getStudentsInfo();
      console.log(students);
      // const studyGroups = matchGroups(students);
      // console.log(studyGroups);
    } catch (error) {
      console.log(error);
    }
  });
});
