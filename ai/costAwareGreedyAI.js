class costAwareGreedyAI {

    chooseClue({ candidates, remainingClues, clueCosts }) {

        let bestClue = null;
        let bestScore = Infinity;

        for (const clue of remainingClues) {

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

            // Penalize expensive clues
            const score = worstCase + 0.5 * clueCosts[clue];

            if (score < bestScore) {
                bestScore = score;
                bestClue = clue;
            }

        }

        return bestClue;

    }

}
