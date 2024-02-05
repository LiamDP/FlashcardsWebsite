let allFlashcardLists = localStorage.getItem('allFlashcardLists') ? JSON.parse(localStorage.getItem('allFlashcardLists')) :  [];


function initiateHomePage() {
  let allFlashcardLists = localStorage.getItem('allFlashcardLists') ? JSON.parse(localStorage.getItem('allFlashcardLists')) : [];
  console.log(allFlashcardLists);
  if (allFlashcardLists !== 'undefined') {
    let renderHTML = '';
  
    for (let i=0; i<allFlashcardLists.length; i++) {
      const title = allFlashcardLists[i][0];
      const html = `
        <div class="title">${title} 
          <button class="button flashButton" onclick ="loadFlash(${i});">Flash &#9733</button> 
          <button class="button" onclick="
            localStorage.setItem('flashcardList', JSON.stringify(allFlashcardLists[${i}]));
            localStorage.setItem('i', ${i});
            window.location.href = 'edit-flashcard.html';
          ">Edit</button> 
          <button class="button" onclick="deleteFlashcard(${i});">Delete</button>
        </div> <br>
      `
      renderHTML += html;
    }
    document.querySelector(".titleListEmbedded").innerHTML = renderHTML;
  }
}

function deleteFlashcard(i) {
  let allFlashcardLists = localStorage.getItem('allFlashcardLists') ? JSON.parse(localStorage.getItem('allFlashcardLists')) : [];
  document.querySelector('.title').remove();
  allFlashcardLists.splice(i,1);
  console.log(allFlashcardLists);
  localStorage.setItem('allFlashcardLists', JSON.stringify(allFlashcardLists));
  initiateHomePage();
}

function loadFlash(i) {
  localStorage.setItem('i',i);
  window.location.href = 'flash.html';
}
