#  Projekt - Ankademin Quiz med JS DOM

<h4>Detta projekt är en interaktiv quiz-applikation som använder
 JavaScript för att manipulera DOM och hantera quiz-data dynamiskt.
</h4>

- **let** används för att definiera omfördelningsbara variabler.
- För funktionsuttryck är det dock vanligt att använda 

- **const** om omtilldelning inte krävs.

## Projektfunktioner
### Huvudfunktioner
1. Mörkt/Ljust läge: Växla mellan mörkt och ljust läge 
för en bättre användarupplevelse.

2. Dynamisk rendering: Frågor och svarsalternativ genereras från en 
separat datafil (quizData.js).

3. Resultatberäkning: Poäng och prestation beräknas och visas med 
procentuellt resultat.

4. Visning av rätt/fel: 
Användaren ser vilka frågor som besvarades rätt och fel i detalj.

<hr>

## Tekniska Detaljer
### 1.  Dynamisk rendering av frågor

<h3>Frågor och svarsalternativ skapas dynamiskt baserat 
på quizData. Detta säkerställer att HTML hålls enkel och 
att nya frågor kan läggas till genom att bara uppdatera 
datafilen.
</h3>

- Sant/Falskt: 
Två radio-knappar genereras för varje fråga, 
där endast ett val kan göras.

- Fyra alternativ: Fyra radio-knappar genereras 
med tydlig koppling till motsvarande label via for-attribut.

### 2. Beräkning av resultat

- Resultatet beräknas genom att jämföra användarens svar 
med rätt svar i quizData:

- *Procentberäkning:* (score / totalQuestions) * 100.
- **toFixed(0)** används för att visa en hel procentsats utan decimaler.
Resultatet klassificeras:
< 50%: Underkänt (rött).
50%-75%: Bra (orange).
> 75%: Riktigt bra jobbat (grönt)

```js
    let percentage = (score / quizData.length) * 100;
    let resultMessage = document.getElementById("result-message");

    if (percentage < 50) {
        resultMessage.textContent = "";
        resultMessage.style.color = "red";
    } else if (percentage <= 75) {
        resultMessage.textContent = "";
        resultMessage.style.color = "orange";
    } else {
        resultMessage.textContent = "";
        resultMessage.style.color = "green";
    }
```
### 3.3. Visning av detaljerat resultat

- Användarens svar matchas med fråge-ID i quizData.
 För varje fråga:

> Om svaret är rätt: visas som "Rätt!" i grönt.
> Om svaret är fel: visas som "Fel!" i rött tillsammans
  med rätt svar.
> Detta görs med hjälp av en loop genom alla frågor och 
  användarens val.

  