const perguntas = [
    /*mudar a ordem pro certo n ficar sempre no mesmo lugar*/
    {
        pergunta: "Qual é a tag HTML usada para criar um parágrafo?",
        respostas: [
            { text: "p", correct: true },
            { text: "text", correct: false },
            { text: "span", correct: false },
            { text: "br", correct: false },
        ]
    },
    {
        pergunta: "Em JavaScript, qual comando é usado para exibir uma mensagem no console do navegador?",
        respostas: [
            { text: "log()", correct: false },
            { text: "alert()", correct: false },
            { text: "console.log()", correct: true },
            { text: "print()", correct: false },
        ]
    },
    {
        pergunta: "Como você seleciona um elemento com a classe 'exemplo' em JavaScript?",
        respostas: [
            { text: "document.getElementById('exemplo')", correct: false },
            { text: "document.getElementByClassName('exemplo')", correct: false },
            { text: "document.querySelector('.exemplo')", correct: true },
            { text: "document.select('.exemplo')", correct: false },
        ]
    },
    {
        pergunta: "Qual das opções abaixo é uma unidade de medida válida em CSS?",
        respostas: [
            { text: "px", correct: false },
            { text: "em", correct: false },
            { text: "pt", correct: false },
            { text: "Todas as anteriores", correct: true },
        ]
    },
    {
        pergunta: "O que faz o código let x = 5; em JavaScript?",
        respostas: [
            { text: "Declara e inicializa uma variável chamada x com o valor 5", correct: true },
            { text: "Cria uma constante chamada x com valor 5", correct: false },
            { text: "Declara uma função chamada x com valor 5", correct: false },
            { text: " Faz a soma de x com 5", correct: false },
        ]
    },
    {
        pergunta: "Qual a diferença entre '==' e '===' em JavaScript?",
        respostas: [
            { text: "Não há diferença, ambos comparam apenas valores", correct: false },
            { text: "'==' compara valores, enquanto '===' compara valores e tipos de dados", correct: true },
            { text: "'==' compara apenas tipos de dados, enquanto '===' compara valores", correct: false },
            { text: "'===' é usado apenas em loops, enquanto '==' em condicionais", correct: false },
        ]
    },
    {
        pergunta: "Como você altera a cor de fundo de uma página usando CSS?",
        respostas: [
            { text: "background-color: #FF0000;", correct: true },
            { text: "bg-color: #FF0000;", correct: false },
            { text: "color: background #FF0000;", correct: false },
            { text: "background: color #FF0000;", correct: false },
        ]
    },
    {
        pergunta: "Em CSS, como você faz um texto ficar em negrito?",
        respostas: [
            { text: "text-weight: bold;", correct: false },
            { text: "font-weight: bold;", correct: true },
            { text: "font-style: bold;", correct: false },
            { text: "Todas as anteriores", correct: false },
        ]
    }
];

const perguntaElement = document.getElementById("pergunta");
const respostaButtons = document.getElementById("botoes-respostas");
const proxButton = document.getElementById("prox-btn");

let perguntaAtualIndex = 0;
let placar = 0;

function iniciarQuiz() {
    perguntaAtualIndex = 0;
    placar = 0;
    proxButton.innerHTML = "Próxima";
    mostrarPergunta();
}

function mostrarPergunta() {
    resetarEsquema();
    let perguntaAtual = perguntas[perguntaAtualIndex];
    let numeroPergunta = perguntaAtualIndex + 1;
    perguntaElement.innerHTML = numeroPergunta + ". " + perguntaAtual.pergunta;

    perguntaAtual.respostas.forEach(resposta => {
        const button = document.createElement("button")
        button.innerHTML = resposta.text;
        button.classList.add("btn");
        respostaButtons.appendChild(button);
        if (resposta.correct) {
            button.dataset.correct = resposta.correct;
        }
        button.addEventListener("click", selecionarResposta);
    });
}

function resetarEsquema() {
    proxButton.style.display = "none";
    while (respostaButtons.firstChild) {
        respostaButtons.removeChild(respostaButtons.firstChild);
    }
}

function selecionarResposta(escolha) {
    const selecionadaBtn = escolha.target;
    const taCerta = selecionadaBtn.dataset.correct === "true";
    if (taCerta) {
        selecionadaBtn.classList.add("acertou");
        placar++;
    } else {
        selecionadaBtn.classList.add("errou");
    }
    Array.from(respostaButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("acertou")
        }
        button.disabled = true;
    });
    proxButton.style.display = "block";
}

function mostrarPlacar() {
    resetarEsquema();
    perguntaElement.innerHTML = `Você acertou ${placar} de ${perguntas.length}!`
    proxButton.innerHTML = "Jogar Novamente!"
    proxButton.style.display = "block";
}


function manipularProxBtn() {
    perguntaAtualIndex++;
    if (perguntaAtualIndex < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarPlacar();
    }
}


proxButton.addEventListener("click", () => {
    if (perguntaAtualIndex < perguntas.length) {
        manipularProxBtn();
    } else {
        iniciarQuiz();
    }
});



iniciarQuiz();