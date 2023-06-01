// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world
import wixData from "wix-data";
import { currentMember } from "wix-members";

let visitorEmail;
let visitorGroupId;

$w.onReady(async () => {
  $w("#repeater1").data = [];
  await setVisitor();

  const itemlist = [];

  await wixData
    .query("Student")
    .include("Group-8")
    .find()
    .then((results) => {
        for(let i = 0 ; i < 22 ; i++) {
          if(results.items[i]['email'] == visitorEmail){
            // console.log(results.items[i]['email']);
            // console.log(results.items[i]['name']);
            // console.log(results.items[i]['Group-8'][0]['groupId']);
            visitorGroupId = results.items[i]['Group-8'][0]['groupId']
          }
        }

        for(let i = 0 ; i < 22 ; i++) {
          if(results.items[i]['Group-8'][0]['groupId'] == visitorGroupId) {
            console.log(results.items[i]['name']);
            $w('text4').value = results.items[i]['name'];

            let tempName = results.items[i]['name'];
            let tempId = results.items[i]['studentId'];
            let item = {tempName, tempId};

            console.log(tempName);
            console.log(tempId);
            itemlist.push(item);

            // console.log(results.items[i]);
            // $w("#repeater1").data = results.items[i];
          }
        }
    });

    console.log(itemlist);

    $w("#repeater1").onItemReady(($item, itemData) => {
      console.log(itemData.tempName);
      $item('#text4').text = itemData.tempName;
    })


});

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
  visitorEmail = memInfo;
  // console.log(visitorEmail);
}