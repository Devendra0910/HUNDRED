class randomAI {

    chooseClue({ remainingClues }) {

        const index = Math.floor(Math.random() * remainingClues.length);

        return remainingClues[index];
    }

}
