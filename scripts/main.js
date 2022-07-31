let importantClass= 'fa-solid fa-star';
let nonImportantClass = 'fa-regular fa-star';
let isImportant = false;
let notNotify = 'bi bi-square';
let Notify = 'bi bi-check-square';
let isNotify = false;
let formVisible = true;
let array;

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
    let theForm = $('#form-side');
    let btntext = $('#hide-form-btn');
    let theDetails = $('#details-side');

    theDetails.hide();
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
        //need to send the task to the server
        $.ajax({
            type: "POST",
            url: 'https://fsdiapi.azurewebsites.net/api/tasks/',
            data: JSON.stringify(task),
            contentType: "application/json",
            success: function(response){
                console.log('Server says:', response);
                displayTask(task);
                $(input).value = "";
            },
            error: function(errorDetails){
                console.log('Error saving tasks', errorDetails);
            }
        })    
    }else{
        console.log('Entry was invalid');
    }
}

function testRequest(){
    $.ajax({
        type:'GET',
        url:'https://fsdiapi.azurewebsites.net/',
        success: function(response){
            console.log('Server Says:', response);
        },
        error: function(errorDetails){
            console.log("Error", errorDetails);
        }
    })
}

function fetchTasks(){
    $.ajax({
        type: 'GET',
        url: 'https://fsdiapi.azurewebsites.net/api/tasks',
        success: function(response){
            let tasks = JSON.parse(response);
            //loop the array to get each object individually
            for(let i=0; i<tasks.length; i++ ){
                let task = tasks[i];
                    //only show my tasks
                    if(task.name == 'Megan'){
                        displayTask(task);
                    }
            }
        },
        error: function(errorDetails){
            console.log("Error retrieving tasks", errorDetails);
        }
    });
}

function toggleDetails(id){
    //hide the form
    let theForm = $('#form-side');
    let btntext = $('#hide-form-btn');
    if(formVisible){
        theForm.hide();
        formVisible = false;
        console.log('hiding the form');
        btntext.html('Add New Task');
    }
    //show the details
    $('#details-side').show();
    
    //hide any previously clicked cards
    $('.details').hide();

    //display the correct card
    let theCard = document.getElementsByClassName(id);
    $(theCard).show();
}

function remove(id){
    let theCard = document.getElementById(id);
    let theDetails = document.getElementsByClassName(id);
    $(theCard).hide();
    $(theDetails).hide();
    //actually put an AJAX type:delete here but this server does not allow
}

function cardImportant(id){
    let theStar = document.getElementById('star'+id);
    let theClass = theStar.className;
    let ImportantClass = "fa-solid fa-star importantTask iImportant"
    let notImportantClass = "fa-regular fa-star importantTask iImportant"

    if(theClass == ImportantClass){
        $(theStar).removeClass(ImportantClass);
        $(theStar).addClass(notImportantClass);
    }else{
        $(theStar).removeClass(notImportantClass);
        $(theStar).addClass(ImportantClass);
    }

    //ideally you would then push this change to the server, this server does not allow
}


function init(){
    //everything runs from here
    //assign events
    $('#iImportant').click(toggleImportant);
    $('#iNotification').click(toggleNotify);
    $('#hide-form-btn').click(hideForm);
    $('#btnSave').click(save);


    //load initial data
    fetchTasks();
}

window.onload = init;