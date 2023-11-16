// init DOM elements
const introElment = document.getElementById('intro');
const scoresElement = document.getElementById('scores');
const quizElement = document.getElementById('quiz');
const errorElement = document.getElementById('error');

// questions sections
const questionOfElement = document.getElementById('questionOf')
const questionElement = document.getElementById('question')
const answersElement = document.getElementById('answers')


// current question index
let currentQuestionIndex = 0;

// init the current user data
let userState = {
    id: '',
    name: '',
    lastAnswered: 0,
    score: 0
}

let peopleArray = [];

// init score state
let scoreState = [
    { id: '', name: '', score: 0, aswered: 0 }
]


// check answer
function qtnAnswered(x) {
    
    if (x) {

        userState.score += 1;
    }
}



// hide all
function hideDivs() {
    scoresElement.classList.add('hidden')
    introElment.classList.add('hidden')
    quizElement.classList.add('hidden')
}

// show intro element
function showIntro() {
    document.getElementById('name').value = ""
    hideDivs()
    introElment.classList.remove('hidden')
}


// show scores element
function showScores() {
    saveToArray()
    hideDivs()
    scoresElement.classList.remove('hidden')
}

// show Quiz
function showQuiz() {
    hideDivs()
    quizElement.classList.remove('hidden')
}

// show error
function onError(text) {
    errorElement.classList.remove('hidden')
    errorElement.innerHTML = text
    setTimeout(() => errorElement.classList.add('hidden'), 3000)
}

// validate name

function takeQuiz() {
    const name = document.getElementById('name')

    if (!name.value) {
        name.classList.add('border-danger');
        onError("Please provide your name");
        setTimeout(() => name.classList.remove('border-danger'), 3000)
        return;
    }


    saveUser()

    showQuiz()


    getQuestionAndOptions(currentQuestionIndex)

}

// display question of total questions
function numberQuestion(questionIndex) {

    let qtnNum = document.getElementById('questionOf');
    let x = questionIndex + 1;

    qtnNum.innerHTML = `Question ${x}/${questions.length}`;

    userState.lastAnswered = questionIndex;
}

// display question
function getQuestionAndOptions(i) {
    questionElement.innerHTML = questions[i].question

    answersElement.innerHTML = "";
    numberQuestion(i);

    for (let w = 0; w < questions[i].options.length; w++) {

        let option = questions[i].options[w]


        answersElement.innerHTML += `
        <div class="option" onClick="qtnAnswered(${option.isCorrect})">
        <label for="${option.id}" >
            <input type="radio" id="${option.id}" name="answer" onChange="onNextQuestion(${w})"> <span>${option.option}</span>
        </label>
        </div>
        `
    }

}


// next quetion 
function onNextQuestion(index) {

    console.log(questions[currentQuestionIndex].options[index]);

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex = currentQuestionIndex + 1;

        setTimeout(() => {

            getQuestionAndOptions(currentQuestionIndex)
        }, 1000)
    } else {

        setTimeout(() => showScores(), 2000)

    }


}

// restart user state
function restartUser() {
    userState = {
        id: '',
        name: '',
        lastAnswered: 0,
        score: 0
    }
}

// add record
function saveUser() {

    var uID = Date.now();
    const name = document.getElementById('name')
    let user = name.value.toUpperCase()

    userState.name = user;
    userState.id = uID;
    userState.lastAnswered = 0,
        userState.score = 0;
}


// save data to storage
function saveToArray() {

    peopleArray.push({
        id: userState.id,
        name: userState.name,
        lastAnswered: userState.lastAnswered,
        score: userState.score
    })
    saveUserState()

}


// save data to storage
function saveUserState() {
    localStorage.setItem('peopleArray', JSON.stringify(userState));
}

function saveScoreState() {
    localStorage.setItem('scoreState', JSON.stringify(scoreState));
}

// read data from storage
function getUserState() {
    if (localStorage.getItem('peopleArray')) {
        peopleArray = JSON.parse(localStorage.getItem('peopleArray'));
    }
}

function getScoreState() {
    if (localStorage.getItem('scoreState')) {
        scoreState = JSON.parse(localStorage.getItem('scoreState'));
    }
}



// render
function render() {



}

render()


// run this only oce
document.addEventListener('DOMContentLoaded', function () {
    // hide everything
    hideDivs()

    // show the intro
    showIntro()
    getScoreState()
}, false);