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

        name: "Divisibility",

        description: "Master divisibility rules.",

        difficulty: 2,

        category: "Arithmetic",

        deckStart: 1,
        deckEnd: 100,

        questions: 5,

        startingCoins: 30,

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

            "oddEven",

            "divisibleBy3",
            "divisibleBy4",
            "divisibleBy5",
            "divisibleBy6",
            "divisibleBy7",
            "divisibleBy8",
            "divisibleBy9",
            "divisibleBy10",
            "divisibleBy11"

        ]

    }

};
