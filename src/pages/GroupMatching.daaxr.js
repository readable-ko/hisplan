import { matchGroups } from "backend/groupMatchingModule.jsw";

$w.onReady(() => {
  
  const myDropdown = document.getElementById('#dropdown1');
  myDropdown.addEventListener('change', function() {
    const selectedValue = myDropdown.value;
    
    console.log('Selected Value : ', selectedValue);
  });
                                             
//   // Dropbox JavaScript SDK 로드
//   const Dropbox = require('dropbox').Dropbox;
//   const dbx = new Dropbox("#dropdown1");

//   // column 정보 가져오기
//   dbx.filesListFolder("Course")
//     .then(response => {
//       const columns = response.entries; // column 정보를 가져옵니다.
  
//       // 두 개의 column 정보를 합치기
//       const combinedColumns = columns.map(column => {
//         return column.subject + ' ' + column.courseId;
//       });

//       // 합쳐진 column 정보를 표시
//       combinedColumns.forEach(column => {
//         console.log(column);
//       });
//     })
//     .catch(error => {
//       console.error(error);
//     });
  
  $w("#button").onClick(async () => {
    try {
      const studyGroups = await matchGroups();
      console.log(studyGroups);
    } catch (error) {
      console.error(error.message);
    }
  });
});
