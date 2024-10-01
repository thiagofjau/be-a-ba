export const game = {
    letters: [],
    error: false,
    streak: 0,
    inputedWords: [],
    newGame: function () {
        this.letters = [];

        //gerar letras

        const alphabeth = "abcdefghijlmnopqrstuv";

        this.letters = new Array(3).fill().map(function (letter) {
            const randomIndex = Math.floor(Math.random() * alphabeth.length);
            return alphabeth[randomIndex];
        });
        this.word = "";
        this.error = false;
        this.streak = 0;
        //criou array com 3 pos
    },
    validateWord: async function (word) { //com : pq é mais um atributo do obj game
        for (let i = 0; i < this.letters.length; i++) {
            if (word.includes(this.letters[i]) === false) {
                this.error = true;
                return false;
            }
        }

        if (this.inputedWords.includes(word)) {
            return false;
        }
        const rawData = await fetch(`https://api.dicionario-aberto.net/word/${word}`);
        const data = await rawData.json();

        if (!data.length) {
            return false;
        }

        this.inputedWords.push(word);
        this.streak++;
        return true;

    }
}