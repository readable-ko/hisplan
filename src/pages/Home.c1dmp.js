import { getAllTasks, insertTask, updateTask, removeTask } from 'backend/data';
import { local } from 'wix-storage';
import { currentMember } from 'wix-members';

const htmlFontFamily = `madefor-display`;
const htmlFontSize = `14px`;

let visitorId;

$w.onReady(function () {
    $w('#repeater').data = [];
    registerHandlers();
    setVisitor();
});

function registerHandlers() {
    $w('#repeater').onItemReady(($item, itemData) => {
        $item('#taskTitle').text = itemData.todo;
        console.log("item text is: ", itemData.todo);
        if (itemData.isComplete === true) {
            $item('#taskCompleteButton').label = 'V';
        }
        getHTMLtag($item('#taskTitle'), itemData.isComplete);
        $item('#taskCompleteButton').onClick(() => changeCompleteStatus($item, itemData));
    });
    $w('#addButton').onClick(() => createNewTask());
    $w('#taskInput').onKeyPress((event) => {
        if (event.key === 'Enter') {
            createNewTask();
        }
    });
    $w('#clearButton').onClick(() => clearCompletedTasks());
}

async function setVisitor() {
    const memInfo = await currentMember.getMember().then((member) => {
        const id = member._id;
        const fullName = `${member.contactDetails.firstName} ${member.contactDetails.lastName}`;
        return id;
    }).catch((error) => {
        console.error(error);
    });
    visitorId = memInfo;
    //local.getItem('studentId');
    console.log("visitorId is:", visitorId);

    if (!visitorId) {
        visitorId = Math.random().toString(36);
        local.setItem('studentId', visitorId);
    }
    fetchData();
}

async function fetchData() {
    $w('#loaderImage').expand();
    try {
        $w('#repeater').data = await getAllTasks(visitorId);
        console.log("DATA IS:", $w('#repeater').data);
        $w('#loaderImage').collapse();
    } catch (error) {
        console.error(error);
    }
}

async function createNewTask() {
    const toInsert = {
        todo: $w('#taskInput').value,
        isComplete: false,
        studentId: visitorId
    };
    $w('#taskInput').value = null;
    try {
        await insertTask(toInsert);
        await fetchData();
    } catch (error) {
        console.error(error);
    }
}

async function changeCompleteStatus($item, itemData) {
    try {
        if ($item('#taskCompleteButton').label === 'V') {
            $item('#taskCompleteButton').label = '';
            getHTMLtag($item('#taskTitle'), false);
            await updateTask(itemData, false);
        } else {
            $item('#taskCompleteButton').label = 'V';
            getHTMLtag($item('#taskTitle'), true);
            await updateTask(itemData, true);
        }
    } catch (error) {
        console.error(error);
    }
}

// instead of waiting for each remove action to complete, we call the remove function asynchronously and store the promise returned by each
// call in removePromises array. We use Promise.all in order to wait for all calls to complete before returning from the function
async function clearCompletedTasks() {
    let removePromises = [];
    let remainedTasks = [];
    $w('#repeater').forEachItem(async ($item, itemData) => {
        if ($item('#taskCompleteButton').label === 'V') {
            const removePromise = removeTask(itemData._id);
            removePromises.push(removePromise);
        } else {
            remainedTasks.push(itemData);
        }
    });
    try {
        await Promise.all(removePromises);
    } catch (error) {
        console.error(error);
    }
    $w('#repeater').data = remainedTasks;
}

function getHTMLtag(taskTitle, del) {
    if (del) {
        taskTitle.html = `<p style="font-family:${htmlFontFamily}; font-size:${htmlFontSize}"><del>${taskTitle.text}</del></p>`;
    } else {
        taskTitle.html = `<p style="font-family:${htmlFontFamily}; font-size:${htmlFontSize}">${taskTitle.text}</p>`;
    }
}
