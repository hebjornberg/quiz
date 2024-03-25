
// Defining quiz questions through array 

const quizQuestion = [
    {
        question: "If I make the cocktail 'Dark and Stormy', what spirit am I using?",
        a: "Rum",
        b: "Vodka",
        c: "Cachaça",
        correct: "a",
    },
    {
        question: "Which country does the potato come from?",
        a: "Ireland",
        b: "Peru",
        c: "China",
        correct: "b",
    },
    {
        question: "Vilnius is the capital of which European country?",
        a: "Liechtenstein",
        b: "Lithuania",
        c: "Andorra",
        correct: "b",
    },
    {
        question: "What is the chemical formula for table salt?",
        a: "NaCl",
        b: "NaOH",
        c: "H2SO4",
        correct: "a",
    },

    {
        question: "What is xanthophobia?",
        a: "Fear of peanut butter sticking to the roof of your mouth",
        b: "Fear of the colour yellow",
        c: "Fear of being without your mobile phone",
        correct: "b",
    },

    {
        question: 'Who invented "The little black dress"?',
        a: "Coco Chanel",
        b: "Yves Saint Laurent",
        c: "Pierre Cardin",
        correct: "a",
    },

    {
        question: '"Siam" is the historical name of which country?',
        a: "Vietnam",
        b: "Sri Lanka",
        c: "Thailand",
        correct: "c",
    },

    {
        question: 'How many millilitres are an English pint?',
        a: "500 ml",
        b: "568 ml",
        c: "627 ml",
        correct: "b",
    },

    {
        question: 'How many time zones are there in Russia?',
        a: "10",
        b: "9",
        c: "11",
        correct: "c",
    },

    {
        question: 'Which country has the most islands in the world?',
        a: "Indonesia",
        b: "Sweden",
        c: "Philippines",
        correct: "b",
    },


];

const quiz= document.getElementById('quiz')
const answerSel = document.querySelectorAll('.answer')
const questionSel = document.getElementById('question')
const a_answer = document.getElementById('a_answer')
const b_answer = document.getElementById('b_answer')
const c_answer = document.getElementById('c_answer')
const nextBtn = document.getElementById('next')

let currentQuiz = 0;
let score = 0;

loadQuiz()

// Function to retrieve question from quizQuestion array 

function loadQuiz() {

    deselectAnswers()

    const currentQuizData = quizQuestion[currentQuiz]
    questionSel.innerText = currentQuizData.question
    a_answer.innerText = currentQuizData.a
    b_answer.innerText = currentQuizData.b
    c_answer.innerText = currentQuizData.c
}



function deselectAnswers() {
    answerSel.forEach(answerSe => answerSe.checked = false)
}


function getSelected() {
    let answer
    answerSel.forEach(answerSe => {
        if(answerSe.checked) {
            answer = answerSe.id
        }
    })
    return answer
}


nextBtn.addEventListener('click', () => {
    const answer = getSelected()
    if(answer) {
        if(answer === quizQuestion[currentQuiz].correct) {
            score++
        }
        currentQuiz++
        if(currentQuiz < quizQuestion.length) {
            loadQuiz()
        } else {
            let resultsHTML = `<h2 class="quiz-result">You got ${score} out of ${quizQuestion.length}</h2>`
            resultsHTML += `<button id="showAnswersBtn">Show Correct Answers</button>`
            quiz.innerHTML = resultsHTML

            const showAnswersBtn = document.getElementById('showAnswersBtn')
            showAnswersBtn.addEventListener('click', showCorrectAnswers)
        }
    }
})

// Function to show the correct answers 

function showCorrectAnswers() {
    let answersHTML = '<div id="answersContainer" style="max-height: 80vh; overflow-y: scroll;">'
    quizQuestion.forEach((question, i) => {
        answersHTML += `<h3>${question.question}</h3>`
        answersHTML += `<p>Answer: ${question[question.correct]}</p>`
    })
    answersHTML += '</div>'

    answersHTML += '<button id="reloadBtn">Back To Start</button>'

    quiz.innerHTML += answersHTML

    showAnswersBtn.removeEventListener('click', showCorrectAnswers)
    showAnswersBtn.style.display = 'none'

    const reloadBtn = document.getElementById('reloadBtn');
    reloadBtn.addEventListener('click', () => {
        window.location.href = 'index.html'
    });
}

// Function to return to landing page when refreshing

window.onload = function() {

    if(performance.navigation.type === 1) {

        window.location.href = 'index.html';
    }
}
