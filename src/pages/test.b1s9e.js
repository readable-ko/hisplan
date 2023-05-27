// Velo API 레퍼런스: https://www.wix.com/velo/reference/api-overview/introduction

$w.onReady(function () {
  $w('#dropdown1').onChange(function () {
    console.log("dropdown chosen");
    const selectedOption = $w('#dropdown1').value;
    $w('#textBox1').value += selectedOption;
    $w('#textBox1').value += " ";
  });
});
