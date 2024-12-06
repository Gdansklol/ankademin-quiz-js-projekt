import { quizData } from "./quizData.js";
import { resultData } from "./resultData.js";

let quizForm = document.getElementById("quiz-form");
let resultContainer = document.querySelector("#result-container");
let resultMessage = document.getElementById("result-message");
let resultList = document.getElementById("result-list")
let modeButtons = document.querySelectorAll(".mode-btn");
let clearQuiz = document.querySelector("#clear-quiz");

let selectedAnswers = JSON.parse(localStorage.getItem("quizAnswers")) || {} ;
let currentBgColor = localStorage.getItem("bgColor") || "default-color";

let changeBackground = (color) => {
    document.body.className = ""; 
    document.body.classList.add(color + "-mode"); 
    localStorage.setItem("bgColor", color); 
};

let pageLoadingBackground = () => {
    currentBgColor = localStorage.getItem("bgColor") || "default-color"
    document.body.classList.add(currentBgColor + "-mode");
};

let createOptionElement = (quiz, option, optionIndex) => {
    let label = document.createElement("label");
    label.classList.add("quiz-option");

    let input = document.createElement("input");
    input.type = quiz.correct.length > 1 ? "checkbox" : "radio";
    input.name = quiz.id;
    input.value = optionIndex + 1;

    if (selectedAnswers[quiz.id]?.includes(optionIndex + 1)) {
        input.checked = true;
    }
    
    input.addEventListener("change",() => controlAnswerChange(quiz.id, optionIndex +1));
    
    let span = document.createElement("span");
    span.textContent = option;

    label.append(input, span);
    return label;
};

let controlAnswerChange = (quizId, value) => {
    if(!selectedAnswers[quizId]) {
        selectedAnswers[quizId] = [];
    }

    let isCheckbox = quizData.find((quiz) => quiz.id === quizId).correct.length > 1;
    if(isCheckbox) {
        if (selectedAnswers[quizId].includes(value)) {
            selectedAnswers[quizId] = selectedAnswers[quizId].filter((val) => val !== value);
        } else {
            selectedAnswers[quizId].push(value);
        }
    } else {
        selectedAnswers[quizId] = [value];
    }

    localStorage.setItem("quizAnswers", JSON.stringify(selectedAnswers))
}

let startQuiz = () => {
    quizForm.textContent = ""; 

    if(!quizData || quizData.length === 0){
        console.error("Inga quiz data tillgängliga");

        let p = document.createElement("p");
        p.classList.add("p-err-message");
        p.textContent = "Inga quiz data tillgänglig";

        quizForm.append(p);
        return;
    }

    quizData.forEach((quiz) => {
        let section = document.createElement("section");
        section.classList.add("quiz-section");

        let header = document.createElement("header");
        header.textContent = quiz.title;
        header.classList.add("quiz-header");

        section.append(header);

        quiz.options.forEach((option, optionIndex) => {
            section.append(createOptionElement(quiz, option, optionIndex));
        });

        quizForm.append(section);
    });
    console.log("Quiz-rendering klar"); 
};

let checkAllAnswered = () => {
    let unAsweredQuestions = [...document.querySelectorAll(".quiz-section")].filter(
                                (section)=> !section.querySelector("input:checked"));
    if(unAsweredQuestions.length > 0) {
        alert("Du måste svara på alla frågor!");
        return false;
    }
        alert("Fantastiskt! Du har svarat på alla frågor!");
        return true;
};

let calculateResults = () => {
    if (!checkAllAnswered()) return;

    resultList.textContent = "";
    let score = 0;

    quizData.forEach((quiz, index) => {
        let selectedInputs = [...document.querySelectorAll(`input[name="${quiz.id}"]:checked`)];
        let selectedOptions = selectedInputs.map((input) => parseInt(input.value));
        
        let correctMatches = quiz.correct.filter((answer) => selectedOptions.includes(answer));
        let isCorrect = correctMatches.length === quiz.correct.length && selectedOptions.length === quiz.correct.length;

        let resultItem = document.createElement("li");
        resultItem.textContent = `Fråga ${index +1}: ${isCorrect ? "Rätt!" : "Fel"}`;
        resultItem.style.color = isCorrect ? "green" : "red";

        if(isCorrect) {
            score++;
        }
        resultList.append(resultItem);
    });

    let percentage = (score / quizData.length) * 100;
    let result = resultData.find((res) => res.condition(percentage));
    resultMessage.textContent = result.message(score, quizData.length, percentage);
    resultMessage.style.color = result.color;

    localStorage.setItem("quizResults", JSON.stringify({score, percentage}));
    resultContainer.style.display = "block";
};

let clearAllData = () => {
    if(confirm("Vill du radera all data?")){
        localStorage.clear();
        selectedAnswers = {} ;
        document.body.className = "";
        document.body.classList.add("default-color-mode")
        startQuiz();
        resultContainer.style.display = "none";
    }else {
        console.log("Radering avbröts.");
    }
};

pageLoadingBackground();
startQuiz(); 

document.getElementById("submit-quiz").addEventListener("click", calculateResults);
modeButtons.forEach(btn => {
    btn.addEventListener("click",()=> changeBackground(btn.dataset.mode));
});
clearQuiz.addEventListener("click", clearAllData);