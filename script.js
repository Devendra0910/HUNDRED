//=====================
// GAME STATE
//=====================

let coins = 100;
let solved = 0;
let missed = 0;

const clueCosts = {
    oddEven:1,
    prime:1,
    square:1,
    digitSum:1,
    palindrome:1,
    factors:1,
    reverse:1,
    binary:1,
    largestFactor:1,
    roman:1
};

const clueNames = {
    oddEven:"Odd / Even",
    prime:"Prime?",
    square:"Perfect Square?",
    digitSum:"Digit Sum",
    palindrome:"Palindrome?",
    factors:"Number of Factors",
    reverse:"Greater Than Reverse?",
    binary:"Binary Length",
    largestFactor:"Largest Proper Factor",
    roman:"Roman Numeral Length"
};

let deck = [];
let currentNumber = null;

let purchasedClues = {};


//=====================
// BUILD DECK
//=====================

for(let i=1;i<=100;i++){
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

const solvedText=document.getElementById("solved");

const missedText=document.getElementById("missed");

const remainingText=document.getElementById("remaining");

const message=document.getElementById("message");

const guessInput=document.getElementById("guessInput");

const guessButton=document.getElementById("guessButton");

guessButton.addEventListener("click",guess);


//=====================
// UPDATE UI
//=====================

function updateStats(){

    coinsText.textContent=coins;

    solvedText.textContent=solved;

    missedText.textContent=missed;

    remainingText.textContent=deck.length+(currentNumber!==null?1:0);

}


//=====================
// BUILD CLUE BUTTONS
//=====================

function createButtons(){

    clueContainer.innerHTML="";

    for(let key in clueNames){

        const button=document.createElement("button");

        button.className="clueButton";

        button.innerHTML=`
            <span>${clueNames[key]}</span>
            <span class="cost">${clueCosts[key]} 💰</span>
        `;

        if(purchasedClues[key])
            button.disabled=true;

        button.addEventListener("click",()=>buyClue(key));

        clueContainer.appendChild(button);

    }

}

function endGame(){

    clueContainer.innerHTML="";

    revealed.innerHTML="";

    guessButton.disabled=true;

    guessInput.disabled=true;

    message.innerHTML=`
        <h2>🎉 Game Over!</h2>
        <br>
        Solved: ${solved}<br>
        Missed: ${missed}<br>
        Coins Left: ${coins}
    `;

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

    }else{

        missed++;

        message.textContent=
            "❌ Wrong! It was "+currentNumber;

    }

    updateStats();

    setTimeout(nextRound,1200);

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
    const value = getClue(type);

    if(revealed.innerHTML==="No clues purchased.")
        revealed.innerHTML="";

    revealed.innerHTML +=
        `<div><b>${clueNames[type]}</b> : ${value}</div>`;

    // Refresh buttons to show updated costs
    createButtons();

    // Disable purchased clues
    const buttons=document.querySelectorAll(".clueButton");

    let index=0;

    for(let key in clueNames){

        if(purchasedClues[key])
            buttons[index].disabled=true;

        index++;

    }

    updateStats();

}

function endGame() {}

//=====================
// START GAME
//=====================

nextRound();
