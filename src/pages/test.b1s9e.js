// Velo API 레퍼런스: https://www.wix.com/velo/reference/api-overview/introduction

// $w.onReady(function () {

// 	$w('#dropdown1').onChange(function () {
// 		console.log("dropdown chosen");
// 		const selectedOption = $w('#dropdown1').value;
// 		// 데이터베이스에 값을 저장
// 		wixData.insert('Preference', { friends })
// 			.catch((error) => {
// 			console.error(error);
// 		});
// 	});

// });

$w.onReady(function () {
  $w('#dropdown1').onChange(function () {
    console.log("dropdown chosen");
    const selectedOption = $w('#dropdown1').value;

    // 데이터베이스에서 Preference 문서 가져오기
    wixData.get('Preference', 'Preference')
      .then((result) => {
        const friends = result.friends || []; // 기존 friends 배열 또는 빈 배열

        // 선택한 옵션 추가
        friends.push(selectedOption);

        // 데이터베이스 업데이트
        return wixData.update('Preference', 'Preference', { friends });
      })
      .catch((error) => {
        console.error(error);
      });
  });
});
