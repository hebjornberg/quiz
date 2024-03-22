
const quizData = [
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


];
const quiz= document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const submitBtn = document.getElementById('submit')
let currentQuiz = 0
let score = 0
loadQuiz()
function loadQuiz() {
    deselectAnswers()
    const currentQuizData = quizData[currentQuiz]
    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
}
function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}
function getSelected() {
    let answer
    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}
submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    if(answer) {
       if(answer === quizData[currentQuiz].correct) {
           score++
       }
       currentQuiz++
       if(currentQuiz < quizData.length) {
           loadQuiz()
       } else {
           quiz.innerHTML = `
           <h2>You answered ${score}/${quizData.length} questions correctly</h2>
           <button onclick="location.reload()">Reload</button>
           `
       }
    }
})