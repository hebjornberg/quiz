// Parts of this code has been based on a tutorial from Coding With Nick
// https://codingwithnick.in/create-a-quiz-app-using-html-css-javascript/

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
        question: 'The song "Strawberry Fields Forever" by the Beatles is about a landmark in their hometown Liverpool. Which landmark was it?',
        a: "A theater",
        b: "A farm",
        c: "An orphanage",
        correct: "c",
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

// Define variables 

const quiz= document.getElementById('quiz');
const answerSel = document.querySelectorAll('.answer');
const questionSel = document.getElementById('question');
const a_answer = document.getElementById('a_answer');
const b_answer = document.getElementById('b_answer');
const c_answer = document.getElementById('c_answer');
const nextBtn = document.getElementById('next');

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

// Function to clear answers before a new question  

function deselectAnswers() {
    answerSel.forEach(answerSe => answerSe.checked = false)
}


// Function for selected answer, does not save the answers the user has put in 

function getSelected() {
    let answer
    answerSel.forEach(answerSe => {
        if(answerSe.checked) {
            answer = answerSe.id
        }
    })
    return answer
}

/** Function for button to move on to next question. Will only function if an answer has been selected.
 * At end of quiz, button to show answers will appear. 
 */

// Button appearing to go to next question when selecting an answer
nextBtn.addEventListener('click', () => {
    const answer = getSelected()
    if(answer) {

        // Saves the answer the user has put in 
        quizQuestion[currentQuiz].answer = answer; 

        // Increments scores if the user puts in the correct answer
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
    let answersHTML = '<div id="answersContainer" style="max-height: 70vh; overflow-y: scroll;">'
    quizQuestion.forEach((question) => {

        answersHTML += `<h3>${question.question}</h3>`;
        answersHTML += `<ul>`;

        const options = ['a','b','c']; 
        
        options.forEach(option => {
        
        const optionText = question[option];    
        const isCorrect = option === question.correct; 
        const userAnswer = question.answer; 

        let optionHTML = `<li>${optionText}`; 
        if (isCorrect) {
            optionHTML += ' &#10004;'; 
        } 
        if (userAnswer === option && !isCorrect) {
            optionHTML += '&#10060;';
        }

        optionHTML += '</li>'
        
        answersHTML += optionHTML;

        });
    
        answersHTML += `</ul>`;
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
