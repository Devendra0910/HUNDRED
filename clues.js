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

    numberOfFactors: {
        name: "Number of Factors",
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

    smallestPrimeFactor: {
        name: "Smallest Prime Factor",
        cost: 1,
        category: "orange",
        fn(n) {

            if (n < 2)
                return 1;

            for (let i = 2; i <= n; i++) {

                if (n % i === 0)
                    return i;
            }
        }
    },

    largestProperFactor: {
        name: "Largest Proper Factor",
        cost: 1,
        category: "orange",
        fn(n) {

            if (n === 1)
                return 1;

            return n / CLUES.smallestPrimeFactor.fn(n);
        }
    },

    largestPrimeFactor: {
        name: "Largest Prime Factor",
        cost: 1,
        category: "orange",
        fn(n) {

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

    distinctPrimeFactors: {
        name: "Distinct Prime Factors",
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
        name: "Digit Sum",
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

    lastDigit: {
        name: "Last Digit",
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
        name: "Binary Length",
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
        name: "Trailing Binary Zeros",
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
    }

};

