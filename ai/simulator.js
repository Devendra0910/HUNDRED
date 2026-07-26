class Simulator {

    constructor(level) {
      this.level = level;
    }

    play(ai) {


      const clueCosts = {};

      this.level.clues.forEach(clue => {
        clueCosts[clue] = 1;
      });

      const deck = [];

      for (let n = this.level.deckStart; n <= this.level.deckEnd; n++) {
        deck.push(n);
      }

      deck.sort(() => Math.random() - 0.5);

      //console.log(deck);

      const secrets = deck.slice(0, this.level.questions);

      let totalCoins = 0;

      for (const secret of secrets) {

        //console.log("----------------");
        //console.log("Secret:", secret);

        totalCoins += this.playQuestion(ai,secret,clueCosts);
      }
    


      //console.log("Total Coins:", totalCoins);

      return totalCoins;

    }

    playQuestion(ai, secret, clueCosts) {

      let candidates = [];

      for (let n = this.level.deckStart; n <= this.level.deckEnd; n++) {
          candidates.push(n);
      }

      const remainingClues = [...this.level.clues];


      let coins = 0;

      while (candidates.length > 1 && remainingClues.length > 0) {

        const clue = ai.chooseClue({
          candidates,
          remainingClues,
          clueCosts
        });

        coins += clueCosts[clue];

        clueCosts[clue]++;

        const clueIndex = remainingClues.indexOf(clue);
        remainingClues.splice(clueIndex, 1);

        //console.log("AI chose:", clue);
          
        //console.log("Chosen clue:", clue);
          
        const answer = CLUES[clue].fn(secret);

        //console.log(CLUES[clue].name, "=", answer);

        candidates = candidates.filter(number =>
          CLUES[clue].fn(number) === answer
        );

        //console.log("Remaining candidates:", candidates.length);
    }
  
    //console.log("Coins spent:", coins);

    return coins;


   }

}
