//===========================================
// unique.js
//===========================================

const out = document.getElementById("output");
const GAME_COUNT = 1000;

function print(text = "") {
    out.textContent += text + "\n";
}

function printSection(title) {

    print("");

    print("====================================");

    print(title);

    print("====================================");

}

function printBenchmark(simulator, ai) {

    printSection("AI Benchmark");

    const gameCount = GAME_COUNT;

    const scores = [];

    let totalCoins = 0;
    let wins = 0;

    for (let i = 0; i < gameCount; i++) {

        const score = simulator.play(ai);

        scores.push(score);
        totalCoins += score;

        if (score < simulator.level.startingCoins) {
            wins++;
        }
    }

    scores.sort((a, b) => a - b);

    const average = totalCoins / gameCount;

    const median = scores[Math.floor(gameCount / 2)];

    const best = scores[0];
    const worst = scores[gameCount - 1];

    const p25 = scores[Math.floor(gameCount * 0.25)];
    const p75 = scores[Math.floor(gameCount * 0.75)];
    const p90 = scores[Math.floor(gameCount * 0.90)];
    const p95 = scores[Math.floor(gameCount * 0.95)];

    let variance = 0;

    for (const score of scores) {
        variance += (score - average) ** 2;
    }

    variance /= gameCount;

    const stdDev = Math.sqrt(variance);

    const winRate = 100 * wins / gameCount;

    print(`AI              : ${ai.constructor.name}`);
    print(`Games           : ${gameCount}`);

    print("");

    print(`Average         : ${average.toFixed(2)}`);
    print(`Median          : ${median}`);

    print("");

    print(`Best Run        : ${best}`);
    print(`Worst Run       : ${worst}`);

    print("");

    print(`25th %ile       : ${p25}`);
    print(`75th %ile       : ${p75}`);
    print(`90th %ile       : ${p90}`);
    print(`95th %ile       : ${p95}`);

    print("");

    print(`Std Deviation   : ${stdDev.toFixed(2)}`);

    print("");

    print(`Win Rate        : ${winRate.toFixed(2)}% (${wins}/${gameCount})`);
}


/*function printBenchmark(simulator , ai) {

    
    printSection("AI Benchmark");

    let gameCount = GAME_COUNT;
    let totalCoins = 0;
    
    for (let i = 0; i < gameCount; i++) {
      totalCoins += simulator.play(ai);
    }
    
    let averageCoins = totalCoins / gameCount
    
    print(`AI              : ${ai.constructor.name}`);
    print(`Games           : ${gameCount}`);
    print(`Average Coins   : ${averageCoins.toFixed(1)}`);

}*/

const LEVEL_NUMBER = 7
;

const TEST_LEVEL = LEVELS[LEVEL_NUMBER];

if (!TEST_LEVEL) {
    console.error("Level not found.");
    throw new Error("Invalid LEVEL_NUMBER");
}

console.clear();


printSection(`Testing Level ${TEST_LEVEL.id} : ${TEST_LEVEL.name}`);


const signatureMap = new Map();

for (let n = TEST_LEVEL.deckStart; n <= TEST_LEVEL.deckEnd; n++) {

    const signature = TEST_LEVEL.clues
        .map(clue => CLUES[clue].fn(n))
        .join("|");

    if (!signatureMap.has(signature))
        signatureMap.set(signature, []);

    signatureMap.get(signature).push(n);
}

let ambiguousGroups = 0;
let ambiguousNumbers = 0;

printSection("Ambiguous Groups");

for (const numbers of signatureMap.values()) {

    if (numbers.length > 1) {

        ambiguousGroups++;
        ambiguousNumbers += numbers.length;

        print(
            numbers.join(", ")
        );
    }
}

print("");

const totalNumbers =
    TEST_LEVEL.deckEnd - TEST_LEVEL.deckStart + 1;

const uniqueNumbers =
    totalNumbers - ambiguousNumbers;

/*printSection("Summary");

print("Numbers Tested :", totalNumbers);
print("Unique Numbers :", uniqueNumbers);
print("Ambiguous Groups :", ambiguousGroups);*/

if (ambiguousGroups === 0) {
    print("");
    print("✅ PERFECT");
    print("Every number is uniquely identifiable.");
}
else {
    print("");
    print("❌ Level is NOT uniquely solvable.");
}



const simulator = new Simulator(TEST_LEVEL);

const ais = [
    new randomAI(),
    new leastUsedRandomAI(),
    new greedyAI(),
    new costAwareGreedyAI()
];

for (const ai of ais) {
    printBenchmark(simulator, ai);
}
