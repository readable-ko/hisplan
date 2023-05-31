// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world
import wixWindow from "wix-window";
import wixData from "wix-data";
import { currentMember } from "wix-members";

let visitorId;

$w.onReady(function () {
  // Write your JavaScript here

  // To select an element by ID use: $w('#elementID')
  setVisitor();
  

  // Click 'Preview' to run your code
  const generateRandomString = (num) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };

  $w("#button3").onClick(() => {
    let randomStr = generateRandomString(6);
    console.log(randomStr);

    // Set the value of the textbox with the random code
    $w("#generateCode").value = randomStr;

    // Open the lightbox
    //$w('#randomCodeLightBox').show();
    //wixWindow.openLightbox('randomCodeLightBox');
  });

  //     let toInsert = {
  //       "RandomCode":   randomStr
  //     };

  //     $ww('#submitButton').onClick(() => {
  //         wixData.insert("GroupStudyReport", toInsert)
  //           .then((results) => {
  //             let item = results; //see item below
  //           })
  //           .catch((err) => {
  //             let errorMsg = err;
  //           });
  //     });
  
  $w("submitButton").onClick(() => {
    const formData = {
      // 여기에 폼 필드에 해당하는 데이터를 수집하는 코드 작성
      // 예시: name 필드의 값을 가져오는 경우
      name: $w('#nameInput').value,
    };

    // 데이터 유효성 검사 등 필요한 처리를 수행
    // ...

    // Group 데이터베이스 컬렉션 이름
    const collectionName = 'Group';

    // 데이터 저장 및 rank 계산
    wixData.query(collectionName)
      .descending('reportCount')
      .find()
      .then(results => {
        let rank = 1;
        const promises = [];

        for (let i = 0; i < results.items.length; i++) {
          const item = results.items[i];
          item.rank = rank;
          rank++;

          promises.push(wixData.update(collectionName, item));
        }

        return Promise.all(promises);
      })
      .then(() => {
        console.log('Rank calculation completed.');
        // 성공적으로 처리된 후에 수행할 작업을 여기에 추가
      })
      .catch(error => {
        console.error('Error calculating and saving rank:', error);
        // 오류 발생 시 처리할 작업을 여기에 추가
      });
  });
  
});

async function setVisitor() {
  const memInfo = await currentMember
    .getMember()
    .then((member) => {
      const id = member._id;
      const fullName = `${member.contactDetails.firstName} ${member.contactDetails.lastName}`;
      return id;
    })
    .catch((error) => {
      console.error(error);
    });
  visitorId = memInfo;
  //local.getItem('studentId');
  console.log("visitorId is:", visitorId);
}
