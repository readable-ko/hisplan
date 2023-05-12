import { sql } from '@velo/wix-data-sql-backend';
import { groupMatching } from 'backend/groupMatchingModule'

$w.onReady(function () {
	$w('#button').onClick(async () => {
		$w('#responseText').text = await sql("SELECT 'hello, world!';");
		$w('#responseText').show();
	});
});
