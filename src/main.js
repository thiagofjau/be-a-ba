
import { game } from './game.js';

const newGameButtonElem = document.getElementById("new-game");
const inputElem = document.getElementById("word");
const errorElem = document.getElementById("error");
const streakElem = document.getElementById("streak");

newGameButtonElem.addEventListener('click', function() {
    game.newGame();
    const letterElem = document.querySelectorAll(".square");

    for (let i = 0; i < letterElem.length; i++) {
        letterElem[i].innerHTML = game.letters[i].toUpperCase();
    }
 
    streakElem.style.visibility = "hidden"; //esconde a streak
    inputElem.disabled = false;
    inputElem.value = "";
    inputElem.focus();
    errorElem.style.visibility = "hidden";

}) 

document.getElementById("form").addEventListener('submit', async function(event) {

    event.preventDefault();
    const formData = new FormData(event.target); //formdata pega todas as infos de um form
    const word = formData.get('word');
    
    const isWordValid = await game.validateWord(word.toLocaleLowerCase());
    if (isWordValid) {
        streakElem.innerHTML = "Acertos: " + game.streak;
        streakElem.style.visibility = "visible"; //volta visibilidade

        streakElem.style.fontSize = "3rem";
        streakElem.style.display = "flex";
        streakElem.style.justifyContent = "end";
        streakElem.style.alignItems = "end";
        inputElem.value = ""; //limpa input para nova palavra/cheat streak
        inputElem.focus();
        errorElem.style.visibility = "hidden"; // se errar, aparecer, esconder se acertar
        // newGameButtonElem.innerHTML = "WIN! | Refresh"; //injeta outro texto no botao

    } else {
        errorElem.style.visibility = "visible";
    }

})