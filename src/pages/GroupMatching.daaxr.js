import { matchGroups } from "backend/groupMatchingModule.jsw";

$w.onReady(() => {
  
  $w('#dropdown1').onChange(async() => {
    const selectedvalue1 = $w('#dropdown1').value;
    $w('#input1').value = selectedvalue1;
    const selectedvalue2 = $w('#dropdown2').value;
    $w('#input2').value = selectedvalue2;
    const selectedvalue3 = $w('#dropdown3').value;
    $w('#input3').value = selectedvalue3;
    console.log(selectedvalue1);
  });
  
//   $w('#dropdown1').onChange(async() => {
//     let hasStates = false;
//     const selectedCourse = $w('#dropdown1').value;
//   });
  
//   if (countryStates[selectedCountry]) {
//       hasStates = true;
//       $w('#stateDropdown').options = countryStates[selectedCountry];
//   } else {
//       const results = await wixData.query('States')
//           .eq('country', selectedCountry)
//           .ascending('title')
//           .find()

// if (results.length > 0) {
//   hasStates = true;
//   const stateOptions = results.items.map(state => ({ label: state.title, value: state._id }));
//   $w('#stateDropdown').options = stateOptions;
//   countryStates[selectedCountry] = stateOptions;
// }    
//   }

//   if (hasStates) {
//       $w('#stateDropdown').selectedIndex = undefined;
//       $w('#stateDropdown').expand();
//       $w('#searchButton').disable();
//   } else {
// $w('#stateDropdown').collapse();
//       $w('#searchButton').enable();
//   }



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
