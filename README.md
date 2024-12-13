#  Projekt - Ankademin Quiz med JS DOM

<h4>Detta projekt är en interaktiv quiz-applikation som använder
 JavaScript för att manipulera DOM och hantera quiz-data dynamiskt.
</h4>

- **let** används för att definiera omfördelningsbara variabler.
- För funktionsuttryck är det dock vanligt att använda 

- **const** om omtilldelning inte krävs.

## Varför "type=module" behövs för att koppla quizData och resultData:

1. ES6-moduler kräver "type=module":
- import och export för att dela data mellan filer (som quizData och resultData), måste skriptet deklareras som en modul med type="module".

2. Globalt scope isoleras:
- Moduler körs i ett separat scope. Utan type="module" kan inte variabler och funktioner delas mellan filer via import/export.

3. Modulens filvägar aktiveras:
- Moduler kräver att du använder relativa filvägar (t.ex. ./quizData.js). Utan type="module" ignoreras dessa.

4. Lösning på problem:
- Utan type="module" kunde quizData och resultData inte importeras korrekt, och därför fungerade inte din kod.

** - För att använda moderna ES6-moduler och koppla data 
mellan filer måste <script> ha type="module".**


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
på quizData. </h3>
<br>
<h3>Detta säkerställer att HTML hålls enkel och 
att nya frågor kan läggas till genom att bara uppdatera 
datafilen.</h3>


- Sant/Falskt: 
Två radio-knappar genereras för varje fråga, 
där endast ett val kan göras.

- Fyra alternativ: Fyra radio-knappar genereras 
med tydlig koppling till motsvarande label via for-attribut.

### 2. Beräkning av resultat

- Resultatet beräknas genom att jämföra användarens svar 
med rätt svar i quizData:

** Resultatet klassificeras: 
```js
< 50%: Underkänt (rött).
50%-75%: Bra (orange).
75%: Riktigt bra jobbat (grönt)
```

### 3.Visning av detaljerat resultat

> Användarens svar matchas med fråge-ID i quizData.
 För varje fråga:

> Om svaret är rätt: visas som "Rätt!" i grönt.
> Om svaret är fel: visas som "Fel!" i rött
   tillsammans med rätt svar.
> Detta görs med hjälp av en loop genom alla frågor och 
  användarens val.

### Updatering av resultData.js

1. Quizresultatdata hanteras som **en array av objekt** 
för bättre struktur och återanvändbarhet.

2. Separat fil används för att hålla koden organiserad och lätt att underhålla.
--- 
### Lokal lagring (Local Storage)

- Lokal lagring används för att spara data i webbläsaren permanent.

- Data sparas som strängar, vilket innebär att mer komplexa data   
(som objekt eller listor) måste konverteras med 
`JSON.stringify()`
 vid lagring och `JSON.parse()` vid hämtning.


