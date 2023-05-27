// Velo API 레퍼런스: https://www.wix.com/velo/reference/api-overview/introduction
import wixData from 'wix-data';

let selectedOptions = [];

$w.onReady(function () {
  $w('#dropdown1').onChange(function () {
    console.log("dropdown chosen");
    const selectedOption = $w('#dropdown1').value;
    $w('#textBox1').value += selectedOption;
    $w('#textBox1').value += " ";
    
    // 선택한 옵션을 배열에 추가
    selectedOptions.push( selectedOption );
  });
  
  $w("#button1").onClick(async () => {
    console.log(selectedOptions);
    try {
      // 신규 문서 추가
      const newDocument = await wixData.insert("Preference", { test1: selectedOptions });
      const documentId = newDocument._id; // 신규 문서의 ID 얻기
      
      // 데이터베이스 업데이트
      const result = await wixData.update("Preference", documentId, {
        test1: selectedOptions
      });
      console.log("Data updated successfully:", result);
      
      // 배열 초기화
      selectedOptions = [];
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  });
  
});
