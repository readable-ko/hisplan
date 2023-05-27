import { matchGroups } from "backend/groupMatchingModule.jsw";
import wixData from 'wix-data';

$w.onReady(() => {
  
  $w('#dropdown1').onChange(async() => {
    const selectedvalue1 = $w('#dropdown1').value;

    $w('#input1').value = ''

    wixData.query('Course').eq('subject', selectedvalue1).find().then(results => {
      for(let i = 0 ; i < results.length ; i++) {
        console.log('Search Data : ', results.items[i]['courseId']);
        $w('#input1').value += results.items[i]['courseId'];
        if(i != results.length -1) {
          $w('#input1').value += ', '
        }
      }
    })
  });

  // $w('#dropdown2').onChange(async() => {
  //   const selectedvalue2 = $w('#dropdown2').value;
  //   $w('#input2').value = selectedvalue2;
  // });

  // $w('#dropdown3').onChange(async() => {
  //   const selectedvalue3 = $w('#dropdown3').value;
  //   $w('#input3').value = selectedvalue3;
  // });

  $w("#button1").onClick(async () => {
    try{
      wixData.insert("Preference", { 
        first: $w('#dropdown1').value, 
        second: $w('#dropdown2').value, 
        third: $w('#dropdown3').value
  });
    } catch{
      console.error("Failed to update data:");
    }
  });

// Dropbox JavaScript SDK 로드
//   const Dropbox = require('dropbox').Dropbox;
//   const dbx = new Dropbox("#dropdown1");

  // column 정보 가져오기
  // $w('#dropdown1').onClick(async()) => {
  //   const selectedvalue1 = $w('#dropdown1').value;
  //   console.log(selectedvalue1);
  // } 
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
