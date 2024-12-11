import { quizData } from "./quizData.js";
import { resultData } from "./resultData.js";

let quizForm = document.getElementById("quiz-form");
let resultContainer = document.querySelector("#result-container");
let resultMessage = document.getElementById("result-message");
let resultList = document.getElementById("result-list")
let modeButtons = document.querySelectorAll(".mode-btn");
let clearQuiz = document.querySelector("#clear-quiz");
let sortOrderSelect = document.querySelector("#sort-order-quiz");
let sortButton = document.querySelector("#sort-button");

let selectedAnswers = JSON.parse(localStorage.getItem("quizAnswers")) || {} ;
let currentBgColor = localStorage.getItem("bgColor") || "default-color";
let storedResults = JSON.parse(localStorage.getItem("storedResults")) || [] ;
let sortOrderKey = "QuizSortOrder";
let currentSortOrder = localStorage.getItem(sortOrderKey) || "asc";

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

let restoreResults = () => {
    let restoredResults = JSON.parse(localStorage.getItem("storedResults")) || [];

    if (restoredResults.length > 0) {
        resultList.textContent = "";
        storedResults.forEach((result)=> {
            let listItem = document.createElement("li");
            listItem.textContent = result.text;
            listItem.style.color = result.color;
            resultList.append(listItem);
        });
        resultMessage.textContent = localStorage.getItem("resultMessage") || "";
        resultContainer.style.display = "block";
    } else {
        console.log("Inag resultat att återställa.")
    }
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
    let resultsToStore = [];

    quizData.forEach((quiz, index) => {
        let selectedInputs = [...document.querySelectorAll(`input[name="${quiz.id}"]:checked`)];
        let selectedOptions = selectedInputs.map((input) => parseInt(input.value));
        
        let correctMatches = quiz.correct.filter((answer) => selectedOptions.includes(answer));
        let isCorrect = correctMatches.length === quiz.correct.length && selectedOptions.length === quiz.correct.length;

        let resultItem = document.createElement("li");
        resultItem.textContent = `Fråga ${index +1}: ${isCorrect ? "Rätt!" : "Fel"}`;
        resultItem.style.color = isCorrect ? "green" : "red";

        resultsToStore.push({text: resultItem.textContent, color: resultItem.style.color});

        if(isCorrect) {
            score++;
        }
        resultList.append(resultItem);
    });

    let percentage = (score / quizData.length) * 100;
    let result = resultData.find((res) => res.condition(percentage));
    resultMessage.textContent = result.message(score, quizData.length, percentage);
    resultMessage.style.color = result.color;

    localStorage.setItem("storedResults", JSON.stringify(resultsToStore));
    localStorage.setItem("resultMessage", resultMessage.textContent);
    resultContainer.style.display = "block";
};

let sortQuiz = () => {
    let sortOrder = sortOrderSelect.value;

    quizData.sort((a,b)=> {
       if(sortOrder === "asc") 
           return a.id - b.id ;
       if(sortOrder === "desc")
            return b.id - a.id;
        return 0;
    
    });
        localStorage.setItem(sortOrderKey, sortOrder);
        startQuiz();
        restoreResults();
   };

let clearAllData = () => {
    if(confirm("Vill du radera all data?")){
        localStorage.clear();

        selectedAnswers = {} ;
        storedResults = [];
        resultList.textContent = "";
        resultMessage.textContent = "";
        document.body.className = "";
        document.body.classList.add("default-color-mode");

        quizData.sort((a,b) => a.id - b.id);
        startQuiz();

        resultContainer.style.display = "none";
        console.log("Data har rensats nu.")
    }else {
        console.log("Radering avbröts.");
    }
};

pageLoadingBackground();
startQuiz(); 
restoreResults();

document.getElementById("submit-quiz").addEventListener("click", calculateResults);
modeButtons.forEach(btn => {
    btn.addEventListener("click",()=> changeBackground(btn.dataset.mode));
});
clearQuiz.addEventListener("click", clearAllData);
sortButton.addEventListener("click", (e) => {
    e.preventDefault();
    sortQuiz();
});