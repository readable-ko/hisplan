import { matchGroups } from "backend/groupMatchingModule.jsw";
import wixData from 'wix-data';

$w.onReady(() => {
  
  $w('#dropdown1').onChange(async() => {
    const selectedvalue1 = $w('#dropdown1').value;

    wixData.query('Course').eq('subject', selectedvalue1).find().then(results => {
      let optionvalue = results.items.map(subject => ({label : subject.courseId, value : subject._id}));
      $w('#dropdown4').options = optionvalue;
    })
  });

  $w('#dropdown2').onChange(async() => {
    const selectedvalue2 = $w('#dropdown2').value;

    wixData.query('Course').eq('subject', selectedvalue2).find().then(results => {
      let optionvalue = results.items.map(subject => ({label : subject.courseId, value : subject._id}));
      $w('#dropdown5').options = optionvalue;
    })
  });

  $w('#dropdown3').onChange(async() => {
    const selectedvalue3 = $w('#dropdown3').value;

    wixData.query('Course').eq('subject', selectedvalue3).find().then(results => {
      let optionvalue = results.items.map(subject => ({label : subject.courseId, value : subject._id}));
      $w('#dropdown6').options = optionvalue;
    })
  });

  $w("#button1").onClick(async () => {
    try{
      wixData.insert("Preference", { 
        first: $w('#dropdown1').value, 
        second: $w('#dropdown2').value, 
        third: $w('#dropdown3').value
  });
    } catch{
      console.error("Failed to update data:");
    }
  });

  $w("#button").onClick(async () => {
    try {
      const studyGroups = await matchGroups();
      console.log(studyGroups);
    } catch (error) {
      console.error(error.message);
    }
  });
});
