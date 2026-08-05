function toEnglish(n) {

    const words = {
        0:"zero",1:"one",2:"two",3:"three",4:"four",5:"five",
        6:"six",7:"seven",8:"eight",9:"nine",10:"ten",
        11:"eleven",12:"twelve",13:"thirteen",14:"fourteen",
        15:"fifteen",16:"sixteen",17:"seventeen",18:"eighteen",
        19:"nineteen",20:"twenty",30:"thirty",40:"forty",
        50:"fifty",60:"sixty",70:"seventy",80:"eighty",
        90:"ninety",100:"hundred"
    };

    if (words[n]) return words[n];

    const tens = Math.floor(n / 10) * 10;
    const ones = n % 10;

    return words[tens] + "-" + words[ones];
}

function gcd(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}


// [symbol, name, isMetal, isNobleGas, isNaturallyOccurring, isRadioactive, groupNumber]
const ELEMENTS = [
    ["H", "Hydrogen", 0, 0, 1, 0, 1],
    ["He", "Helium", 0, 1, 1, 0, 18],
    ["Li", "Lithium", 1, 0, 1, 0, 1],
    ["Be", "Beryllium", 1, 0, 1, 0, 2],
    ["B", "Boron", 0, 0, 1, 0, 13],
    ["C", "Carbon", 0, 0, 1, 0, 14],
    ["N", "Nitrogen", 0, 0, 1, 0, 15],
    ["O", "Oxygen", 0, 0, 1, 0, 16],
    ["F", "Fluorine", 0, 0, 1, 0, 17],
    ["Ne", "Neon", 0, 1, 1, 0, 18],
    ["Na", "Sodium", 1, 0, 1, 0, 1],
    ["Mg", "Magnesium", 1, 0, 1, 0, 2],
    ["Al", "Aluminium", 1, 0, 1, 0, 13],
    ["Si", "Silicon", 0, 0, 1, 0, 14],
    ["P", "Phosphorus", 0, 0, 1, 0, 15],
    ["S", "Sulfur", 0, 0, 1, 0, 16],
    ["Cl", "Chlorine", 0, 0, 1, 0, 17],
    ["Ar", "Argon", 0, 1, 1, 0, 18],
    ["K", "Potassium", 1, 0, 1, 0, 1],
    ["Ca", "Calcium", 1, 0, 1, 0, 2],
    ["Sc", "Scandium", 1, 0, 1, 0, 3],
    ["Ti", "Titanium", 1, 0, 1, 0, 4],
    ["V", "Vanadium", 1, 0, 1, 0, 5],
    ["Cr", "Chromium", 1, 0, 1, 0, 6],
    ["Mn", "Manganese", 1, 0, 1, 0, 7],
    ["Fe", "Iron", 1, 0, 1, 0, 8],
    ["Co", "Cobalt", 1, 0, 1, 0, 9],
    ["Ni", "Nickel", 1, 0, 1, 0, 10],
    ["Cu", "Copper", 1, 0, 1, 0, 11],
    ["Zn", "Zinc", 1, 0, 1, 0, 12],
    ["Ga", "Gallium", 1, 0, 1, 0, 13],
    ["Ge", "Germanium", 0, 0, 1, 0, 14],
    ["As", "Arsenic", 0, 0, 1, 0, 15],
    ["Se", "Selenium", 0, 0, 1, 0, 16],
    ["Br", "Bromine", 0, 0, 1, 0, 17],
    ["Kr", "Krypton", 0, 1, 1, 0, 18],
    ["Rb", "Rubidium", 1, 0, 1, 0, 1],
    ["Sr", "Strontium", 1, 0, 1, 0, 2],
    ["Y", "Yttrium", 1, 0, 1, 0, 3],
    ["Zr", "Zirconium", 1, 0, 1, 0, 4],
    ["Nb", "Niobium", 1, 0, 1, 0, 5],
    ["Mo", "Molybdenum", 1, 0, 1, 0, 6],
    ["Tc", "Technetium", 1, 0, 0, 1, 7],
    ["Ru", "Ruthenium", 1, 0, 1, 0, 8],
    ["Rh", "Rhodium", 1, 0, 1, 0, 9],
    ["Pd", "Palladium", 1, 0, 1, 0, 10],
    ["Ag", "Silver", 1, 0, 1, 0, 11],
    ["Cd", "Cadmium", 1, 0, 1, 0, 12],
    ["In", "Indium", 1, 0, 1, 0, 13],
    ["Sn", "Tin", 1, 0, 1, 0, 14],
    ["Sb", "Antimony", 0, 0, 1, 0, 15],
    ["Te", "Tellurium", 0, 0, 1, 0, 16],
    ["I", "Iodine", 0, 0, 1, 0, 17],
    ["Xe", "Xenon", 0, 1, 1, 0, 18],
    ["Cs", "Cesium", 1, 0, 1, 0, 1],
    ["Ba", "Barium", 1, 0, 1, 0, 2],
    ["La", "Lanthanum", 1, 0, 1, 0, 3],
    ["Ce", "Cerium", 1, 0, 1, 0, 3],
    ["Pr", "Praseodymium", 1, 0, 1, 0, 3],
    ["Nd", "Neodymium", 1, 0, 1, 0, 3],
    ["Pm", "Promethium", 1, 0, 0, 1, 3],
    ["Sm", "Samarium", 1, 0, 1, 0, 3],
    ["Eu", "Europium", 1, 0, 1, 0, 3],
    ["Gd", "Gadolinium", 1, 0, 1, 0, 3],
    ["Tb", "Terbium", 1, 0, 1, 0, 3],
    ["Dy", "Dysprosium", 1, 0, 1, 0, 3],
    ["Ho", "Holmium", 1, 0, 1, 0, 3],
    ["Er", "Erbium", 1, 0, 1, 0, 3],
    ["Tm", "Thulium", 1, 0, 1, 0, 3],
    ["Yb", "Ytterbium", 1, 0, 1, 0, 3],
    ["Lu", "Lutetium", 1, 0, 1, 0, 3],
    ["Hf", "Hafnium", 1, 0, 1, 0, 4],
    ["Ta", "Tantalum", 1, 0, 1, 0, 5],
    ["W", "Tungsten", 1, 0, 1, 0, 6],
    ["Re", "Rhenium", 1, 0, 1, 0, 7],
    ["Os", "Osmium", 1, 0, 1, 0, 8],
    ["Ir", "Iridium", 1, 0, 1, 0, 9],
    ["Pt", "Platinum", 1, 0, 1, 0, 10],
    ["Au", "Gold", 1, 0, 1, 0, 11],
    ["Hg", "Mercury", 1, 0, 1, 0, 12],
    ["Tl", "Thallium", 1, 0, 1, 0, 13],
    ["Pb", "Lead", 1, 0, 1, 0, 14],
    ["Bi", "Bismuth", 1, 0, 1, 0, 15],
    ["Po", "Polonium", 1, 0, 1, 1, 16],
    ["At", "Astatine", 0, 0, 1, 1, 17],
    ["Rn", "Radon", 0, 1, 1, 1, 18],
    ["Fr", "Francium", 1, 0, 1, 1, 1],
    ["Ra", "Radium", 1, 0, 1, 1, 2],
    ["Ac", "Actinium", 1, 0, 1, 1, 3],
    ["Th", "Thorium", 1, 0, 1, 1, 3],
    ["Pa", "Protactinium", 1, 0, 1, 1, 3],
    ["U", "Uranium", 1, 0, 1, 1, 3],
    ["Np", "Neptunium", 1, 0, 1, 1, 3],
    ["Pu", "Plutonium", 1, 0, 1, 1, 3],
    ["Am", "Americium", 1, 0, 0, 1, 3],
    ["Cm", "Curium", 1, 0, 0, 1, 3],
    ["Bk", "Berkelium", 1, 0, 0, 1, 3],
    ["Cf", "Californium", 1, 0, 0, 1, 3],
    ["Es", "Einsteinium", 1, 0, 0, 1, 3],
    ["Fm", "Fermium", 1, 0, 0, 1, 3]
];

const CLUES = {

    oddEven: {
        name: "Odd / Even",
        cost: 1,
        category: "blue",
        fn(n) {
            return n % 2 === 0 ? "Even" : "Odd";
        }
    },

    divisibleBy3: {
        name: "Divisible by 3?",
        cost: 1,
        category: "blue",
        fn(n) {
            return n % 3 === 0 ? "Yes" : "No";
        }
    },

    divisibleBy4: {
        name: "Divisible by 4?",
        cost: 1,
        category: "blue",
        fn(n) {
            return n % 4 === 0 ? "Yes" : "No";
        }
    },

    divisibleBy5: {
        name: "Divisible by 5?",
        cost: 1,
        category: "blue",
        fn(n) {
            return n % 5 === 0 ? "Yes" : "No";
        }
    },

    divisibleBy6: {
        name: "Divisible by 6?",
        cost: 1,
        category: "blue",
        fn(n) {
            return n % 6 === 0 ? "Yes" : "No";
        }
    },

    divisibleBy7: {
        name: "Divisible by 7?",
        cost: 1,
        category: "blue",
        fn(n) {
            return n % 7 === 0 ? "Yes" : "No";
        }
    },

    divisibleBy8: {
        name: "Divisible by 8?",
        cost: 1,
        category: "blue",
        fn(n) {
            return n % 8 === 0 ? "Yes" : "No";
        }
    },

    divisibleBy9: {
        name: "Divisible by 9?",
        cost: 1,
        category: "blue",
        fn(n) {
            return n % 9 === 0 ? "Yes" : "No";
        }
    },

    divisibleBy10: {
        name: "Divisible by 10?",
        cost: 1,
        category: "blue",
        fn(n) {
            return n % 10 === 0 ? "Yes" : "No";
        }
    },

    divisibleBy11: {
        name: "Divisible by 11?",
        cost: 1,
        category: "blue",
        fn(n) {
            return n % 11 === 0 ? "Yes" : "No";
        }
    },

    prime: {
        name: "Prime?",
        cost: 1,
        category: "green",
        fn(n) {

            if (n < 2) return "No";

            for (let i = 2; i * i <= n; i++) {
                if (n % i === 0) return "No";
            }

            return "Yes";
        }
    },

    composite: {
    name: "Composite?",
    cost: 1,
    category: "green",
    fn(n) {

        if (n < 2)
            return "No";

        for (let i = 2; i * i <= n; i++) {

            if (n % i === 0)
                return "Yes";
        }

        return "No";
    }
    },

    perfectSquare: {
        name: "Perfect Square?",
        cost: 1,
        category: "green",
        fn(n) {
            return Number.isInteger(Math.sqrt(n)) ? "Yes" : "No";
        }
    },

    perfectCube: {
        name: "Perfect Cube?",
        cost: 1,
        category: "green",
        fn(n) {
            return Number.isInteger(Math.cbrt(n)) ? "Yes" : "No";
        }
    },

    fibonacci: {
        name: "Fibonacci Number?",
        cost: 1,
        category: "green",
        fn(n) {

            function isSquare(x) {
                return Number.isInteger(Math.sqrt(x));
            }

            return (isSquare(5 * n * n + 4) || isSquare(5 * n * n - 4))
                ? "Yes"
                : "No";
        }
    },

    triangular: {
        name: "Triangular Number?",
        cost: 1,
        category: "green",
        fn(n) {

            const k = (Math.sqrt(8 * n + 1) - 1) / 2;

            return Number.isInteger(k)
                ? "Yes"
                : "No";
        }
    },

    harshad: {
        name: "Harshad Number?",
        cost: 1,
        category: "green",
        fn(n) {

            const sum = n
                .toString()
                .split("")
                .reduce((a, b) => a + Number(b), 0);

            return n % sum === 0
                ? "Yes"
                : "No";
        }
    },

    abundant: {
        name: "Abundant Number?",
        cost: 1,
        category: "green",
        fn(n) {

            let sum = 1;

            if (n === 1) return "No";

            for (let i = 2; i * i <= n; i++) {

                if (n % i === 0) {

                    sum += i;

                    if (i !== n / i)
                        sum += n / i;
                }
            }

            return sum > n
                ? "Yes"
                : "No";
        }
    },
        perfect: {
        name: "Perfect Number?",
        cost: 1,
        category: "green",
        fn(n) {
            return [6, 28].includes(n) ? "Yes" : "No";
        }
    },

    semiprime: {
        name: "Semiprime?",
        cost: 1,
        category: "green",
        fn(n) {

            let count = 0;
            let x = n;

            for (let i = 2; i * i <= x; i++) {

                while (x % i === 0) {
                    count++;
                    x /= i;
                }
            }

            if (x > 1) count++;

            return count === 2 ? "Yes" : "No";
        }
    },

    powerOfTwo: {
        name: "Power of Two?",
        cost: 1,
        category: "green",
        fn(n) {
            return (n & (n - 1)) === 0 ? "Yes" : "No";
        }
    },

    distanceToNearestFibonacci: {
        name: "Distance to Nearest Fibonacci",
        cost: 1,
        category: "green",
        fn(n) {

            function isFibonacci(x) {

                function isSquare(y) {
                    return y >= 0 && Number.isInteger(Math.sqrt(y));
                }

                return isSquare(5 * x * x + 4) || isSquare(5 * x * x - 4);
            }

            let d = 0;

            while (true) {

                if (isFibonacci(n - d) || isFibonacci(n + d))
                    return d;

                d++;
            }
        }
    },

    distanceToNearestTriangular: {
        name: "Distance to Nearest Triangular Number",
        cost: 1,
        category: "green",
        fn(n) {

            function isTriangular(x) {

                if (x < 0) return false;

                const k = (Math.sqrt(8 * x + 1) - 1) / 2;

                return Number.isInteger(k);
            }

            let d = 0;

            while (true) {

                if (isTriangular(n - d) || isTriangular(n + d))
                    return d;

                d++;
            }
        }
    },

    distanceToNearestPowerOfTwo: {
        name: "Distance to Nearest Power of Two",
        cost: 1,
        category: "green",
        fn(n) {

            function isPowerOfTwo(x) {
                return x > 0 && (x & (x - 1)) === 0;
            }

            let d = 0;

            while (true) {

                if (isPowerOfTwo(n - d) || isPowerOfTwo(n + d))
                    return d;

                d++;
            }
        }
    },

    numberOfDivisors: {
        name: "Number of Divisors",
        cost: 1,
        category: "orange",
        fn(n) {

            let count = 0;

            for (let i = 1; i * i <= n; i++) {

                if (n % i === 0) {

                    count++;

                    if (i !== n / i)
                        count++;
                }
            }

            return count;
        }
    },

    smallestPrimeDivisor: {
        name: "Smallest Prime Divisor",
        cost: 1,
        category: "orange",
        fn(n) {

            if (n < 2)
                return "N/A";

            for (let i = 2; i <= n; i++) {

                if (n % i === 0)
                    return i;
            }
        }
    },

    largestProperDivisor: {
        name: "Largest Proper Divisor",
        cost: 1,
        category: "orange",
        fn(n) {

            if (n === 1)
                return 1;

            return n / CLUES.smallestPrimeDivisor.fn(n);
        }
    },

    largestPrimeDivisor: {
        name: "Largest Prime Divisor",
        cost: 1,
        category: "orange",
        fn(n) {

            if (n < 2)
                return "N/A";

            let x = n;
            let ans = 1;

            for (let i = 2; i * i <= x; i++) {

                while (x % i === 0) {

                    ans = i;
                    x /= i;
                }
            }

            if (x > 1)
                ans = x;

            return ans;
        }
    },

    distinctPrimeDivisors: {
        name: "Distinct Prime Divisors",
        cost: 1,
        category: "orange",
        fn(n) {

            let x = n;
            let count = 0;

            for (let i = 2; i * i <= x; i++) {

                if (x % i === 0) {

                    count++;

                    while (x % i === 0)
                        x /= i;
                }
            }

            if (x > 1)
                count++;

            return count;
        }
    },

    exponentOf2: {
        name: "Exponent of 2",
        cost: 1,
        category: "orange",
        fn(n) {

            let c = 0;

            while (n % 2 === 0) {

                c++;
                n /= 2;
            }

            return c;
        }
    },

    exponentOf3: {
        name: "Exponent of 3",
        cost: 1,
        category: "orange",
        fn(n) {

            let c = 0;

            while (n % 3 === 0) {

                c++;
                n /= 3;
            }

            return c;
        }
    },

    squareFree: {
        name: "Square-free?",
        cost: 1,
        category: "orange",
        fn(n) {

            for (let i = 2; i * i <= n; i++) {

                if (n % (i * i) === 0)
                    return "No";
            }

            return "Yes";
        }
    },

    digitSum: {
        name: "Digit Sum in decimal",
        cost: 1,
        category: "purple",
        fn(n) {

            return n
                .toString()
                .split("")
                .reduce((a, b) => a + Number(b), 0);
        }
    },

    digitalRoot: {
        name: "Digital Root",
        cost: 1,
        category: "purple",
        fn(n) {

            while (n >= 10) {

                n = n
                    .toString()
                    .split("")
                    .reduce((a, b) => a + Number(b), 0);
            }

            return n;
        }
    },

    firstDigit: {
        name: "First Digit",
        cost: 1,
        category: "purple",
        fn(n) {
            return Number(n.toString()[0]);
        }
    },

    unitsDigit: {
        name: "Units Digit",
        cost: 1,
        category: "purple",
        fn(n) {
            return n % 10;
        }
    },

    largestDigit: {
        name: "Largest Digit",
        cost: 1,
       category: "purple",
        fn(n) {

            return Math.max(...n.toString().split("").map(Number));
        }
    },

    smallestDigit: {
        name: "Smallest Digit",
        cost: 1,
        category: "purple",
        fn(n) {

            return Math.min(...n.toString().split("").map(Number));
        }
    },
        numberOfDigits: {
        name: "Number of Digits",
        cost: 1,
        category: "purple",
        fn(n) {
            return n.toString().length;
        }
    },

    palindrome: {
        name: "Palindrome?",
        cost: 1,
        category: "purple",
        fn(n) {
            const s = n.toString();
            return s === s.split("").reverse().join("") ? "Yes" : "No";
        }
    },

    containsZero: {
        name: "Contains Digit 0?",
        cost: 1,
        category: "purple",
        fn(n) {
            return n.toString().includes("0") ? "Yes" : "No";
        }
    },

    repeatedDigits: {
        name: "Contains Repeated Digits?",
        cost: 1,
        category: "purple",
        fn(n) {
            const s = n.toString();
            return new Set(s).size < s.length ? "Yes" : "No";
        }
    },

    binaryLength: {
        name: "Length of binary number",
        cost: 1,
        category: "cyan",
        fn(n) {
            return n.toString(2).length;
        }
    },

    binaryOnes: {
        name: "Number of 1s in Binary",
        cost: 1,
        category: "cyan",
        fn(n) {
            return n.toString(2).split("").filter(x => x === "1").length;
        }
    },

    trailingBinaryZeros: {
        name: "Zeros at the end of binary number",
        cost: 1,
        category: "cyan",
        fn(n) {

            let c = 0;

            while (n % 2 === 0) {
                c++;
                n /= 2;
            }

            return c;
        }
    },

    longestBinaryOnes: {
    name: "Longest Run of 1s",
    cost: 1,
    category: "cyan",
    fn(n) {

        return Math.max(
            ...n
                .toString(2)
                .split("0")
                .map(s => s.length)
        );
    }
    },

    binaryGreaterThanReverse: {
    name: "Greater Than Binary Reverse?",
    cost: 1,
    category: "cyan",
    fn(n) {

        const binary = n.toString(2);

        const reversed = binary
            .split("")
            .reverse()
            .join("");

        const rev = parseInt(reversed, 2);

        return n > rev ? "Yes" : "No";
    }
    },

    binaryEndsEven: {
        name: "Binary Ends With 0?",
        cost: 1,
        category: "cyan",
        fn(n) {
            return n % 2 === 0 ? "Yes" : "No";
        }
    },

    romanLength: {
        name: "Roman Numeral Length",
        cost: 1,
        category: "brown",
        fn(n) {

            const vals = [
                [100,"C"],
                [90,"XC"],
                [50,"L"],
                [40,"XL"],
                [10,"X"],
                [9,"IX"],
                [5,"V"],
                [4,"IV"],
                [1,"I"]
            ];

            let s = "";

            for (const [v,r] of vals) {

                while (n >= v) {
                    s += r;
                    n -= v;
                }

            }

            return s.length;
        }
    },

    romanContainsX: {
        name: "Roman Contains X?",
        cost: 1,
        category: "brown",
        fn(n) {
            return CLUES.toRoman.fn(n).includes("X") ? "Yes" : "No";
        }
    },

    romanContainsV: {
        name: "Roman Contains V?",
        cost: 1,
        category: "brown",
        fn(n) {
            return CLUES.toRoman.fn(n).includes("V") ? "Yes" : "No";
        }
    },

    toRoman: {
        name: "_Roman",
        cost: 1,
        category: "brown",
        fn(n) {

            const vals = [
                [100,"C"],
                [90,"XC"],
                [50,"L"],
                [40,"XL"],
                [10,"X"],
                [9,"IX"],
                [5,"V"],
                [4,"IV"],
                [1,"I"]
            ];

            let s = "";

            for (const [v,r] of vals) {

                while (n >= v) {
                    s += r;
                    n -= v;
                }

            }

            return s;
        }
    },

    greaterThanReverse: {
        name: "Greater Than Reverse?",
        cost: 1,
        category: "pink",
        fn(n) {

            const rev = Number(
                n.toString().split("").reverse().join("")
            );

            return n > rev ? "Yes" : "No";
        }
    },

    reversePrime: {
        name: "Reverse Is Prime?",
        cost: 1,
        category: "pink",
        fn(n) {

            const rev = Number(
                n.toString().split("").reverse().join("")
            );

            return CLUES.prime.fn(rev);
        }
    },

    digitProduct: {
        name: "Product of Digits",
        cost: 1,
        category: "pink",
        fn(n) {

            return n
                .toString()
                .split("")
                .reduce((a,b)=>a*Number(b),1);
        }
    },

    digitDifference: {
        name: "Digit Difference",
        cost: 1,
        category: "pink",
        fn(n) {

            if (n < 10)
                return n;

            const d = n.toString().split("").map(Number);

            return Math.abs(d[0]-d[1]);
        }
    },

    modulo3: {
        name: "Remainder when divided by 3",
        cost: 1,
        category: "pink",
        fn(n) {
            return n % 3;
        }
    },
  
    modulo4: {
    name: "Remainder when divided by 4",
    cost: 1,
    category: "pink",
    fn(n) {
        return n % 4;
    }
    },

    modulo5: {
      name: "Remainder when divided by 5",
      cost: 1,
      category: "pink",
      fn(n) {
        return n % 5;
      }
    },

    modulo6: {
      name: "Remainder when divided by 6",
      cost: 1,
      category: "pink",
      fn(n) {
        return n % 6;
      }
    },

    modulo7: {
        name: "Remainder when divided by 7",
        cost: 1,
        category: "pink",
        fn(n) {
          return n % 7;
      }
    },

    modulo8: {
        name: "Remainder when divided by 8",
        cost: 1,
        category: "pink",
        fn(n) {
          return n % 8;
      }
    },


    greaterThan25: {
      name: "Greater than 25?",
      cost: 1,
      category: "blue",
      fn(n) {
        return n > 25 ? "Yes" : "No";
      }
    },

    greaterThan50: {
      name: "Greater than 50?",
      cost: 1,
      category: "blue",
      fn(n) {
        return n > 50 ? "Yes" : "No";
      }
    },
    greaterThan75: {
      name: "Greater than 75?",
      cost: 1,
      category: "blue",
      fn(n) {
        return n > 75 ? "Yes" : "No";
      }
    },
    greaterThan30: {
      name: "Greater than 30?",
      cost: 1,
      category: "blue",
      fn(n) {
        return n > 30 ? "Yes" : "No";
      }
    },
    greaterThan70: {
      name: "Greater than 70?",
      cost: 1,
      category: "blue",
      fn(n) {
        return n > 70 ? "Yes" : "No";
      }
   },
   calendarDate: {
    name: "Can be a Calendar Date?",
    cost: 1,
    category: "red",
    fn(n) {
        return n >= 1 && n <= 31 ? "Yes" : "No";
    }
},

wallClock: {
    name: "Can be on a Wall Clock?",
    cost: 1,
    category: "red",
    fn(n) {
        return n >= 1 && n <= 12 ? "Yes" : "No";
    }
},

minuteOfHour: {
    name: "Can be a Minute of the Hour?",
    cost: 1,
    category: "red",
    fn(n) {
        return n >= 0 && n <= 59 ? "Yes" : "No";
    }
},

englishLetterCount: {
    name: "Letters in English Name",
    cost: 1,
    category: "red",
    fn(n) {

        const words = {
            0:"zero",1:"one",2:"two",3:"three",4:"four",5:"five",
            6:"six",7:"seven",8:"eight",9:"nine",10:"ten",
            11:"eleven",12:"twelve",13:"thirteen",14:"fourteen",
            15:"fifteen",16:"sixteen",17:"seventeen",18:"eighteen",
            19:"nineteen",20:"twenty",30:"thirty",40:"forty",
            50:"fifty",60:"sixty",70:"seventy",80:"eighty",
            90:"ninety",100:"one hundred"
        };

        function toWords(x) {

            if (words[x]) return words[x];

            const tens = Math.floor(x / 10) * 10;
            const ones = x % 10;

            return words[tens] + "-" + words[ones];
        }

        return toWords(n).replace(/[\s-]/g, "").length;
    }
},

reverseGreaterThan50: {
    name: "Reverse Greater than 50?",
    cost: 1,
    category: "pink",
    fn(n) {

        const rev = Number(
            n.toString().split("").reverse().join("")
        );

        return rev > 50 ? "Yes" : "No";
    }
},

reverseEven: {
    name: "Reverse Is Even?",
    cost: 1,
    category: "pink",
    fn(n) {

        const rev = Number(
            n.toString().split("").reverse().join("")
        );

        return rev % 2 === 0 ? "Yes" : "No";
    }
},

reverseDivisibleBy3: {
    name: "Reverse Divisible by 3?",
    cost: 1,
    category: "pink",
    fn(n) {

        const rev = Number(
            n.toString().split("").reverse().join("")
        );

        return rev % 3 === 0 ? "Yes" : "No";
    }
},

reverseDifference: {
    name: "Difference with Reverse",
    cost: 1,
    category: "pink",
    fn(n) {

        const rev = Number(
            n.toString().split("").reverse().join("")
        );

        return Math.abs(n - rev);
    }
},

reverseSquare: {
    name: "Reverse Is Perfect Square?",
    cost: 1,
    category: "pink",
    fn(n) {

        const rev = Number(
            n.toString().split("").reverse().join("")
        );

        return Number.isInteger(Math.sqrt(rev)) ? "Yes" : "No";
    }
},

reverseDigitSum: {
    name: "Reverse Digit Sum",
    cost: 1,
    category: "pink",
    fn(n) {

        const rev = Number(
            n.toString().split("").reverse().join("")
        );

        return rev
            .toString()
            .split("")
            .reduce((a, b) => a + Number(b), 0);
    }
},

reverseGreaterThan20: {
     name: "Reverse Greater than 20?",
     cost: 1,
     category: "pink",
     fn(n) {         
          const rev = Number(
              n.toString().split("").reverse().join("")
         );             
         return rev > 20 ? "Yes" : "No";
     }
},      



reverseGreaterThan25: {
    name: "Reverse Greater than 25?",
    cost: 1,
    category: "pink",
    fn(n) {

        const rev = Number(
            n.toString().split("").reverse().join("")
        );

        return rev > 25 ? "Yes" : "No";
    }
},

reverseGreaterThan75: {
    name: "Reverse Greater than 75?",
    cost: 1,
    category: "pink",
    fn(n) {

        const rev = Number(
            n.toString().split("").reverse().join("")
        );

        return rev > 75 ? "Yes" : "No";
    }
},

reverseGreaterThan80: {
     name: "Reverse Greater than 80?",
     cost: 1,
     category: "pink",
     fn(n) {
 
         const rev = Number(
             n.toString().split("").reverse().join("")
         );
 
         return rev > 80 ? "Yes" : "No";
     }
 },  

englishStartingLetter: {
    name: "Starting Letter",
    cost: 1,
    category: "red",
    fn(n) {

        const s = toEnglish(n);

        return s.replace(/[\s-]/g, "")[0].toUpperCase();
    }
},

englishLastLetter: {
    name: "Last Letter",
    cost: 1,
    category: "red",
    fn(n) {

        const s = toEnglish(n).replace(/[\s-]/g, "");

        return s[s.length - 1].toUpperCase();
    }
},

englishVowelCount: {
    name: "Number of Vowels",
    cost: 1,
    category: "red",
    fn(n) {

        const s = toEnglish(n).replace(/[\s-]/g, "").toLowerCase();

        return [...s].filter(c => "aeiou".includes(c)).length;
    }
},

containsLetterO: {
    name: 'Contains Letter "O"?',
    cost: 1,
    category: "red",
    fn(n) {

        return toEnglish(n).toLowerCase().includes("o")
            ? "Yes"
            : "No";
    }
},

containsLetterS: {
      name: 'Contains Letter "S"?',
      cost: 1,
      category: "red",
      fn(n) {
              
          return toEnglish(n).toLowerCase().includes("s")
             ? "Yes"
             : "No";
      }
},

containsLetterN: {
        name: 'Contains Letter "N"?',
        cost: 1,
        category: "red", 
        fn(n) {               
             return toEnglish(n).toLowerCase().includes("n")
              ? "Yes"
              : "No";
          } 
},

containsLetterW: {
    name: 'Contains Letter "W"?',
    cost: 1,
    category: "red",
    fn(n) {

        return toEnglish(n).toLowerCase().includes("w")
            ? "Yes"
            : "No";
    }
},

containsLetterV: {
    name: 'Contains Letter "V"?',
    cost: 1,
    category: "red",
    fn(n) {

        return toEnglish(n).toLowerCase().includes("v")
            ? "Yes"
            : "No";
    }
},

countOfLetterF: {
    name: 'Count of Letter "F"',
    cost: 1,
    category: "red",
    fn(n) {

        return [...toEnglish(n).toLowerCase()]
            .filter(c => c === "f")
            .length;
    }
},


containsTY: {
    name: 'Contains "TY"?',
    cost: 1,
    category: "red",
    fn(n) {

        return toEnglish(n).toLowerCase().includes("ty")
            ? "Yes"
            : "No";
    }
},

englishWordCount: {
    name: "Number of Words",
    cost: 1,
    category: "red",
    fn(n) {

        return toEnglish(n)
            .split(/[\s-]+/)
            .length;
    }
},

romanContainsI: {
    name: "Roman Contains I?",
    cost: 1,
    category: "brown",
    fn(n) {
        return CLUES.toRoman.fn(n).includes("I") ? "Yes" : "No";
    }
},

romanContainsL: {
    name: "Roman Contains L?",
    cost: 1,
    category: "brown",
    fn(n) {
        return CLUES.toRoman.fn(n).includes("L") ? "Yes" : "No";
    }
},

romanContainsC: {
    name: "Roman Contains C?",
    cost: 1,
    category: "brown",
    fn(n) {
        return CLUES.toRoman.fn(n).includes("C") ? "Yes" : "No";
    }
},

romanStartsWith: {
    name: "Roman Starts With",
    cost: 1,
    category: "brown",
    fn(n) {
        return CLUES.toRoman.fn(n)[0];
    }
},

romanEndsWith: {
    name: "Roman Ends With",
    cost: 1,
    category: "brown",
    fn(n) {
        const s = CLUES.toRoman.fn(n);
        return s[s.length - 1];
    }
},

romanDistinctLetters: {
    name: "Distinct Roman Letters",
    cost: 1,
    category: "brown",
    fn(n) {
        return new Set(CLUES.toRoman.fn(n)).size;
    }
},

romanNumberOfI: {
    name: "Number of I's",
    cost: 1,
    category: "brown",
    fn(n) {
        return [...CLUES.toRoman.fn(n)].filter(c => c === "I").length;
    }
},

romanNumberOfV: {
    name: "Number of V's",
    cost: 1,
    category: "brown",
    fn(n) {
        return [...CLUES.toRoman.fn(n)].filter(c => c === "V").length;
    }
},

romanNumberOfX: {
    name: "Number of X's",
    cost: 1,
    category: "brown",
    fn(n) {
        return [...CLUES.toRoman.fn(n)].filter(c => c === "X").length;
    }
},

romanNumberOfL: {
    name: "Number of L's",
    cost: 1,
    category: "brown",
    fn(n) {
        return [...CLUES.toRoman.fn(n)].filter(c => c === "L").length;
    }
},

romanNumberOfC: {
    name: "Number of C's",
    cost: 1,
    category: "brown",
    fn(n) {
        return [...CLUES.toRoman.fn(n)].filter(c => c === "C").length;
    }
},
lcmWith2: {
    name: "LCM with 2",
    cost: 1,
    category: "orange",
    fn(n) {
        return (2 * n) / gcd(n, 2);
    }
},

lcmWith3: {
    name: "LCM with 3",
    cost: 1,
    category: "orange",
    fn(n) {
        return (3 * n) / gcd(n, 3);
    }
},

lcmWith4: {
    name: "LCM with 4",
    cost: 1,
    category: "orange",
    fn(n) {
        return (4 * n) / gcd(n, 4);
    }
},

lcmWith5: {
    name: "LCM with 5",
    cost: 1,
    category: "orange",
    fn(n) {
        return (5 * n) / gcd(n, 5);
    }
},

lcmWith6: {
    name: "LCM with 6",
    cost: 1,
    category: "orange",
    fn(n) {
        return (6 * n) / gcd(n, 6);
    }
},

lcmWith7: {
    name: "LCM with 7",
    cost: 1,
    category: "orange",
    fn(n) {
        return (7 * n) / gcd(n, 7);
    }
},
gcdWith2: {
    name: "GCD with 2",
    cost: 1,
    category: "orange",
    fn(n) {
        return gcd(n, 2);
    }
},

gcdWith3: {
    name: "GCD with 3",
    cost: 1,
    category: "orange",
    fn(n) {
        return gcd(n, 3);
    }
},

gcdWith4: {
    name: "GCD with 4",
    cost: 1,
    category: "orange",
    fn(n) {
        return gcd(n, 4);
    }
},

gcdWith5: {
    name: "GCD with 5",
    cost: 1,
    category: "orange",
    fn(n) {
        return gcd(n, 5);
    }
},

gcdWith6: {
    name: "GCD with 6",
    cost: 1,
    category: "orange",
    fn(n) {
        return gcd(n, 6);
    }
},

gcdWith7: {
    name: "GCD with 7",
    cost: 1,
    category: "orange",
    fn(n) {
        return gcd(n, 7);
    }
},

tensDigitOdd: {
    name: "Tens Digit Odd?",
    cost: 1,
    category: "purple",
    fn(n) {

        const tens = Math.floor(n / 10);

        return tens % 2 === 1 ? "Yes" : "No";
    }
},

tensDigitComposite: {
    name: "Tens Digit Composite?",
    cost: 1,
    category: "purple",
    fn(n) {

        const tens = Math.floor(n / 10);

        return [4, 6, 8, 9].includes(tens)
            ? "Yes"
            : "No";
    }
},

unitsDigitDivisibleBy3: {
    name: "Units Digit Divisible by 3?",
    cost: 1,
    category: "purple",
    fn(n) {

        const units = n % 10;

        return units % 3 === 0
            ? "Yes"
            : "No";
    }
},

distanceToNearestPrime: {
    name: "Distance to Nearest Prime",
    cost: 1,
    category: "green",
    fn(n) {

        function isPrime(x) {

            if (x < 2) return false;

            for (let i = 2; i * i <= x; i++) {
                if (x % i === 0) return false;
            }

            return true;
        }

        let d = 0;

        while (true) {

            if (isPrime(n - d) || isPrime(n + d))
                return d;

            d++;
        }
    }
},

distanceToSecondNearestPrime: {
    name: "Distance to 2nd Nearest Prime",
    cost: 1,
    category: "green",
    fn(n) {

        function isPrime(x) {

            if (x < 2) return false;

            for (let i = 2; i * i <= x; i++) {
                if (x % i === 0) return false;
            }

            return true;
        }

        const distances = [];

        for (let p = 2; p <= 101; p++) {

            if (isPrime(p))
                distances.push(Math.abs(n - p));
        }

        distances.sort((a, b) => a - b);

        return distances[1];
    }
},

lengthOfPrimeFactorisation: {
    name: "Length of Prime Factorisation",
    cost: 1,
    category: "orange",
    fn(n) {

        if (n === 1)
            return 0;

        let x = n;
        let count = 0;

        for (let i = 2; i * i <= x; i++) {

            while (x % i === 0) {

                count++;
                x /= i;
            }
        }

        if (x > 1)
            count++;

        return count;
    }
},

isMetal: {
    name: "Element Is a Metal?",
    cost: 1,
    category: "green",
    fn(n) {
        return ELEMENTS[n - 1][2] ? "Yes" : "No";
    }
},

isNobleGas: {
    name: "Element Is a Noble Gas?",
    cost: 1,
    category: "cyan",
    fn(n) {
        return ELEMENTS[n - 1][3] ? "Yes" : "No";
    }
},

symbolMismatch: {
    name: "Symbol's First Letter ≠ Name's First Letter?",
    cost: 1,
    category: "purple",
    fn(n) {
        const [sym, name] = ELEMENTS[n - 1];
        return sym[0].toUpperCase() !== name[0].toUpperCase() ? "Yes" : "No";
    }
},

elementStartingLetter: {
    name: "Element Starting Letter",
    cost: 1,
    category: "purple",
    fn(n) {
        return ELEMENTS[n - 1][1][0].toUpperCase();
    }
},

elementSuffix: {
    name: "Element Suffix",
    cost: 1,
    category: "cyan",
    fn(n) {
        return ELEMENTS[n - 1][1].slice(-3);
    }
},

elementNameLength: {
    name: "Letters in Element Name",
    cost: 1,
    category: "pink",
    fn(n) {
        return ELEMENTS[n - 1][1].length;
    }
},

isNaturallyOccurring: {
    name: "Element Found in Nature?",
    cost: 1,
    category: "brown",
    fn(n) {
        return ELEMENTS[n - 1][4] ? "Yes" : "No";
    }
},

groupNumber: {
    name: "Periodic Table Group Number",
    cost: 1,
    category: "brown",
    fn(n) {
        return ELEMENTS[n - 1][6];
    }
},

isRadioactive: {
    name: "Element Is Radioactive?",
    cost: 1,
    category: "orange",
    fn(n) {
        return ELEMENTS[n - 1][5] ? "Yes" : "No";
    }
}

};

