console.log("Script included");
// Fatch the data and store in a variable
let quizData;
let url = "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple";

fetch(url).then((response) => {
    return response.json();
}).then(fetchedData);

// Constructing an object from fetch response
function fetchedData(quizObj) {
    quizData = quizObj.results.map((loadedQuestion) => {
        const formattedQuestion = {
            question: loadedQuestion.question,
        };
        const answerChoices = [...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
        answerChoices.splice(
            formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer
        );
        answerChoices.forEach((choice, index) => {
            formattedQuestion['choice' + (index + 1)] = choice;
        });
        return formattedQuestion;
    })
    // Load the quiz
    loadQuiz();
}

// initializing variables/Constants
const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const nameInputContainer = document.getElementById('nameInputContainer');
const nameInput = document.getElementById('nameInput');
const nameInputBtn = document.getElementById('nameInputBtn');

// Displaying quiz when someone enters their name
quiz.style.display = "none";

nameInputBtn.addEventListener('click', () => {
    if (nameInput.value != "") {
        quiz.style.display = "block";
        nameInputContainer.style.display = "none";
    }
    else {
        alert('Enter your name to start quiz');
    }
});

// Set currentQuiz & score initialy 0
let currentQuiz = 0;
let score = 0;

// initializing loadQuiz function
function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.choice1;
    b_text.innerText = currentQuizData.choice2;
    c_text.innerText = currentQuizData.choice3;
    d_text.innerText = currentQuizData.choice4;
};

// Function to deselect all radios
function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false);
};

// Function to check answer
function answerCheck() {
    let answer;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id
        }
    });
    return answer
};

// Event listener for submit answer and switch to next question
submitBtn.addEventListener('click', () => {
    const answer = answerCheck();
    if (answer) {
        if (answer == quizData[currentQuiz].answer) {
            score++
        }
        currentQuiz++
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = `<h2>${nameInput.value} you have answered ${score}/${quizData.length} questions correctly</h2>
                              <button onclick="location.reload()">Reload</button>`;
        }
    }
});