let CURRENT_LEVEL = 1;
let LEVEL = LEVELS[CURRENT_LEVEL];

const MAX_LEVEL = 10;

function loadBestScore(levelNumber) {
    const raw = localStorage.getItem(`hundred_bestScore_level_${levelNumber}`);
    return raw === null ? null : Number(raw);
}

function saveBestScore(levelNumber, score) {
    const currentBest = loadBestScore(levelNumber);

    if (currentBest === null || score > currentBest) {
        localStorage.setItem(
            `hundred_bestScore_level_${levelNumber}`,
            score
        );

        return true;
    }

    return false;
}

function loadUnlockedLevel() {
    return Number(localStorage.getItem("unlockedLevel") || 1);
}

function saveUnlockedLevel(level) {
    localStorage.setItem("unlockedLevel", level);
}

let unlockedLevel = loadUnlockedLevel();

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

const homeScreen = document.getElementById("homeScreen");
const gameScreen = document.getElementById("gameScreen");

const homeButton = document.getElementById("homeButton");
const levelTitle = document.querySelector(".levelTitle");

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
const buyCluesSection = document.getElementById("buyCluesSection");

guessButton.addEventListener("click",guess);
nextButton.addEventListener("click",nextRound);

homeButton.addEventListener("click", showHome);


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

    console.log("endGame called:", reason);

    buyCluesSection.style.display = "none";
    clueContainer.innerHTML = "";
    //revealed.innerHTML = "";
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

          <div class="resultActions">
              <button id="restartButton">
                  🔄 Play Again
              </button>
          </div>

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


          </div>
      `;

    }
    else {

        if (CURRENT_LEVEL < MAX_LEVEL && unlockedLevel < CURRENT_LEVEL + 1) {

          unlockedLevel = CURRENT_LEVEL + 1;
          saveUnlockedLevel(unlockedLevel);
        }

        const isNewBest = saveBestScore(CURRENT_LEVEL, coins);
        const bestScore = loadBestScore(CURRENT_LEVEL);

    message.innerHTML = `
        <div class="resultCard">

            <h2 class="resultTitle">🎉 Level Complete!</h2>

            <div class="resultStats">

                <div class="statCard">
                    <div class="statValue">${solved}/${LEVEL.questions}</div>
                    <div class="statLabel">Solved</div>
                </div>

                <div class="statCard">
                    <div class="statValue">${coins}</div>
                    <div class="statLabel">
                        ${isNewBest ? "🏆 New Best!" : "Coins Left"}
                    </div>
                </div>

                <div class="statCard">
                    <div class="statValue">${bestScore}</div>
                    <div class="statLabel">Best Score</div>
                </div>

            </div>

            <div class="resultActions">

                <button id="restartButton">
                    🔄 Play Again
                </button>

                ${CURRENT_LEVEL < MAX_LEVEL ? `
                    <button id="nextLevelButton">
                        Next Level ➡️
                    </button>
                ` : ""}

            </div>

        </div>
    `;

    }
    document.getElementById("restartButton").addEventListener("click", () => {location.reload()});

    const nextLevelButton = document.getElementById("nextLevelButton");
    if (nextLevelButton) {
        nextLevelButton.addEventListener("click", () => {
            startLevel(CURRENT_LEVEL + 1);
        });
    }

}

//=====================
// SHOW HOME
//=====================

function showHome() {

    gameScreen.style.display = "none";

    levelTitle.textContent = "";

    homeScreen.style.display = "block";

    const levelNames = [
    "Basics",
    "English",
    "Digits",
    "Reverse",
    "Lcm/Gcd",
    "Modulo",
    "Roman",
    "Binary",
    "Divisors",
    "Prime"
];

const levelIcons = [
    "🌱","🔤","🔢","🔄","⚖️",
    "💎","🏛️","💻","➗","🔶"
];

let levelButtons = "";

for (let i = 1; i <= MAX_LEVEL; i++) {

    const locked = i > unlockedLevel;
    const completed = i < unlockedLevel;
    
    levelButtons += `
    <button
        class="levelButton ${locked ? "locked" : ""} ${completed ? "completed" : ""}"
        data-level="${i}"
        ${locked ? "disabled" : ""}
    >

        ${
            locked
                ? `
                    <div class="lockedLevelContent">
                        <div class="levelIcon">🔒</div>
                        <div class="lockedLevelName">Level ${i}</div>
                    </div>
                `
                : `
                    <div class="levelIcon">
                        ${levelIcons[i - 1]}
                    </div>

                    <div class="levelInfo">
                        <div class="levelTitleSmall">
                            Level ${i}
                        </div>

                        <div class="levelName">
                            ${levelNames[i - 1]}
                        </div>

                        <div class="levelStatus">
                            ${completed ? "✓ " : ""}
                        </div>

                        <div class="levelBest">
                            ${loadBestScore(i) !== null ? `🏆 Best: ${loadBestScore(i)}` : ""}
                        </div>
                    </div>
                `
        }

    </button>
`;
}

    homeScreen.innerHTML = `
      
         <div class="menu">
             <h1 class="gameTitle">HUNDRED</h1>

              <p class="tagline">
                 Deduce • Discover • Master
              </p>

              <div class="levelGrid">
                  ${levelButtons}
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

    levelTitle.textContent = `Level ${CURRENT_LEVEL}`;

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
    buyCluesSection.style.display = "block";
    guessInput.value="";
    guessButton.style.display = "inline-block";
    nextButton.style.display = "none";
    guessInput.disabled = false;
    guessButton.disabled = false;
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
          endGame("completed",currentNumber);
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

    buyCluesSection.style.display = "none";

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
