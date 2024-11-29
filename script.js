let body = document.body;
let container = document.querySelector(".quiz-container");

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
