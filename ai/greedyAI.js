class greedyAI {

    chooseClue({ candidates, remainingClues }) {

    let bestClue = null;
    let bestWorstCase = Infinity;

    for (const clue of remainingClues) {

        //console.log(clue);
        const groups = {};
        for (const number of candidates) {

          const answer = CLUES[clue].fn(number);

          if (!groups[answer]) {
            groups[answer] = 0;
          }

          groups[answer]++;
        }
        let worstCase = 0;

        for (const count of Object.values(groups)) {
          worstCase = Math.max(worstCase, count);
        }

        if (worstCase < bestWorstCase) {
             bestWorstCase = worstCase;
             bestClue = clue;
        }

        //console.log(clue, worstCase);
        //console.log(clue, groups);
    }
     
      return bestClue;
    }

}
