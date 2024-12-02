# Refactoring 
- alternativ 1
```js
let switchedDarkMode = () => {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
};

let switchedLightMode = () => {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
};
```
- alt 2
```js
document.getElementById("dark-mode-btn").addEventListener("click", switchedDarkMode);
document.getElementById("light-mode-btn").addEventListener("click", switchedLightMode);

```
- alt 3 
- updaterat 
```js
let toggleMode = (mode) => {
    body.classList.toggle("dark-mode", mode === "dark");
    body.classList.toggle("light-mode", mode === "light");
};

```
- alt 4 
```js
document.getElementById("dark-mode-btn").addEventListener("click", () => toggleMode("dark"));
document.getElementById("light-mode-btn").addEventListener("click", () => toggleMode("light"));

```

- ToggleMode-funktion:

- toggleMode ersätter separata funktioner för mörkt och ljust läge.
Klassen för dark-mode eller light-mode tillämpas baserat på det valda läget.
Eventhantering:

- Alla knappar för lägesbyte (.mode-btn) har en event listener 
kopplad till sig.

- Vid klick aktiveras rätt läge baserat på knappens data-mode-attribut.


- updatert html
- ARIA förbättrar tillgänglighet och hjälper skärmläsare
 hantera dynamiskt innehåll. Det uppfyller även WCAG-kraven.
 
```html
<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ankademin Quiz App</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main class="quiz-container">
        <header>
            <h1>Ankademin Världen Runt</h1>
            <p>av FE-24 Cruella Båmi १✌˚◡˚✌५</p>
            <h2>Välkommen till quizet!</h2>
            <div class="mode-switch">
                <button class="mode-btn" data-mode="dark">Mörkt Läge</button>
                <button class="mode-btn" data-mode="light">Ljust Läge</button>
            </div>
        </header>
        
        <form id="quiz-form" aria-labelledby="quiz-header">
            <section>
        
                <article>
                    <h3>1. Tysklands huvudstad är Frankfurt? (Sant/Falskt)</h3>
                    <label><input type="radio" name="quiz1" value="Sant"> Sant</label>
                    <label><input type="radio" name="quiz1" value="Falskt"> Falskt</label>
                </article>

                <article>
                    <h3>2. I vilket land ligger Sagrada Família? (Välj ett av alternativen)</h3>
                    <label><input type="radio" name="quiz2" value="Sverige"> Sverige</label>
                    <label><input type="radio" name="quiz2" value="Italien"> Italien</label>
                    <label><input type="radio" name="quiz2" value="Schweiz"> Schweiz</label>
                    <label><input type="radio" name="quiz2" value="Spanien"> Spanien</label>
                </article>

                <article>
                    <h3>3. Sydkoreas huvudstad är Seoul? (Sant/Falskt)</h3>
                    <label><input type="radio" name="quiz3" value="Sant"> Sant</label>
                    <label><input type="radio" name="quiz3" value="Falskt"> Falskt</label>
                </article>
            </section>
        </form>
        
        <section id="result-container" aria-live="polite">
            <p id="result-message"></p>
            <ul id="result-list" role="list"></ul>
        </section>

        <div class="quiz-controls">
            <button id="submit-quiz" type="button">Visa Resultat</button>
        </div>
    </main>
</body>
</html>

```
- 

```html
 <main class="quiz-container">
        <header>
            <h1>Ankademin Världen Runt</h1>
            <p>av FE-24 Cruella Båmi १✌˚◡˚✌५</p>
            <h2>Välkommen till quizet!</h2>
            <div class="mode-switch">
                <button class="mode-btn" data-mode="dark">Mörkt Läge</button>
                <button class="mode-btn" data-mode="light">Ljust Läge</button>
            </div>
        </header>
        
        <form id="quiz-form" aria-labelledby="quiz-header">
            <section>
          
            </section>
        </form>
        
        <section id="result-container" aria-live="polite">
            <p id="result-message"></p>
            <ul id="result-list" role="list"></ul>
        </section>

        <div class="quiz-controls">
            <button id="submit-quiz" type="button">Visa Resultat</button>
        </div>
    </main>
```