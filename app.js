//QUESTIONS ARRAY
const questions = [
{question: "Find the next number in the sequence: 43, 40, 44, 38, 44...", choice: ["37","38","43","44"], correct: "37",}, 
{question: "If a%b = ((a*b) + a)/b, what is 10%5?", choice: ["4", "5", "11","12"],correct: "12"},
{question: "What is the sum of the numbers in the blanks? ___,___, 32, -128, 512, ___", choice: ["-2054","-2050","416","2864"],correct: "-2054"}, 
{question: "If 3 zorks = 5 tangs, 14 rafs = 24 erts, 36 erts = 27 yutes, and 18 erts = 1 zork, how many tangs would be equivalent to 252 rafs?",choice: ["18","32","40","432"],correct: "40"},
{question: "If a#b = a * b + a - b, what is 4#6?",choice: ["12","22","26","28"],correct: "22"},
{question: "If a population doubles every 2 days, if today is Day 8, and if there are 1000 people, on what day were there 125 people?",choice: ["Day 1","Day 2","Day 3","Day 4"],correct: "Day 2"},
{question: "If a!b = a*b - a*a + a if one of the two numbers is odd, but a*b - b*b + b if both are odd, and if a&b = (a+b*a - b)!a, what is 3!4 + 3&4?",choice: ["14","24","33","37"],correct: "33"},
{question: "Find the next number in the sequence: 2, 5, 28, 257...",choice: ["3126","25728","46657","50000"],correct: "3126"},
{question: "Find the next number in the sequence: 3, 4, 15, 63...",choice: ["111","945","959","961"],correct: "945"},
{question: "Find the next number in the sequence: 17, 21, 41, 66, 112, 184",choice: ["296","300","303","308"],correct: "303"}
];

function setup() {
	addEventListeners();
	showIntroPage();
}

//displayQuestion runs generateQuestion if there are unasked questions; else it ends the quiz
function displayQuestion() {
	if(questions[currentQuestion]) {
		generateQuestion();
	} else {
		endQuiz();
	}
}


// handleSubmit should:
// A. check to see that an answer was selected; otherwise run cannotSubmit
// B. If answer was selected, hide submitBtn, hide answerForm, show nextBtn, and run giveFeedback
function handleSubmit () {
	let userAnswer = $("input[name='userPick']:checked").val();
	if(userAnswer) {
		//check if user submitted an answer 
			//hide submitBtn
			$submitBtn.hide();
			//show nextBtn 
			$nextBtn.show();
			// run checkAnswer to see if right or wrong, then pass that boolean into giveFeedback
			//giveFeedback also increments questionsCorrect or questionsWrong if necessary
			giveFeedback(checkAnswer(userAnswer));
			//disable radioBtns to prevent them from being further selected after submission
			for (let i = 0; i < questions[currentQuestion].choice.length; i++) {
				$(`input#option${i}`).prop("disabled", true);
			}
	} else {
			disableSubmit();
			cannotSubmit();
			setTimeout(enableSubmit, 3000);
	}	
}

	
function enableSubmit() {
	$submitBtn.prop("disabled", false);
}

function disableSubmit() {
	$submitBtn.prop("disabled", true);
}

//handleNext should hide itself and the feedback, show next question, increment currentQuestion
function handleNext() {
	// if(event.which === 13 || event.type === "click") {
		$feedbackDisplay.hide();
		$answers.html('');
		$questionDisplay.html('');
		$nextBtn.hide();
		$submitBtn.show();
		//increment currentQuestion so no question is reused
		currentQuestion++;
		//update currentQuestion display
		$questionStatus.text(currentQuestion +1);
		//now that currentQuestion is incremented, display next
		displayQuestion();
	// }
}



//checkAnswer should be passed the userAnswer, then compare it to the correct answer

 function checkAnswer(answer) {
 	//this returns a boolean
	return answer === questions[currentQuestion].correct;
}


$(setup);






