import { sql } from "backend/exposer.jsw";
// import { getStudentInfo, groupMatching } from "backend/groupMatchingModule.jsw";

$w.onReady(function () {
  $w("#button").onClick(async () => {
    try {
      const results = await sql("SELECT * FROM Student");
      console.log(results.payload.data);
    } catch (error) {
      console.log(error);
    }
  });
});

function getStudentInfo(items) {}
