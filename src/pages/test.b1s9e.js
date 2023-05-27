// Velo API 레퍼런스: https://www.wix.com/velo/reference/api-overview/introduction

$w.onReady(function () {

	$w('#dropdown1').onChange(function () {
		console.log("dropdown chosen");
		const selectedOption = $w('#dropdown1').value;
		// 데이터베이스에 값을 저장
		wixData.insert('Preference', { Friends })
			.catch((error) => {
			console.error(error);
		});
	});

});
