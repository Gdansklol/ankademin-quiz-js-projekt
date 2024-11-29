# Funktion: `calculateResults`

1. funktionen räknar ut resultaten för quizet och 
visar poäng samt feedback.

### 1. Kontrollera om alla frågor är besvarade

```js
if (!checkAllAnswered()) return;
```
- checkAllAnswered(): Kontrollerar om användaren 
har svarat på alla frågor.
Om inte, avslutas funktionen direkt med **return**.

### 2. Förbered resultatlistan
```js
let score = 0;
let resultList = document.getElementById("result-list");
resultList.textContent = "";

```
- score: Räknar antalet rätta svar.
- resultList: Hämtar <ul>-elementet där resultaten ska visas.
- resultList.textContent = "": Rensar tidigare resultat från listan.

1. quizData.forEach: Itererar genom alla frågor i quizData.

2. selectedOption: Hämtar det alternativ som användaren valt (den markerade <input>).
resultItem: Skapar ett nytt <li>-element för att visa resultatet för frågan.
Om svaret är rätt:

3. score++: Ökar poängen.
resultItem.textContent: Visar texten "Rätt!" för frågan.
resultItem.style.color = "green": Färgar texten grön.
Om svaret är fel:

4. Visar texten "Fel!" och färgar den röd.
resultList.appendChild(resultItem): Lägger till varje resultat i listan.

```js
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

```

### 4.Beräkna procent och visa feedback

```js
let percentage = (score / quizData.length) * 100;
let resultMessage = document.getElementById("result-message");

```
- percentage: Räknar ut poängen som procent.
- resultMessage: Hämtar elementet där feedback-meddelandet ska visas.


### 5. Visa feedback baserat på poäng
> Om procenten är:
> Under 50%: Feedback-meddelandet visar 
"Underkänt" och texten blir röd.
> Mellan 50% och 75%: Feedback-meddelandet visar
 "Bra" och texten blir orange.
> Över 75%: Feedback-meddelandet visar 
"Riktigt bra jobbat" och texten blir grön.

```js
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

```