import { quizData } from "./quizData.js";
import { resultData } from "./resultData.js";

let modeButtons = document.querySelectorAll(".mode-btn");

let currentMode = localStorage.getItem("themeMode") || "light";

let toggleMode = (mode) => {
    document.body.className = ""; 
    document.body.classList.add(mode + "-mode"); 

    localStorage.setItem("themeMode", mode); 
};
let restoreMode = () => {
    document.body.className = "";

    let className = currentMode + "-mode";
    document.body.classList.add(className);
};

document.querySelectorAll(".mode-btn").forEach((btn) => {
    btn.addEventListener("click", () => toggleMode(btn.dataset.mode));
});

let createOptionElement = (quiz, option, optionIndex) => {
    let label = document.createElement("label");
    label.classList.add("quiz-option");

    let input = document.createElement("input");
    input.type = quiz.correct.length > 1 ? "checkbox" : "radio";
    input.name = quiz.id;
    input.value = optionIndex + 1;

    let span = document.createElement("span");
    span.textContent = option;

    label.append(input, span);
    return label;
};

let startQuiz = () => {
    let quizForm = document.getElementById("quiz-form");
    quizForm.innerHTML = ""; 

    quizData.forEach((quiz) => {
        let section = document.createElement("section");
        section.classList.add("quiz-section");

        let header = document.createElement("header");
        header.textContent = quiz.title;
        header.classList.add("quiz-header");

        section.appendChild(header);

        quiz.options.forEach((option, optionIndex) => {
            section.appendChild(createOptionElement(quiz, option, optionIndex));
        });

        quizForm.appendChild(section);
    });
    console.log("Quiz-rendering klar"); 
};

let checkAllAnswered = () => {
    let allQuestions = [...document.querySelectorAll(".quiz-section")];
    let unansweredQuestions = allQuestions.filter(
        (question) => !question.querySelector('input[type="radio"]:checked, input[type="checkbox"]:checked')
    );
    if (unansweredQuestions.length > 0) {
        alert("Du måste svara på alla frågor!");
        return false;
    }
    alert("Fantastiskt! Du har svarat på alla frågor!");
    return true;
};

let calculateResults = () => {
    if (!checkAllAnswered()) return;

    let score = 0;
    let selectedAnswers = [];
    let resultList = document.getElementById("result-list");
    resultList.textContent = "";

    quizData.forEach((quiz, index) => {
        let selectedOptions = [...document.querySelectorAll(`input[name="${quiz.id}"]:checked`)]
            .map((input) => parseInt(input.value));
        selectedAnswers.push(...selectedOptions);

        let resultItem = document.createElement("li");
        let correctMatches = quiz.correct.filter((ans) => selectedOptions.includes(ans));
        let isCorrect =
            correctMatches.length === quiz.correct.length && selectedOptions.length === quiz.correct.length;

        if (isCorrect) {
            score++;
            resultItem.textContent = `Fråga ${index + 1}: Rätt!`;
            resultItem.style.color = "green";
        } else {
            resultItem.textContent = `Fråga ${index + 1}: Fel!`;
            resultItem.style.color = "red";
        }
        resultList.append(resultItem);
    });

    let percentage = (score / quizData.length) * 100;
    let resultMessage = document.getElementById("result-message");

    let result = resultData.find((res) => res.condition(percentage));
    resultMessage.textContent = result.message(score, quizData.length, percentage);
    resultMessage.style.color = result.color;

    document.getElementById("result-container").style.display = "block";
};

restoreMode(); 
startQuiz(); 

document.getElementById("submit-quiz").addEventListener("click", calculateResults);
modeButtons.forEach(btn => {
    btn.addEventListener("click",()=> toggleMode(btn.dataset.mode));
});

