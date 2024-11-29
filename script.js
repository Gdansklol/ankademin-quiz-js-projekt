let body = document.body;
let container = document.querySelector(".quiz-container");

let correctAnswers = [
    { name: "quiz1", correct: "Falskt" },
    { name: "quiz2", correct: "Falskt" },
    { name: "quiz3", correct: "Sant" },
];

let checkAllAnswered = () => {
    let allQuestions = [...document.querySelectorAll("fieldset")];
    let checkedAllAnswers = [];

    allQuestions.forEach(question => {
        let selectedAnswer = [...question.querySelectorAll('input[type="radio"]:checked')];
        if (selectedAnswer.length > 0) {
            checkedAllAnswers.push(question); 
        }
    });

    let unansweredQuestions = allQuestions.filter(question => !checkedAllAnswers.includes(question));

    if (unansweredQuestions.length > 0) {
        alert("Du måste svara på alla frågor!"); 
        return false;
    }
    return true;
};

let switchedDarkMode = () => {
    body.style.backgroundColor = "#292b2e"; 
    container.style.backgroundColor = "#292b2e";
    container.style.color = "#ffffff";
};

let switchedLightMode = () => {
    body.style.backgroundColor = "#f3f7da"; 
    container.style.backgroundColor = "#f3f7da";
    container.style.color = "#000000";
};

document.getElementById("dark-mode-btn").addEventListener("click", switchedDarkMode);
document.getElementById("light-mode-btn").addEventListener("click", switchedLightMode);
document.getElementById("submit-quiz").addEventListener("click", () => {
    if (checkAllAnswered()) {
        let resultMessage = document.getElementById("result-message");
        resultMessage.textContent = "Alla frågor är besvarade!";
        resultMessage.style.color = "green"; 
    }
});
