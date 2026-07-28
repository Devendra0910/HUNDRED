// levels.js

const LEVELS = {

    1: {
        //==========================
        // BASIC INFO
        //==========================

        id: 1,
        name: "Beginner",
        description: "Learn the basic clue types.",
        difficulty: 1,
        category: "Tutorial",

        //==========================
        // GAME RULES
        //==========================

        deckStart: 1,
        deckEnd: 100,

        questions: 5,

        startingCoins: 40,

        clueCostMultiplier: 1,
        clueCostIncrement: 1,

        allowRepeatedNumbers: false,

        //==========================
        // SCORING
        //==========================

        coinsPerCorrect: 0,
        coinsPerWrong: 0,

        bonusPerUnusedCoin: 0,

        scorePerCorrect: 1,

        //==========================
        // UI
        //==========================

        theme: "grass",
        background: "grassland",
        music: "beginner",

        //==========================
        // PROGRESSION
        //==========================

        unlockRequirement: null,

        //==========================
        // CLUES
        //==========================

        clues: [

            "greaterThan25",
            "greaterThan50",
            "greaterThan75",

            "oddEven",

            "divisibleBy3",
            "divisibleBy5",

            "greaterThanReverse",
            "perfectSquare",

            "digitSum",
            "largestDigit"

        ]
    },


    2: {

    id: 2,

    name: "Number Patterns",

    description: "Discover new ways to identify numbers.",

    difficulty: 2,

    category: "Patterns",

    deckStart: 1,
    deckEnd: 100,

    questions: 5,

    startingCoins: 40,

    clueCostMultiplier: 1,
    clueCostIncrement: 1,

    allowRepeatedNumbers: false,

    coinsPerCorrect: 0,
    coinsPerWrong: 0,

    bonusPerUnusedCoin: 0,

    scorePerCorrect: 1,

    theme: "desert",

    background: "desert",

    music: "desert",

    unlockRequirement: {
        level: 1
    },

    clues: [

        "unitsDigit",

        "divisibleBy11",

        "digitDifference",

        "prime",

        "greaterThan50",

        "numberOfDigits",

        "greaterThan30",

        "greaterThan70",

        "divisibleBy6",

        "perfectSquare"

    ]

    },

    3: {

    id: 3,

    name: "Factors",

    description: "Use factorization to identify numbers.",

    difficulty: 3,

    category: "Factors",

    deckStart: 1,
    deckEnd: 100,

    questions: 5,

    startingCoins: 40,

    clueCostMultiplier: 1,
    clueCostIncrement: 1,

    allowRepeatedNumbers: false,

    coinsPerCorrect: 0,
    coinsPerWrong: 0,

    bonusPerUnusedCoin: 0,

    scorePerCorrect: 1,

    theme: "mountain",

    background: "mountain",

    music: "mountain",

    unlockRequirement: {
        level: 2
    },

    clues: [

        "divisibleBy4",
        "divisibleBy6",
        "divisibleBy8",

        "numberOfFactors",

        "smallestPrimeFactor",

        "largestPrimeFactor",

        "distinctPrimeFactors",

        "powerOfTwo",

        "divisibleBy9",

        "prime"

    ]

    },
   4: {

    id: 4,

    name: "Attributes",

    description: "Use a variety of number attributes to identify the hidden number.",

    difficulty: 4,

    category: "Attributes",

    deckStart: 1,
    deckEnd: 100,

    questions: 5,

    startingCoins: 40,

    clueCostMultiplier: 1,
    clueCostIncrement: 1,

    allowRepeatedNumbers: false,

    coinsPerCorrect: 0,
    coinsPerWrong: 0,

    bonusPerUnusedCoin: 0,

    scorePerCorrect: 1,

    theme: "snow",

    background: "snow",

    music: "snow",

    unlockRequirement: {
        level: 3
    },

    clues: [

        "calendarDate",

        "divisibleBy3",

        "minuteOfHour",

        "largestDigit",

        "distinctPrimeFactors",

        "englishLetterCount",

        "greaterThanReverse",

        "modulo3",

        "prime",

        "oddEven"

    ]

    },
  5: {

    id: 5,

    name: "Reverse",

    description: "Think backwards. Use clues based on the reversed number.",

    difficulty: 5,

    category: "Reverse",

    deckStart: 1,
    deckEnd: 100,

    questions: 5,

    startingCoins: 40,

    clueCostMultiplier: 1,
    clueCostIncrement: 1,

    allowRepeatedNumbers: false,

    coinsPerCorrect: 0,
    coinsPerWrong: 0,

    bonusPerUnusedCoin: 0,

    scorePerCorrect: 1,

    theme: "volcano",

    background: "volcano",

    music: "volcano",

    unlockRequirement: {
        level: 4
    },

    clues: [

        "reverseGreaterThan50",

        "greaterThanReverse",

        "reverseEven",

        "reverseGreaterThan25",

        "divisibleBy4",

        "reverseDifference",

        "reverseGreaterThan75",

        "greaterThan50",

        "oddEven",

        "reverseDigitSum"

    ]

  },
  6: {

    id: 6,

    name: "English",

    description: "Think using the English spelling of numbers.",

    difficulty: 6,

    category: "English",

    deckStart: 1,
    deckEnd: 100,

    questions: 5,

    startingCoins: 40,

    clueCostMultiplier: 1,
    clueCostIncrement: 1,

    allowRepeatedNumbers: false,

    coinsPerCorrect: 0,
    coinsPerWrong: 0,

    bonusPerUnusedCoin: 0,

    scorePerCorrect: 1,

    theme: "library",

    background: "library",

    music: "library",

    unlockRequirement: {
        level: 5
    },

    clues: [

        "englishStartingLetter",

        "englishLetterCount",

        "englishVowelCount",

        "containsLetterO",

        "containsTY",

        "englishLastLetter",

        "greaterThan30",

        "containsLetterS",

        "divisibleBy3",

        "largestDigit"

    ]

  }

};
