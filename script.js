const CURRENT_LEVEL = 1;
const LEVEL = LEVELS[CURRENT_LEVEL];

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

//=====================
// GAME STATE
//=====================

let coins = LEVEL.startingCoins;
let solved = 0;
let missed = 0;

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

const revealed=document.getElementById("revealedClues");

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


    const percent = solved / 5 * 100;

    progressBar.style.width = percent + "%";

    progressText.textContent = `${solved} / 5 Complete`;


}





//=====================
// BUILD CLUE BUTTONS
//=====================

function createButtons(){

    clueContainer.innerHTML="";

    for (const key of LEVEL.clues) {

        //const key = clue.id;

        const button=document.createElement("button");

        //console.log("key =", key);
        //console.log("CLUES[key] =", CLUES[key]);

        button.className="clueButton";

        console.log("button:", key, clueCosts[key]);

        button.innerHTML=`
            <span>${CLUES[key].name}</span>
            <span class="cost">${clueCosts[key]} 💰</span>
        `;
        
        console.log(key, CLUES[key].cost);

        if(purchasedClues[key])
            button.disabled=true;

        button.addEventListener("click",()=>buyClue(key));

        clueContainer.appendChild(button);

    }

}


function endGame(reason = "completed", answer = null) {

    clueContainer.innerHTML = "";
    revealed.innerHTML = "";

    guessButton.disabled = true;
    guessInput.disabled = true;
    nextButton.style.display = "none";

    if (reason === "wrong") {

      message.innerHTML = `
          <h2>❌ GAME OVER</h2>

          <p>Your guess was incorrect.</p>

          <p><strong>The correct answer was ${answer}</strong></p>

          <br>

          Solved: ${solved} / 5<br>
          Coins Left: ${coins}
          
           <br><br>

           <button id="restartButton">🔄 Play Again</button>

          `;

      } else {

        message.innerHTML = `
            <h2>🎉 LEVEL COMPLETE!</h2>
            <br>
            Solved: ${solved} / 5<br>
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
// NEXT ROUND
//=====================

function nextRound(){

    if(deck.length===0){

        endGame();
        return;

    }

    currentNumber=deck.shift();

    purchasedClues={};

    revealed.innerHTML="No clues purchased.";

    message.textContent="";

    guessInput.value="";

    guessButton.style.display = "inline-block";
    nextButton.style.display = "none";

    guessInput.disabled = false;

    createButtons();

    updateStats();

}



function factorCount(n){

    let count=0;

    for(let i=1;i<=n;i++){

        if(n%i===0)
            count++;

    }

    return count;

}

function largestProperFactor(n){

    if(n===1)
        return 0;

    for(let i=Math.floor(n/2);i>=1;i--){

        if(n%i===0)
            return i;

    }

    return 1;

}

function isPrime(n){

    if(n<2)
        return false;

    for(let i=2;i*i<=n;i++){

        if(n%i===0)
            return false;

    }

    return true;

}

function isSquare(n){

    return Number.isInteger(Math.sqrt(n));

}

function binaryLength(n){

    return n.toString(2).length;

}

function toRoman(num){

    const romans=[
        ["C",100],
        ["XC",90],
        ["L",50],
        ["XL",40],
        ["X",10],
        ["IX",9],
        ["V",5],
        ["IV",4],
        ["I",1]
    ];

    let result="";

    for(const [symbol,value] of romans){

        while(num>=value){

            result+=symbol;
            num-=value;

        }

    }

    return result;

}

function reverseNumber(n){

    return Number(
        n.toString()
         .split("")
         .reverse()
         .join("")
    );

}

function getClue(type){

    switch(type){

        case "oddEven":
            return currentNumber%2===0?"Even":"Odd";

        case "prime":
            return isPrime(currentNumber)?"Yes":"No";

        case "square":
            return isSquare(currentNumber)?"Yes":"No";

        case "digitSum":
            return currentNumber
                .toString()
                .split("")
                .reduce((a,b)=>a+Number(b),0);

        case "palindrome":
            return currentNumber===reverseNumber(currentNumber)
                ?"Yes":"No";

        case "factors":
            return factorCount(currentNumber);

        case "reverse":
            return currentNumber>reverseNumber(currentNumber)
                ?"Yes":"No";

        case "binary":
            return binaryLength(currentNumber);

        case "largestFactor":
            return largestProperFactor(currentNumber);

        case "roman":
            return toRoman(currentNumber).length;

    }

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

       if (solved === 5) {

          updateStats();
          endGame("completed");
          return;

        }

    }else{

      missed++;

      updateStats();

      message.innerHTML = `❌ Wrong! The correct answer was <b>${currentNumber}</b>.`;

      endGame("wrong", currentNumber);

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
    clueCosts[type]++;

    // Mark purchased
    purchasedClues[type] = true;

    // Reveal clue
    const value = CLUES[type].fn(currentNumber);

    if(revealed.innerHTML==="No clues purchased.")
        revealed.innerHTML="";

    revealed.innerHTML +=
    `<div><b>${CLUES[type].name}</b> : ${value}</div>`;

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

nextRound();
