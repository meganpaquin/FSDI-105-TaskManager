let importantClass= 'fa-solid fa-star'
let nonImportantClass = 'fa-regular fa-star'
let isImportant = false;
let notNotify = 'bi bi-square'
let Notify = 'bi bi-check-square'
let isNotify = false;
let formVisible = true;

function toggleImportant(){
    let htmlinsert = $('#iImportant');
    if(!isImportant){
        htmlinsert.removeClass(nonImportantClass);// remove non-important
        htmlinsert.addClass(importantClass);//add important
        isImportant = true;
    }else{
        htmlinsert.removeClass(importantClass);
        htmlinsert.addClass(nonImportantClass);
        isImportant = false;
    }
}

function toggleNotify(){
    let insertPoint = $('#iNotification');
    if(!isNotify){
        insertPoint.removeClass(notNotify);
        insertPoint.addClass(Notify);
        isNotify = true;
    }else{
        insertPoint.removeClass(Notify);
        insertPoint.addClass(notNotify);
        isNotify = false;
    }
}

function hideForm(){
    let theForm = $('#form-side')
    if(formVisible){
        theForm.hide();
        formVisible = false;
        console.log('hiding the form')
    }else{
        theForm.show();
        formVisible = true;
        console.log('showing the form')
    }
}

function init(){
    //everything runs from here

    $('#iImportant').click(toggleImportant);
    $('#iNotification').click(toggleNotify);
    $('#hide-form-btn').click(hideForm);
}

window.onload = init;