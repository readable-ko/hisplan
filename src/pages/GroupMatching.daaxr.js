import { matchGroups } from "backend/groupMatchingModule.jsw";
import { $w } from 'wix-sdk';

$w.onReady(() => {
  $w('#dropdownFriends').onChange(function () {
    const selectedOption = $w('#dropdownFriends').value;
    $w('#textboxFriends').value = selectedOption;
  });
});

$w.onReady(() => {
  $w("#button").onClick(async () => {
    try {
      const studyGroups = await matchGroups();
      console.log(studyGroups);
    } catch (error) {
      console.error(error.message);
    }
  });
});
