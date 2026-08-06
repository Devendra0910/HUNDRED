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

            "greaterThan50",

            "oddEven",

            "divisibleBy3",

            "greaterThanReverse",
            
            "digitSum",
            
            "largestDigit"

        ]
    },


    5: {

    id: 5,

    name: "LCM and GCD",

    description: "Discover new ways to identify numbers.",

    difficulty: 5,

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
        level: 4
    },

    clues: [

        "gcdWith2",

        "gcdWith3",

        "lcmWith4",


        "lcmWith5",

        "gcdWith6",

        "gcdWith7"


    ]

    },

    9: {

    id: 9,

    name: "Divisors",

    description: "Use factorization to identify numbers.",

    difficulty: 9,

    category: "Divisors",

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
        level: 8
    },

    clues: [

        "numberOfDivisors",
        "smallestPrimeDivisor",
        "largestPrimeDivisor",
        "divisibleBy4",
        "divisibleBy6",
        "divisibleBy9"

    ]

    },
   6: {

    id: 6,

    name: "Modulo",

    description: "Use a variety of number attributes to identify the hidden number.",

    difficulty: 6,

    category: "Modulo",

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
        level: 5
    },

    clues: [

        "modulo3",

        "modulo4",

        "modulo5",

        "modulo6",

        "modulo7",

        "modulo8"

    ]

    },
  4: {

    id: 4,

    name: "Reverse",

    description: "Think backwards. Use clues based on the reversed number.",

    difficulty: 4,

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
        level: 3
    },

    clues: [


        "greaterThanReverse",

        "reverseEven",

        "reverseGreaterThan20",

        "reverseDifference",

        "reverseGreaterThan80",

        "reverseDigitSum"

    ]

  },
  2: {

    id: 2,

    name: "English",

    description: "Think using the English spelling of numbers.",

    difficulty: 2,

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
        level: 1
    },

    clues: [

        "englishStartingLetter",

        "englishLetterCount",
   
        "countOfLetterF",

        "englishLastLetter",

        "containsLetterW",

        "digitSum"

    ]

  },

  7: {

    id: 7,

    name: "Roman",

    description: "Think using Roman numerals.",

    difficulty: 7,

    category: "Roman",

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

    theme: "temple",

    background: "temple",

    music: "temple",

    unlockRequirement: {
        level: 6
    },

    clues: [

        "romanLength",

        "romanStartsWith",

        "romanEndsWith",

        "romanNumberOfI",

        "romanContainsL",

        "digitSum"

    ]

   },

    8: {

    id: 8,

    name: "Binary",

    description: "Think using binary representation.",

    difficulty: 8,

    category: "Binary",

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

    theme: "space",

    background: "space",

    music: "space",

    unlockRequirement: {
        level: 7
    },

    clues: [

        "binaryLength",

        "binaryOnes",

        "longestBinaryOnes",

        "trailingBinaryZeros",

        "binaryGreaterThanReverse",

        "digitSum"

    ]

    },


    3: {

    id: 3,

    name: "Digits",

    description: "Use decimal digit properties to identify the hidden number.",

    difficulty: 3,

    category: "Digits",

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

    theme: "city",

    background: "city",

    music: "city",

    unlockRequirement: {
        level: 2
    },

    clues: [

        "largestDigit",

        "digitProduct",

        "tensDigitOdd",

        "tensDigitComposite",

        "unitsDigitDivisibleBy3",

        "englishLastLetter"

    ]

    },

    10: {

    id: 10,

    name: "Prime",

    description: "Use prime numbers and prime factorization to identify the hidden number.",

    difficulty: 10,

    category: "Prime",

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

    theme: "cave",

    background: "cave",

    music: "cave",

    unlockRequirement: {
        level: 9
    },

    clues: [

        "largestPrimeDivisor",

        "reversePrime",

        "distanceToNearestPrime",

        "distanceToSecondNearestPrime",

        "largestDigit",  

        "lengthOfPrimeFactorisation"

    ]

    },

    11: {

    id: 11,

    name: "Special Numbers",

    description: "Identify the hidden number using its special mathematical identities.",

    difficulty: 11,

    category: "Special",

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

    theme: "observatory",

    background: "observatory",

    music: "observatory",

    unlockRequirement: {
        level: 10
    },

    clues: [

        "prime",

        "distanceToNearestFibonacci",

        "distanceToNearestTriangular",

        "distanceToNearestPowerOfTwo",

        "perfectSquare",

        "harshad"

    ]

    },

    12: {

    id: 12,

    name: "Atomic Number",

    description: "Identify the hidden number using its identity as a chemical element.",

    difficulty: 12,

    category: "Chemistry",

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

    theme: "atomic",

    background: "atomic",

    music: "atomic",

    unlockRequirement: {
        level: 11
    },

    clues: [

        "isMetal",

        "elementStartingLetter",

        "elementSuffix",

        "elementNameLength",

        "groupNumber",

        "atomicMassRounded"

    ]

    },



};
