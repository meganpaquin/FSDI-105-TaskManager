let importantClass= 'fa-solid fa-star';
let nonImportantClass = 'fa-regular fa-star';
let isImportant = false;
let notNotify = 'bi bi-square';
let Notify = 'bi bi-check-square';
let isNotify = false;
let formVisible = true;

function toggleImportant(){
    let htmlinsert = $('.iImportant');
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
    let theForm = $('#form-side');
    let btntext = $('#hide-form-btn');
    if(formVisible){
        theForm.hide();
        formVisible = false;
        console.log('hiding the form');
        btntext.html('Add New Task');
    }else{
        theForm.show();
        formVisible = true;
        console.log('showing the form');
        btntext.html('Hide Form');
    }
}

function validate(obj){
    let valid = true;
    if(obj.title == ''){
        valid = false;
        $('#form-title').addClass('is-invalid');
    }
    if(obj.description == ''){
        valid = false;
        $('#form-description').addClass('is-invalid');
    }
    if(obj.duedate == ''){
        valid = false;
        $('#form-duedate').addClass('is-invalid');
    }
    if(obj.location == ''){
        valid = false;
        $('#form-location').addClass('is-invalid');
    }
    if(!obj.status){
        valid = false;
        $('#statusBox').addClass('is-invalid');
    }
    if(!obj.emoji){
        valid = false;
        $('#emojiBox').addClass('is-invalid');
    }
    return valid    
}

function save(){
    let title = $('#form-title').val();
    let description = $('#form-description').val();
    let duedate = $('#form-duedate').val();
    let color = $('#form-color').val();
    let location = $('#form-location').val();
    let status = $('#statusBox').val();
    let emoji = $('#emojiBox').val();

    let task = new Task(isImportant, title, description, duedate, color, location, status, emoji, isNotify); 

    if(validate(task)){
        console.log(task);
        displayTask(task);
    }else{
        console.log('Entry was invalid');
    }
}

function init(){
    //everything runs from here

    $('.iImportant').click(toggleImportant);
    $('#iNotification').click(toggleNotify);
    $('#hide-form-btn').click(hideForm);
    $('#btnSave').click(save);
}

window.onload = init;