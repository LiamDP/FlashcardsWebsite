let allFlashcardLists = localStorage.getItem('allFlashcardLists') ? JSON.parse(localStorage.getItem('allFlashcardLists')) : [];
let flashcardList = [];


function addNewCard() {
  const word = document.querySelector('.wordInput').value;
  const definition = document.querySelector('.definitionInput').value;
  if (word && definition) {
    flashcardList.push({word, definition});
  } else {
    alert('At least one of the inputs is missing!');
  }


  document.querySelector('.wordInput').value = '';
  document.querySelector('.definitionInput').value = '';
  document.getElementById('wordInput').focus();

  renderFlashcard();
}

function renderFlashcard() {
  let flashcardHTML = '';

  for (let i=0; i<flashcardList.length; i++) {
    if (typeof flashcardList[i] === 'object') {
      const flashcardObject = flashcardList[i];
      const {word, definition} = flashcardObject;
      const html = `
        <div class="card">${word}</div>
        <div class="card">${definition}</div>
        <button class="card deleteButton" onclick="
          flashcardList.splice(${i},1);
          renderFlashcard();
        ">&#10060</button>
      `
      flashcardHTML += html;
    }
  }
  document.querySelector('.cardsList').innerHTML = flashcardHTML;
}

function pressedEnter(event) {
  if (event.key === 'Enter') {
    addNewCard();
  }
}

function saveFlashcard() { 
  const title = document.getElementById('title').value
  
  if (flashcardList[0]) {
    if (typeof flashcardList[0] === 'string') {
      if (title) {
        flashcardList[0] = title;
      }
    } else if (title) {
      flashcardList.unshift(title);
    } else  if (typeof flashcardList[0] !== 'string'){
      flashcardList.unshift('Unnamed flashcard list');
    }
    allFlashcardLists.push(flashcardList);
  }
  localStorage.setItem('allFlashcardLists', JSON.stringify(allFlashcardLists));
  window.location.href = 'flashcard-app.html';
}

