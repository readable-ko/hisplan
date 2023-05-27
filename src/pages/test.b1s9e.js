// Velo API 레퍼런스: https://www.wix.com/velo/reference/api-overview/introduction
import wixData from 'wix-data';

let selectedOptions = [];

$w.onReady(function () {
  $w('#dropdown1').onChange(function () {
    console.log("dropdown chosen");
    const selectedOption = $w('#dropdown1').value;
    $w('#textBox1').value += selectedOption;
    $w('#textBox1').value += " ";
  });
  
  $w("#button1").onClick(async () => {
    console.log($w('#textBox1').value);
    try {
      // 신규 문서 추가
      const newDocument = await wixData.insert("Preference", { friends: $w('#textBox1').value });
      const documentId = newDocument._id; // 신규 문서의 ID 얻기
      
      // 데이터베이스 업데이트
      const result = await wixData.update("Preference", documentId, {
        friends: $w('#textBox1').value
      });
      console.log("Data updated successfully:", result);
      
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  });
  
});
