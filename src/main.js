import { game } from './game.js';

const newGameButtonElem = document.getElementById("new-game");
const inputElem = document.getElementById("word");
const errorElem = document.getElementById("error");
const streakElem = document.getElementById("streak");
const wordListElem = document.getElementById("word-list");

// Função para iniciar um novo jogo
function startNewGame() {
    game.newGame();
    const letterElem = document.querySelectorAll(".square");

    for (let i = 0; i < letterElem.length; i++) {
        letterElem[i].innerHTML = game.letters[i].toUpperCase();
    }

    // Reinicia o estado da interface
    streakElem.style.visibility = "hidden"; // Esconde a streak
    inputElem.disabled = false;
    inputElem.value = "";
    inputElem.focus();
    errorElem.style.visibility = "hidden";

    // Limpa a lista de palavras acertadas
    wordListElem.innerHTML = "";
}

// Adiciona o evento para começar um novo jogo
newGameButtonElem.addEventListener('click', startNewGame);

// Função para manipular o envio do formulário
document.getElementById("form").addEventListener('submit', async function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const word = formData.get('word').toLocaleLowerCase();

    const isWordValid = await game.validateWord(word);
    if (isWordValid) {
        // Atualiza a streak
        streakElem.innerHTML = "Acertos: " + game.streak;
        streakElem.style.visibility = "visible";
        streakElem.style.fontSize = "1.5rem";
        streakElem.style.display = "flex";
        streakElem.style.justifyContent = "end";
        streakElem.style.alignItems = "end";
        inputElem.value = ""; // Limpa o input para nova palavra
        inputElem.focus();
        errorElem.style.visibility = "hidden";

        // Adiciona a palavra acertada na lista sem remover as anteriores
        const listItem = document.createElement("li");
        listItem.textContent = word.toUpperCase();
        wordListElem.style.listStyleType = "none";
        wordListElem.style.display = "inline";

        // Apende a nova palavra como um novo item da lista
        // listItem.textContent += " - ";
        listItem.style.marginRight = "10px"; // Adiciona um espaço entre as palavras
        wordListElem.appendChild(listItem);
        wordListElem.style.display = "flex";
        
        wordListElem.style.flexDirection = "row";
    } else {
        errorElem.style.visibility = "visible"; // Mostra o erro se a palavra for inválida
    }
});
