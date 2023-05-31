import wixData from "wix-data";
import { currentMember } from "wix-members";
import wixLocation from "wix-location";

$w.onReady(() => {
  // let firstEmail;
  // wixData.query('LoginedEmail').find().then(results => {
  //     console.log(results.items[0]['sharedemail']);
  //     firstEmail = results.items[0]['sharedemail'];
  // });
  // $w("#button1").onClick(async () => {
  //     try {
  //         wixData.insert("Student", {
  //             name: $w('#input1').value,
  //             studentId: $w('#input2').value
  //             // email: firstEmail
  //         });
  //     } catch (error) {
  //         console.error(error.message);
  //     }
  // });

  $w("#button2").onClick(async () => {
    async function setVisitor() {
      const memInfo = await currentMember
        .getMember()
        .then((member) => {
          const email = member.loginEmail;
          return email;
        })
        .catch((error) => {
          console.error(error);
        });
      const visitorEmail = memInfo;
      console.log("visitorEmail is:", visitorEmail);
      console.log("Student ID : ", visitorEmail.slice(0, 8));

      wixData.insert("Student", {
        email: visitorEmail,
        name: $w("#input1").value,
        studentId: visitorEmail.slice(0, 8),
      });
    }
    setVisitor();
  });
});
