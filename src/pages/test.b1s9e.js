// Velo API 레퍼런스: https://www.wix.com/velo/reference/api-overview/introduction
import wixData from 'wix-data';


$w.onReady(function () {
  
  // 두 번째 드롭다운 숨기기
  $w('#dropdown3').hide();
  
  // 페이지 로드 시, 과목(subject)을 가져와서 첫 번째 드롭다운에 설정
  wixData.query("Course")
    .find()
    .then(results => {
      const subjects = results.items.map(item => item.subject);
      $w('#dropdown2').options = subjects;
    })
    .catch(error => {
      console.error("Failed to fetch subjects:", error);
    });

  // 첫 번째 드롭다운의 선택이 변경되면 해당 과목의 교수님들을 가져와서 두 번째 드롭다운에 설정
  $w('#dropdown2').onChange(async function () {
    console.log($w('#dropdown2').value);
    
    const selectedSubject = $w('#dropdown2').value;
    try {
      const queryResult = await wixData.query("Course")
        .eq("subject", selectedSubject)
        .find();
      console.log(queryResult);
      
      const instructors = queryResult.items.map(item => item.instructor);
      $w('#dropdown3').options = instructors;
      
      // 두 번째 드롭다운 보이기
      $w('#dropdown3').show();
      
    } catch (error) {
      console.error("Failed to fetch instructors:", error);
    }
  });
});


// $w.onReady(function () {
//   $w('#dropdown1').onChange(function () {
//     console.log("dropdown chosen");
//     const selectedOption = $w('#dropdown1').value;
//     $w('#textBox1').value += selectedOption;
//     $w('#textBox1').value += " ";
//   });
  
//   $w("#button1").onClick(async () => {
//     console.log($w('#textBox1').value);
//     try {
//       // 신규 문서 추가
//       const newDocument = await wixData.insert("Preference", { friends: $w('#textBox1').value });
//       const documentId = newDocument._id; // 신규 문서의 ID 얻기
      
//       // 데이터베이스 업데이트
//       const result = await wixData.update("Preference", documentId, {
//         friends: $w('#textBox1').value
//       });
//       console.log("Data updated successfully:", result);
      
//     } catch (error) {
//       console.error("Failed to update data:", error);
//     }
//   });
  
// });
