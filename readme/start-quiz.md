# Steg-för-steg för att förstå och implementera koden

## Projektstruktur

- HTML
Grundstruktur som innehåller sektioner för quiz och resultat.
 Dynamisk data hanteras av JavaScript.

- CSS
Stöd för mörkt och ljust läge.
Enkel, responsiv design för bättre läsbarhet.

- JavaScript
Modulär design med separata funktioner för rendering, eventhantering och resultatberäkning.


- Användning
1. Starta quizet: Svara på alla frågor.
2. Växla läge: Använd knapparna för att växla mellan 
    mörkt och ljust läge.
3. Visa resultat: Klicka på "Visa Resultat" för att se dina 
    poäng och detaljerad feedback.


1. **Hämta quiz-formuläret:**
```js
   let quizForm = document.getElementById("quiz-form");
```

- Hittar <section>-elementet med id "quiz-form", 
där alla frågor finns.

2. Hämta alla frågefält:
```js
let fieldsets = quizForm.querySelectorAll("fieldset");

```
- Samlar alla <fieldset>-element i formuläret.
- Varje <fieldset> motsvarar en fråga.

```js
let quizForm = document.getElementById("quiz-form");
let fieldsets = quizForm.querySelectorAll("fieldset");
fieldset.querySelector("legend").textContent = quiz.title;

input.name = quiz.id;  
input.value = optionIndex + 1;  
span.textContent = option;

```
- Gå igenom frågorna:

```js
quizData.forEach((quiz, index) => { ... });

```
- Hitta rätt fältset:

```js
let fieldset = fieldsets[index];
if (!fieldset) return;

```
<p> Hämtar det <fieldset> som motsvarar frågans index.
 Om det inte finns, avbryter koden. </p>

 - Uppdatera svarsalternativen:
För varje svarsalternativ (option):

```js
let label = labels[optionIndex];
if (label) {
    let input = label.querySelector("input");
    let span = label.querySelector("span");
    input.name = quiz.id;
    input.value = optionIndex + 1; 
    span.textContent = option;
}

```
1. quiz.options.forEach

- forEach är en metod som går igenom varje element i en array.
- Här används den på quiz.options, som är en lista med alla svarsalternativ för en fråga.
Exempel: ["Sant", "Falskt"].

2. optionIndex som parameter i forEach

- forEach tar två parametrar: elementet (i det här fallet option) och indexet (i det här fallet optionIndex).
- optionIndex är positionen för varje alternativ i arrayen, t.ex.:
Första alternativet: optionIndex = 0.
Andra alternativet: optionIndex = 1.

- Fördjupning: quiz.options.forEach
Vad är forEach?
En metod som går igenom varje element i en array.
Här används den på quiz.options, som är en lista 
med svarsalternativ.

```js
["Sant", "Falskt"]

```

- optionIndex är positionen för alternativet i arrayen:
- Första alternativet: optionIndex = 0
- Andra alternativet: optionIndex = 1

```js
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

```