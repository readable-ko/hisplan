// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world
import { authentication } from "wix-members";
import wixLocation from "wix-location";
import wixWindow from "wix-window";
import wixData from 'wix-data';

$w.onReady(function () {
  $w("#button1").onClick(() => {
    if (!$w("#email").valid) 
    {
      $w("#email").value = "";
      wixWindow.openLightbox("InvaildBox");
    } 
    else if (!$w("#password").valid) 
    {
      wixWindow.openLightbox("passwordBox");
    } 
    else 
    {
      const email = $w("#email").value;
      const pw = $w("#password").value;

      // 가입할 때 적은 Email을 DB에 저장
      // const query = wixData.query('LoginedEmail');
      // wixData.bulkRemove(query)
      //   .then(() => {
      //     console.log('데이터베이스에서 항목을 성공적으로 지웠습니다.');
      //   })
      //   .catch((err) => {
      //     console.error('데이터베이스에서 항목을 지우는 도중 오류가 발생했습니다:', err);
      // });
      // wixData.insert("LoginedEmail", { sharedemail: email });

      authentication.register(email, pw).then((registResult) => {
        const status = registResult.status;
        if (status === "ACTIVE") 
        {
          wixLocation.to("https://seohwee.editorx.io/hisplan/info");
        }
      });
    }
  });
});

//     authentication.register(email, password, options)
//         .then((registrationResult) => {
//         const status = registrationResult.status;

//         if (status === "PENDING") {
//             // When the site is configured for manual approval,
//             // status is "PENDING" and approvalToken is returned.
//             const approvalToken = registrationResult.approvalToken;
//             console.log('Member registered and waiting for approval:', registrationResult);
//         } else {
//             // When the site is configured for automatic approval,
//             // status is "ACTIVE" and the member is approved and logged in.
//             // To prevent logging in the member automatically,
//             // use the backendend function: wix-members-backend.authentication.register()
//             console.log('Member registered and logged in:', registrationResult);
//         }
//     })
//         .catch((error) => {
//         console.error(error);
//     });
