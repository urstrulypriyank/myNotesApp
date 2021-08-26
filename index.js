let default_textarea = "Type Here ...";
let default_title = "Title";

showNotes();

let title = document.getElementById('title')
let textarea = document.getElementById('textarea');
title.addEventListener('click',clearDefaultTitle);
textarea.addEventListener('click',clearDefaultTextarea);

function clearDefaultTitle() {
    if(title.value == default_title)
        title.value = "";
    }
function clearDefaultTextarea() {
    if(textarea.value == default_textarea)
        textarea.value = "";

}

let save = document.getElementById('save');
 // adding event listener to save button 

 save.addEventListener('click',saveToStorage);
 function saveToStorage() {
     let textarea = document.getElementById('textarea');
     let title = document.getElementById('title');
     if((textarea.value && title.value)== (null || "")) {
         alert('Filed cannot be empty')
     }
     else{
         let notes = localStorage.getItem("notes")
         if(notes == null)
         {
             notesobj = [];
         }
         else{
             notesobj = JSON.parse(notes);
         }
         let obj_schema = {
             title:title.value,
             text:textarea.value
         }
         notesobj.push(obj_schema);
         localStorage.setItem("notes",JSON.stringify(notesobj));
         title.value = default_title;
         textarea.value = default_textarea;
         showNotes();

     }
 }

 function showNotes(){
     console.log('Show notes')
     let allnotes = document.getElementById('allnotes');
     let notes = localStorage.getItem("notes");
     if(notes == null)
     {
         notesobj = [];
     }
     else{
         notesobj = JSON.parse(notes);
     }
     let card_inject = ``;
     notesobj.forEach(function(element,index){
         card_inject += 
         `  <div class="noteCard mx-1 my-3" style="width: 18rem;">
         <div class="card-body">
           <h5 class="card-title">${element.title}</h5>
           <p class="card-text">${element.text}</p>
           <button type="button" class="btn btn-primary delete" id="${index}" onclick="delItem(this.id)" >Delete</button>
         </div>
       </div>`
     })
     let card_div = document.getElementById('allnotes');
     if(notesobj.length !=0)
        card_div.innerHTML = card_inject;
    else{
        card_div.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    
    }
 }


function delItem(index){
     let notes = localStorage.getItem("notes");
     if(notes == null)
         {
             notesobj = [];
         }
         else{
             notesobj = JSON.parse(notes);
         }
         console.log(index);
         notesobj.splice(index,1);
         localStorage.setItem("notes",JSON.stringify(notesobj));
         showNotes();

 }

 let search = document.getElementById('search');
 search.addEventListener('input',function(){
    //  let search = document.getElementById('input');
        let query = search.value.toLowerCase();
        console.log(query)
        let noteCard = document.getElementsByClassName('noteCard');
        Array.from(noteCard).forEach(function(element){
            let cardText = element.getElementsByTagName('p')[0].innerHTML;
            console.log(cardText)
            if(cardText.includes(query))
            {
                element.style.display = "block";

            }
            else {
                element.style.display= "none";
            }
        })
 });