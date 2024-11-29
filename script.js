import { quizData } from "./quizData.js";

let body = document.body;
let container = document.querySelector(".quiz-container");

let switchedDarkMode = () => {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
};

let switchedLightMode = () => {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
};

let startQuiz = () => {
    let quizForm = document.getElementById("quiz-form");
    let fieldsets = quizForm.querySelectorAll("fieldset");

    quizData.forEach((quiz, index) => {
        let fieldset = fieldsets[index];
        if (!fieldset) return;

        fieldset.querySelector("legend").textContent = quiz.title;

        let labels = fieldset.querySelectorAll("label");
        quiz.options.forEach((option, optionIndex) => {
            let label = labels[optionIndex];
            if (label) {
                let input = label.querySelector("input");
                let span = label.querySelector("span");
                input.name = quiz.id;
                input.value = optionIndex + 1; 
                span.textContent = option;
            }
        });
    });
};

let checkAllAnswered = () => {
    let allQuestions = [...document.querySelectorAll("fieldset")];
    let checkedAllAnswers = [];

    allQuestions.forEach((question) => {
        let selectedAnswer = [...question.querySelectorAll('input[type="radio"]:checked')];
        if (selectedAnswer.length > 0) {
            checkedAllAnswers.push(question); 
        }
    });

    let unansweredQuestions = allQuestions.filter((question) => !checkedAllAnswers.includes(question));

    if (unansweredQuestions.length > 0) {
        alert("Du måste svara på alla frågor!"); 
        return false;
    }
    return true;
};

let calculateResults = () => {
    if (!checkAllAnswered()) return;

    let score = 0;
    let resultList = document.getElementById("result-list");
    resultList.textContent = ""; 

    quizData.forEach((quiz, index) => {
        let selectedOption = document.querySelector(`input[name="${quiz.id}"]:checked`);
        let resultItem = document.createElement("li");

        if (selectedOption && quiz.correct.includes(parseInt(selectedOption.value))) {
            score++;
            resultItem.textContent = `Fråga ${index + 1}: Rätt!`;
            resultItem.style.color = "green";
        } else {
            resultItem.textContent = `Fråga ${index + 1}: Fel!`;
            resultItem.style.color = "red";
        }

        resultList.appendChild(resultItem);
    });

    let percentage = (score / quizData.length) * 100;
    let resultMessage = document.getElementById("result-message");

    if (percentage < 50) {
        resultMessage.textContent = `Underkänt: ${score} av ${quizData.length} (${percentage.toFixed(0)}%)`;
        resultMessage.style.color = "red";
    } else if (percentage <= 75) {
        resultMessage.textContent = `Bra: ${score} av ${quizData.length} (${percentage.toFixed(0)}%)`;
        resultMessage.style.color = "orange";
    } else {
        resultMessage.textContent = `Riktigt bra jobbat: ${score} av ${quizData.length} (${percentage.toFixed(0)}%)`;
        resultMessage.style.color = "green";
    }

    document.getElementById("result-container").style.display = "block";
};

document.getElementById("dark-mode-btn").addEventListener("click", switchedDarkMode);
document.getElementById("light-mode-btn").addEventListener("click", switchedLightMode);

document.getElementById("submit-quiz").addEventListener("click", () => {
    if (checkAllAnswered()) {
        calculateResults();
    }
});

startQuiz();
