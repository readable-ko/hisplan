import { matchGroups } from "backend/groupMatchingModule.jsw";
import wixData from 'wix-data';
import wixUsers from 'wix-users';

$w.onReady(() => {

  console.log(wixUsers.currentUser['id']);
  
  // 1번 Drop Down 누른 경우
  $w('#dropdown1').onChange(async() => {
    const selectedvalue1 = $w('#dropdown1').value;

    wixData.query('Course').eq('subject', selectedvalue1).find().then(results => {
      let optionvalue = results.items.map(subject => ({label : subject.courseId, value : subject._id}));
      $w('#dropdown4').options = optionvalue;
    })
  });

  // 2번 Drop Down 누른 경우
  $w('#dropdown2').onChange(async() => {
    const selectedvalue2 = $w('#dropdown2').value;

    wixData.query('Course').eq('subject', selectedvalue2).find().then(results => {
      let optionvalue = results.items.map(subject => ({label : subject.courseId, value : subject._id}));
      $w('#dropdown5').options = optionvalue;
    })
  });

  // 3번 Drop Down 누른 경우
  $w('#dropdown3').onChange(async() => {
    const selectedvalue3 = $w('#dropdown3').value;

    wixData.query('Course').eq('subject', selectedvalue3).find().then(results => {
      let optionvalue = results.items.map(subject => ({label : subject.courseId, value : subject._id}));
      $w('#dropdown6').options = optionvalue;
    })
  });

  // Submit 버튼 누른 경우
  $w("#button1").onClick(async () => {
    try{
      wixData.insert("Preference", { 
        first: $w('#dropdown4').options[$w('#dropdown4').selectedIndex].label, 
        second: $w('#dropdown5').options[$w('#dropdown5').selectedIndex].label, 
        third: $w('#dropdown6').options[$w('#dropdown6').selectedIndex].label
  });
    } catch{
      console.error("Failed to update data:");
    }
  });

  // Call backend Funciton 누른 경우
  $w("#button").onClick(async () => {
    try {
      const studyGroups = await matchGroups();
      console.log(studyGroups);
    } catch (error) {
      console.error(error.message);
    }
  });
});
