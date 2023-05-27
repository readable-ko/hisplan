import wixData from 'wix-data';

$w.onReady(() => {

    wixData.query('LoginedEmail').find().then(results => {
        console.log(results);
    });

    $w("#button1").onClick(async () => {
        try {
            

            wixData.insert("Student", { 
                name: $w('#input1').value, 
                studentId: $w('#input2').value
            });
        } catch (error) {
            console.error(error.message);
        }
    });
});
