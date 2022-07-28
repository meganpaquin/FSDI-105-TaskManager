function displayTask(newObject){
    let importantHtml;
    let id=1;
    let pastdue;

    if(!isImportant){
        importantHtml = "'fa-regular fa-star importantTask iImportant'";
    }else{
        importantHtml = "'fa-solid fa-star importantTask iImportant'";
    }

    if(newObject.status == 'Past Due'){
        pastdue = '<span><i class="bi bi-exclamation-triangle-fill pastDueWarn"></i></span>'
    }else{
        pastdue = '';
    }

    let insertHtml = `
    <div id="task#${id}" class="card mb-3" style="border: 4px solid ${newObject.color};">
        <div class="row g-0">
            <div class="col-md-2">
                <span class="emojiTask">${newObject.emoji}</span>
                <span><i class=${importantHtml}></i></span>
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${newObject.title}</h5>
                    <p class="card-text">${newObject.description}</p>
                    <p class="card-text"><small class="text-muted">${newObject.duedate}</small></p>
                </div>
            </div>
            <div class="col-md-2">
                <span><i class="bi bi-trash3-fill deleteBtn(task#${id})"></i></span>
                <span><i class="bi bi-pencil-square editTaskBtn(task#${id}"></i></span>
                ${pastdue}
            </div>  
        </div>
    </div>
    `
  $('#taskArea').append(insertHtml);
}