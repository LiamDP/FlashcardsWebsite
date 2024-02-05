const i = localStorage.getItem('i');
const allFlashcardLists = localStorage.getItem('allFlashcardLists') ? JSON.parse(localStorage.getItem('allFlashcardLists')) : [];
let currentSet = allFlashcardLists[i];
let trainSet = [];
let wordNumber=0;

initiateFlash();

function initiateFlash() {
  currentSet.splice(0,1);
  trainSet = shuffleArray(currentSet);
  currentCard = trainSet[wordNumber];
  generateFlashcard(currentCard, wordNumber);

  console.log(trainSet);
}

function loadDifferentWord(sequence, a) {
  if (sequence === 'next') {
    if (a===trainSet.length-1) {
      a = 0;
      currentCard = trainSet[a];
    } else {
      a ++;
      currentCard = trainSet[a];
    }
    
  } else if(sequence === 'previous') {
    if (a===0) {
      a = trainSet.length-1;
      currentCard = trainSet[a];
    } else {
      a -= 1;
      currentCard = trainSet[a];
    }
  }
  wordNumber = a;
  generateFlashcard(currentCard,wordNumber);
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) { 

      // Generate random number 
      var j = Math.floor(Math.random() * (i + 1));
                
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
    
  return array;
}

function generateFlashcard(currentCard, a) {
  currentCard = trainSet[a];
  const word = currentCard.word;
  const definition = currentCard.definition;
  let html = `
    <div class="card">
      <div class="front" onclick="toggleFlip(currentCard)"><p class="text">${word}</p></div>
    </div>
    <button class="cycleButton" onclick="loadDifferentWord('previous', wordNumber)">&#8617;</button>
    <button class="cycleButton" onclick="loadDifferentWord('next', wordNumber)">&#8618;</button>
  `;
  document.querySelector('.cardsContainer').innerHTML = html;
}

function toggleFlip() {
  let card = document.querySelector('.front');
  let paragraph = document.querySelector('.text');
  const {definition, word} = currentCard;

  if (document.querySelector('.flipped')) {
    paragraph.innerText = ''
    setTimeout(() => {paragraph.innerText = word; }, 100);
  } else {
    paragraph.innerText = '';
    setTimeout(() => {paragraph.innerText = definition;}, 100);
  }
 
  card.classList.toggle('flipped');
  paragraph.classList.toggle('flippedText');
 
} 
