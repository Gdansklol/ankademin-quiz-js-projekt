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

    quizData.forEach((quiz) => {
        let fieldset = document.createElement("fieldset");
        let legend = document.createElement("legend");
        legend.textContent = quiz.title;
        fieldset.append(legend);

        quiz.options.forEach((option, optionIndex) => {
            let label = document.createElement("label");
            let input = document.createElement("input");
            input.type = "radio";
            input.name = quiz.id;
            input.value = optionIndex + 1;

            let span = document.createElement("span");
            span.textContent = option;

            label.append(input);
            label.append(span);
            fieldset.append(label);
        });

        quizForm.append(fieldset);
    });
};

let checkAllAnswered = () => {
    let allQuestions = [...document.querySelectorAll("fieldset")]; 
    let unansweredQuestions = allQuestions.filter(
        (question) => !question.querySelector('input[type="radio"]:checked')
    ); 

    if (unansweredQuestions.length > 0) {
        alert("Du måste svara på alla frågor!");
        return false;
    }
    return true;
};

let calculateResults = () => {
    if (!checkAllAnswered()) return;

    let score = 0;
    let selectedAnswers = []; 
    let resultList = document.getElementById("result-list");
    resultList.textContent = "";

    quizData.forEach((quiz, index) => {
        let selectedOption = document.querySelector(`input[name="${quiz.id}"]:checked`);
        let resultItem = document.createElement("li");

        if (selectedOption) {
            selectedAnswers.push(parseInt(selectedOption.value)); 
            if (quiz.correct.includes(parseInt(selectedOption.value))) {
                score++;
                resultItem.textContent = `Fråga ${index + 1}: Rätt!`;
                resultItem.style.color = "green";
            } else {
                resultItem.textContent = `Fråga ${index + 1}: Fel!`;
                resultItem.style.color = "red";
            }
        } else {
            resultItem.textContent = `Fråga ${index + 1}: Inget svar!`;
            resultItem.style.color = "gray";
        }

        resultList.append(resultItem);
    });

    let sortedAnswers = [...selectedAnswers].sort((a, b) => a - b); 
    console.log("Sorted Answers:", sortedAnswers);

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

document.getElementById("submit-quiz").addEventListener("click", calculateResults);

startQuiz();
