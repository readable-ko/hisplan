// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world
import { authentication } from 'wix-members';
import wixLocation from 'wix-location';

$w.onReady(function () {
});

$w("#button1").onClick(() => {
    const pattern = /.+[@]handong[.].+/;
    const email = $w("#email").value;
    const testPW = $w("#password").value;
    if(!$w("#email").valid) {
        $w("#email").value = 'Invaild! Use handong email only!';
        $w("#handongvaild").show();
    }
    console.log(testPW);
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
