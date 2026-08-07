let CURRENT_LEVEL = 1;
let LEVEL = LEVELS[CURRENT_LEVEL];
let levelStartTime = null;

const MAX_LEVEL = 13;

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js").catch((err) => {
            console.log("Service worker registration failed:", err);
        });
    });
}

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

function computePercentile(levelNumber, bestScore) {

    if (bestScore === null) return null;

    const samples = PERCENTILE_DATA[levelNumber];
    const level = LEVELS[levelNumber];

    if (!samples || !level) return null;

    const spent = level.startingCoins - bestScore;

    let lo = 0, hi = samples.length;

    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (samples[mid] < spent) lo = mid + 1;
        else hi = mid;
    }

    const betterOrEqualCount = samples.length - lo;
    const percentileBeaten = Math.round((betterOrEqualCount / samples.length) * 100);

    return Math.min(100, Math.max(0, percentileBeaten));
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
const muteButton = document.getElementById("muteButton");

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
const bestScorePanel=document.getElementById("bestScorePanel");
const bestScoreDisplay=document.getElementById("bestScoreDisplay");
const message=document.getElementById("message");
const guessInput=document.getElementById("guessInput");
const guessButton=document.getElementById("guessButton");
const nextButton=document.getElementById("nextButton");
const buyCluesSection = document.getElementById("buyCluesSection");
const candidateSection = document.getElementById("candidateSection");
const candidateGrid = document.getElementById("candidateGrid");
const candidateCount = document.getElementById("candidateCount");

guessButton.addEventListener("click",guess);
nextButton.addEventListener("click",nextRound);

homeButton.addEventListener("click", showHome);

muteButton.textContent = SOUND.isMuted() ? "🔇" : "🔊";
muteButton.addEventListener("click", () => {
    const muted = SOUND.toggleMuted();
    muteButton.textContent = muted ? "🔇" : "🔊";
});


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
// CANDIDATE GRID
//=====================

function buildCandidateGrid(){

    candidateGrid.innerHTML = "";

    for (let n = LEVEL.deckStart; n <= LEVEL.deckEnd; n++) {

        const cell = document.createElement("div");
        cell.className = "candidateCell";
        cell.dataset.number = n;
        cell.textContent = n;

        candidateGrid.appendChild(cell);
    }

    updateCandidateGrid();
}

// A number stays possible only if every purchased clue gives it
// the same answer as the hidden number.
function isStillPossible(n){

    for (const key of LEVEL.clues) {

        if (!purchasedClues[key]) continue;

        if (CLUES[key].fn(n) !== CLUES[key].fn(currentNumber))
            return false;
    }

    return true;
}

function updateCandidateGrid(){

    if (currentNumber === null) return;

    let remaining = 0;

    candidateGrid.querySelectorAll(".candidateCell").forEach(cell => {

        const n = Number(cell.dataset.number);

        if (isStillPossible(n)) {
            cell.classList.remove("eliminated");
            remaining++;
        } else {
            cell.classList.add("eliminated");
        }
    });

    candidateCount.textContent = `${remaining} left`;
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

    if (typeof gtag === "function") {
        const durationSeconds = levelStartTime !== null
            ? Math.round((Date.now() - levelStartTime) / 1000)
            : null;

        gtag("event", reason === "completed" ? "level_complete" : "level_failed", {
            level: CURRENT_LEVEL,
            solved: solved,
            coins_left: coins,
            duration_seconds: durationSeconds
        });
    }

    buyCluesSection.style.display = "none";
    candidateSection.style.display = "none";
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

    const cluesSection = `
        <div class="sectionLabel">🔍 Clues Used This Question</div>

        ${clueHistory || `
            <div class="noClues">
            No clues purchased
            </div>
            `}
    `;

    if (reason === "wrong") {

      message.innerHTML = `
          <div class="resultCard lost">

          <h2 class="resultTitle"><span class="gameOverIcon">❌</span> Game Over</h2>
          <p class="resultSubtitle">Wrong guess — the number was ${answer}.</p>

          <div class="answerCompare">

            <div class="answerBox">
              <div class="answerNumber">${userGuess}</div>
              <div class="answerLabel">Your Guess</div>
            </div>

            <div class="answerArrow">➡</div>

              <div class="answerBox correct">
              <div class="answerNumber">${answer}</div>
              <div class="answerLabel">Correct Answer</div>
            </div>

          </div>

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

          <div class="resultDivider"></div>

          ${cluesSection}

          <div class="resultDivider"></div>

          <div class="resultActions">
              <button id="restartButton">
                  🔄 Play Again
              </button>
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
        const scorePercentile = computePercentile(CURRENT_LEVEL, coins);

        isNewBest ? SOUND.newBest() : SOUND.levelComplete();

    message.innerHTML = `
        <div class="resultCard won">

            <h2 class="resultTitle">🎉 Level Complete!</h2>
            <p class="resultSubtitle">You solved all ${LEVEL.questions} hidden numbers.</p>

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

            ${scorePercentile !== null ? `
                <div class="resultPercentile">
                    📊 This score is better than ${scorePercentile}% of players
                </div>
            ` : ""}

            <div class="resultDivider"></div>

            ${cluesSection}

            <div class="resultDivider"></div>

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
    "Prime",
    "Special Numbers",
    "Atomic Number",
    "Morse Code"
];

const levelIcons = [
    "🌱","🔤","🔢","🔄","⚖️",
    "💎","🏛️","💻","➗","🔶","✨","⚛️","📡"
];

let totalScore = 0;
for (let i = 1; i <= MAX_LEVEL; i++) {
    const best = loadBestScore(i);
    if (best !== null) totalScore += best;
}

let levelButtons = "";

for (let i = 1; i <= MAX_LEVEL; i++) {

    const locked = i > unlockedLevel;
    const completed = i < unlockedLevel;
    const bestScore = loadBestScore(i);
    const percentile = computePercentile(i, bestScore);

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
                            ${bestScore !== null ? `🏆 Best: ${bestScore}` : ""}
                        </div>

                        <div class="levelPercentile">
                            ${percentile !== null ? `📊 Better than ${percentile}% players` : ""}
                        </div>
                    </div>
                `
        }

    </button>
`;
}

    const tutorialHtml = unlockedLevel === 1 ? `
        <div class="tutorialCard">

            <h3 class="tutorialTitle">👋 How to Play</h3>

            <div class="tutorialStep">
                <span class="tutorialIcon">🎯</span>
                <span>Guess the hidden number between 1 and 100.</span>
            </div>

            <div class="tutorialStep">
                <span class="tutorialIcon">💰</span>
                <span>Not sure? Spend coins to buy clues about the number.</span>
            </div>

            <div class="tutorialStep">
                <span class="tutorialIcon">✅</span>
                <span>Solve all questions before you run out of coins to win.</span>
            </div>

            <div class="tutorialStep">
                <span class="tutorialIcon">❌</span>
                <span>One wrong guess ends the round, so guess carefully!</span>
            </div>

        </div>
    ` : "";

    homeScreen.innerHTML = `

         <div class="menu">
             <h1 class="gameTitle">HUNDRED</h1>

              <p class="tagline">
                 Deduce • Discover • Master
              </p>

              ${totalScore > 0 ? `
                  <div class="totalScoreBadge">
                      <span class="totalScoreIcon">🏆</span>
                      <span class="totalScoreText">
                          <span class="totalScoreLabel">Total Score</span>
                          <span class="totalScoreValue">${totalScore}</span>
                      </span>
                  </div>
              ` : ""}

              ${tutorialHtml}

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
    levelStartTime = Date.now();

    if (typeof gtag === "function") {
        gtag("event", "level_start", { level: levelNumber });
    }

    levelTitle.textContent = `Level ${CURRENT_LEVEL}`;

    const existingBest = loadBestScore(levelNumber);
    if (existingBest !== null) {
        bestScoreDisplay.textContent = existingBest;
        bestScorePanel.style.display = "flex";
    } else {
        bestScorePanel.style.display = "none";
    }

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
    candidateSection.style.display = "block";
    guessInput.value="";
    guessButton.style.display = "inline-block";
    nextButton.style.display = "none";
    guessInput.disabled = false;
    guessButton.disabled = false;
    createButtons();
    buildCandidateGrid();
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

        SOUND.correct();

    }else{

      SOUND.wrong();
      updateStats();
      //message.innerHTML = `❌ Wrong! The correct answer was <b>${currentNumber}</b>.`;
      endGame("wrong", currentNumber, value);
      //endGame("wrong", currentNumber);
      return;
   }
    
    updateStats();

    buyCluesSection.style.display = "none";
    candidateSection.style.display = "none";

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

    SOUND.clueBuy();

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

    updateCandidateGrid();
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
