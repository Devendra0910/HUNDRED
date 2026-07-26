class leastUsedRandomAI {

    chooseClue({ remainingClues, clueCosts }) {

          let minCost = Infinity;

          for (const clue of remainingClues) {

              minCost = Math.min(minCost,clueCosts[clue]);

          }

          const cheapestClues = [];

          for (const clue of remainingClues) {
             if (clueCosts[clue] === minCost) {
                cheapestClues.push(clue);
            }
          }

          const index = Math.floor(Math.random() * cheapestClues.length);

          return cheapestClues[index];

    }

}
