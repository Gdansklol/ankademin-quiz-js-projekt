import { quizData } from "./quizData.js";

let toggleMode = (mode) => {
    document.body.classList.remove("dark-mode", "light-mode");
    document.body.classList.add(`${mode}-mode`);
};

document.querySelectorAll(".mode-btn").forEach((btn) => {
    btn.addEventListener("click", () => toggleMode(btn.dataset.mode));
});

let startQuiz = () => {
    let quizForm = document.getElementById("quiz-form");
    quizForm.innerHTML = ""; 

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

            label.append(input, span);
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
        let selectedOption = document.querySelector(`input[name="${quiz.id}"]:checked`);
        let resultItem = document.createElement("li");

        if (selectedOption) {
            let selectedValue = parseInt(selectedOption.value);
            selectedAnswers.push(selectedValue); 
            if (quiz.correct.includes(selectedValue)) {
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

document.getElementById("submit-quiz").addEventListener("click", calculateResults);

startQuiz();
