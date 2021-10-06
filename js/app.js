
const questionNumber = document.querySelector('.question-number');
const questionText = document.querySelector('.question-text');
const optionContainer = document.querySelector('.option-container');


let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];

// Push the questions into availableQuestions
function setAvailableQuestions(){
	const totalQuestion = quiz.length;

	for(let i = 0; i < totalQuestion; i++){
		availableQuestions.push(quiz[i]);
	}

}	

// Setar número de questões, a questão e as opções
function getNewQuestion(){
	// Setando o número da questão
	questionNumber.innerHTML = "Questão: " + (questionCounter + 1) + " de " + quiz.length;

	// Setando o texto da questão
	// Pegando de forma aleatória
	const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
	
	currentQuestion = questionIndex;
	questionText.innerHTML = currentQuestion.q;


	// Pegando a posição do questionIndex do availableQuestion Array
	const index1 = availableQuestions.indexOf(questionIndex);

	// Removendo do availableQuestions Array de acordo com index1 para que não se repita a questão
	availableQuestions.splice(index1,1);
	
	// setar opções
	// pegar o length das opções 
	const optionLen = currentQuestion.options.length;
	
	//push option into availableOptions array	
	for(let i = 0; i < optionLen; i++){
		availableOptions.push(i);
	}

 	optionContainer.innerHTML = '';

	let animationDelay = 0.15;

	// Criando as opções no HTML 
	for(let i = 0; i < optionLen; i++){
		// random option
		const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)]
		// Pegando a posição do 'optionIndex' de acordo com o 'availableOptions'
		const index2 = availableOptions.indexOf(optionIndex);
		// Removendo 'optionIndex' de acordo com o 'availableOptions'
		availableOptions.splice(index2,1);

		const option = document.createElement("div");
		option.innerHTML = currentQuestion.options[optionIndex];
		option.id = optionIndex;

		option.style.animationDelay = animationDelay + 's';
		animationDelay = animationDelay + 0.15;

		option.className = "option";
		optionContainer.appendChild(option);

		option.setAttribute("onclick", "getResult(this)");
	}


	questionCounter++;
}

// Função para pegar o resultado
function getResult(element){
	const id = parseInt(element.id);

	// Pegando a resposta e comparando com o ID da opção clicada
	if (id === currentQuestion.answer) {
		// Setando the cor verde para a opção correta
		element.classList.add("correct");
	}
	else{
		console.log("Resposta Errada");
		element.classList.add("wrong");

	}
}

function next(){
	if (questionCounter === quiz.length) {
		console.log("fim");
	}
	else{
		getNewQuestion();
	}
}

window.onload = function(){
	// First we will set all questions in availableQuestion array
	setAvailableQuestions();
	// Second we will call getNewQuestion() function
	getNewQuestion();
}
