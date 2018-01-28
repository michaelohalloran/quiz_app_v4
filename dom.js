//PAGE VARIABLES
let $startSection = $(".start-section");
let $quizSection = $(".quiz-section");
let $finalSection = $(".final-section");

//BUTTON VARIABLES
let $startBtn = $("#startBtn");
let $submitBtn = $("#submitBtn");
let $playAgainBtn = $("#play-again");
let $nextBtn = $("#nextBtn");

//QUESTION/FEEDBACK VARIABLES
let $answerForm = $("#answer-form");
let $answers = $("#answers");
let $questionDisplay = $("#question-show");
let currentQuestion = 0;
let $feedbackDisplay = $("#feedback-message");
let $questionStatus = $("#current-question");
let $scoreCorrect = $("#current-correct");
let $scoreWrong = $("#current-wrong");
let $finalScoreDisplay = $("#final-score");
let userAnswer;
let questionsCorrect = 0;
let questionsWrong = 0;
const correctAnswerFeedback = 'Great job!';
const checkMark = $("<img class='feedback-mark' src='https://freeiconshop.com/wp-content/uploads/edd/checkmark-flat.png' alt='correct'>");
const wrongMark = $("<img class='feedback-mark' src='http://clipart-library.com/data_images/49142.png' alt='wrong'>");
const wrongAnswerFeedback = `Sorry, the correct answer is `;
const mustAnswer = 'You must select an answer';


//Event listeners for the buttons
function addEventListeners() {
	$startBtn.on("click", clickStart);

	$submitBtn.on("click", handleSubmit);
	$nextBtn.on("click", handleNext);

	$answerForm.on("keypress", function(event) {
		if(event.which === 13) {
			// event.stopPropagation();
			if ($nextBtn.css('display') !== 'none') { 
				handleNext();
			} else if($submitBtn.css('display') !== 'none') {
				handleSubmit();
			}
		}		
	})

	$playAgainBtn.on("click", clickPlayAgain);
}


//showIntroPage should hide everything but the start-content
function showIntroPage() {
	$quizSection.hide();
	$finalSection.hide();
	questionsCorrect = 0;
	questionsWrong = 0;
	$startSection.show();
}
//clickStart runs on clicking startButton
//hides all but the $quizPage, shows the initial score and currentQuestion...
//and generates the first question and radio inputs
function clickStart () {
		$startSection.hide();
		$finalSection.hide();
		$quizSection.show();
		$questionStatus.text(currentQuestion +1);
		$scoreCorrect.text(questionsCorrect);
		$scoreWrong.text(questionsWrong);
		displayQuestion();
} 


//generateQuestion runs when displayQuestion does
//this generates a fieldset with the current question, and appends 4 radio answers to answerForm
function generateQuestion() {
	//insert currentQuestion into fieldset
	$questionDisplay.append(`${questions[currentQuestion].question}`);
	//loop through questions array and append 4 radio buttons with the answer choices
	for(let i = 0; i < questions[currentQuestion].choice.length; i++) {
		$answers.append(`
			<label for='option${i}'>
			<input type="radio" class="radioBtn" id="option${i}" aria-labelledby="radioGroup" name="userPick" required="required" value='${questions[currentQuestion].choice[i]}'>
			${questions[currentQuestion].choice[i]}</label>
		`);		
	}
}


//cannotSubmit runs inside clickSubmit function, if user tries to submit without answering
function cannotSubmit() {
	$feedbackDisplay.text(mustAnswer).show().fadeOut(3000);
}

//giveFeedback receives a boolean from checkAnswer,and shows the appropriate feedback string
//it also needs to show the feedbackSection with the string shown
function giveFeedback(isAnswerCorrect) {
	//if $userAnswer is true
	if(Boolean(isAnswerCorrect) === true) {
		//show the correctAnswer feedback
		$feedbackDisplay.text(correctAnswerFeedback).append(checkMark).show();
		//increment questionsCorrect
		questionsCorrect++;
		//update questionsCorrect display
		$scoreCorrect.text(questionsCorrect);

	} else {
		//otherwise show the wrongAnswer feedback string
		$feedbackDisplay.text(wrongAnswerFeedback + questions[currentQuestion].correct).append(wrongMark).show();
		//increment questionsWrong
		questionsWrong++;
		//update questionsWrong display
		$scoreWrong.text(questionsWrong);
	}
}

//endQuiz should display the final page and run giveFinalScore
function endQuiz() {
	$startSection.hide();
	$quizSection.hide();
	$finalSection.show();
	giveFinalScore();
}

//giveFinalScore should insert the updated questionsCorrect variable into the final page score display
function giveFinalScore() {
	$finalScoreDisplay.text(questionsCorrect);
}

//clickPlayAgain should reset all tracking variables and return to question #1
function clickPlayAgain() {
	if(event.which===13 || event.type === "click") {
		currentQuestion = 0;
		questionsCorrect = 0;
		showIntroPage();	
	}
	
}
