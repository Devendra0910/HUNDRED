let CURRENT_LEVEL = 1;
let LEVEL = LEVELS[CURRENT_LEVEL];

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

const homeScreen = document.getElementById("homeScreen");
const gameScreen = document.getElementById("gameScreen");

//=====================
// GAME STATE
//=====================

let coins = LEVEL.startingCoins;
let solved = 0;

const clueCosts = {};

for (const key of LEVEL.clues) {
    clueCosts[key] = CLUES[key].cost;
}


let deck = [];
let currentNumber = null;

let purchasedClues = {};


//=====================
// BUILD DECK
//=====================

for (let i = LEVEL.deckStart; i <= LEVEL.deckEnd; i++) {
    deck.push(i);
}


shuffle(deck);


//=====================
// SHUFFLE
//=====================

function shuffle(array){

    for(let i=array.length-1;i>0;i--){

        let j=Math.floor(Math.random()*(i+1));

        [array[i],array[j]]=[array[j],array[i]];
    }

}

//=====================
// DOM
//=====================

const clueContainer=document.getElementById("clueContainer");
//const revealed=document.getElementById("revealedClues");
const coinsText=document.getElementById("coins");
const message=document.getElementById("message");
const guessInput=document.getElementById("guessInput");
const guessButton=document.getElementById("guessButton");
const nextButton=document.getElementById("nextButton");

guessButton.addEventListener("click",guess);
nextButton.addEventListener("click",nextRound);


//=====================
// UPDATE UI
//=====================


function updateStats(){
    coinsText.textContent = coins;
    const percent = solved / LEVEL.questions * 100;
    progressBar.style.width = percent + "%";
    progressText.textContent = `${solved} / ${LEVEL.questions} Complete`;
}

//=====================
// BUILD CLUE BUTTONS
//=====================

function createButtons(){

    clueContainer.innerHTML="";
    for (const key of LEVEL.clues) {
        const button=document.createElement("button");
        button.className="clueButton";
        /*button.innerHTML=`
            <span>${CLUES[key].name}</span>
            <span class="cost">${clueCosts[key]} 💰</span>
        `;*/
         const value = purchasedClues[key]  ? CLUES[key].fn(currentNumber) : `${clueCosts[key]} 💰`;
         button.innerHTML = `<div class="clueTitle"> ${CLUES[key].name} </div>
                            <div class="${purchasedClues[key] ? "clueAnswer" : "cost"}"> ${value}</div>`;

        if(purchasedClues[key]){
            button.disabled=true;
            button.classList.add("revealed");
        }
        button.addEventListener("click",()=>buyClue(key));
        clueContainer.appendChild(button);
    }

}

function endGame(reason = "completed", answer = null, userGuess = null) {

    clueContainer.innerHTML = "";
    revealed.innerHTML = "";
    guessButton.disabled = true;
    guessInput.disabled = true;
    nextButton.style.display = "none";

    let clueHistory = "";

    for (const key of LEVEL.clues) {

      if (!purchasedClues[key]) continue;

      clueHistory += `
        <div class="clueResult">

          <span class="clueName">
            ${CLUES[key].name}
          </span>

          <span class="clueValue">
            ${CLUES[key].fn(answer)}
          </span>

        </div>
      `;

    }

    if (reason === "wrong") {

      message.innerHTML = `
          <div class="resultCard">

          <h2 class="resultTitle">❌ Round Lost</h2>

          

          <div class="answerCompare">

            <div class="answerBox">
              <div class="answerNumber">${userGuess}</div>
              <div class="answerLabel">Your Guess</div>
            </div>

            <div class="answerArrow">➡</div>

              <div class="answerBox correct">
              <div class="answerNumber">${answer}</div>
              <div class="answerLabel">Correct</div>
            </div>

          </div>


          <hr>

          <h3>Clues Purchased</h3>

          ${clueHistory || `
            <div class="noClues">
            🔍 No clues purchased
            </div>
            `}

          <hr>

          <div class="resultStats">

            <div class="statCard">
              <div class="statValue">${solved}/${LEVEL.questions}</div>
              <div class="statLabel">Solved</div>
            </div>

            <div class="statCard">
              <div class="statValue">${coins}</div>
              <div class="statLabel">Coins Left</div>
            </div>

          </div>

          <br><br>

          <button id="restartButton">
              🔄 Play Again
          </button>
          </div>
      `;
    }
     else {
        message.innerHTML = `
            <h2>🎉 LEVEL COMPLETE!</h2>
            <br>
            Solved: ${solved} / ${LEVEL.questions}<br>
            Coins Left: ${coins}
             <br><br>
            <button id="restartButton" class="restartButton">
              Play Again
            </button>   
            `;
    }
    document.getElementById("restartButton").addEventListener("click", () => {location.reload()});

}

//=====================
// SHOW HOME
//=====================

function showHome() {

    gameScreen.style.display = "none";

    homeScreen.style.display = "block";

    homeScreen.innerHTML = `
      
         <div class="menu">
             <h1 class="gameTitle">HUNDRED</h1>

              <p class="tagline">
                 Deduce • Discover • Master
              </p>

              <div class="levelGrid">

                <button class="levelButton" data-level="1">🌱 Level 1 (Basics) </button>
                <button class="levelButton" data-level="2">🔢 Level 2 (Patterns)</button>
                <button class="levelButton" data-level="3">💠 Level 3 (Factors) </button>
                <button class="levelButton" data-level="4">🧬 Level 4 (Traits) </button>
                <button class="levelButton" data-level="5">🔄 Level 5 (Reverse)</button>
                <button class="levelButton" data-level="6">📚 Level 6 (English)</button>
                <button class="levelButton" data-level="7">🏛️ Level 7 (Roman)</button>
            </div>
          </div> 
      `;


     document.querySelectorAll(".levelButton").forEach(button => {

    button.addEventListener("click", () => {
        startLevel(Number(button.dataset.level));
    });

});



}

function startLevel(levelNumber) {

    CURRENT_LEVEL = levelNumber;
    LEVEL = LEVELS[levelNumber];

    // Reset state
    coins = LEVEL.startingCoins;
    solved = 0;

    deck = [];
    for (let i = LEVEL.deckStart; i <= LEVEL.deckEnd; i++) {
        deck.push(i);
    }
    shuffle(deck);

    for (const key in clueCosts) delete clueCosts[key];
    for (const key of LEVEL.clues) {
        clueCosts[key] = CLUES[key].cost;
    }

    homeScreen.style.display = "none";
    gameScreen.style.display = "block";

    nextRound();
}


//=====================
// NEXT ROUND
//=====================

function nextRound(){
    if(deck.length===0){
        endGame();
        return;
    }
    currentNumber=deck.shift();
    purchasedClues={};
    //revealed.innerHTML="No clues purchased.";
    message.textContent="";
    guessInput.value="";
    guessButton.style.display = "inline-block";
    nextButton.style.display = "none";
    guessInput.disabled = false;
    createButtons();
    updateStats();
}

function guess(){

    if(currentNumber===null)
        return;
    const value=parseInt(guessInput.value);

    if(isNaN(value)){

        message.textContent="Enter a number.";
        return;

    }

    if(value===currentNumber){

        solved++;
        message.textContent=
            "✅ Correct! It was "+currentNumber;

       if (solved === LEVEL.questions) {

          updateStats();
          endGame("completed");
          return;

        }

    }else{

      updateStats();
      //message.innerHTML = `❌ Wrong! The correct answer was <b>${currentNumber}</b>.`;
      endGame("wrong", currentNumber, value);
      //endGame("wrong", currentNumber);
      return;
   }
    
    updateStats();

    guessButton.style.display = "none";
    nextButton.style.display = "inline-block";
    guessInput.disabled = true;
    document.querySelectorAll(".clueButton").forEach(button=>{
      button.disabled = true;
    });
}

function canBuyAnyClue() {

    for (const key of LEVEL.clues) {

        if (!purchasedClues[key] && coins >= clueCosts[key]) {
            return true;
        }

    }

    return false;

}

function buyClue(type){

    // Already purchased this round
    if(purchasedClues[type])
        return;

    // Not enough coins
    if(coins < clueCosts[type]){

        message.textContent = "Not enough coins!";
        return;

    }

    // Pay
    coins -= clueCosts[type];

    // Increase future cost
    clueCosts[type]+= LEVEL.clueCostIncrement;;

    // Mark purchased
    purchasedClues[type] = true;

    /*// Reveal clue
    const value = CLUES[type].fn(currentNumber);

    if(revealed.innerHTML==="No clues purchased.")
        revealed.innerHTML="";

    revealed.innerHTML +=
    `<div><b>${CLUES[type].name}</b> : ${value}</div>`;*/

    // Refresh buttons to show updated costs
    createButtons();

    // Disable purchased clues
    const buttons=document.querySelectorAll(".clueButton");

    let index=0;
    for (const key of LEVEL.clues) {
        if (purchasedClues[key])
            buttons[index].disabled = true;
        index++;
    }

    updateStats();

    if (!canBuyAnyClue()) {
        document.querySelectorAll(".clueButton").forEach(button => {
            button.disabled = true;
        });
        message.textContent = "No more clues can be purchased. Make your guess!";
    }
}


//=====================
// START GAME
//=====================

//nextRound();

showHome();
