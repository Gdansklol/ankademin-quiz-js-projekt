# Refactoring 

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

```js
document.getElementById("dark-mode-btn").addEventListener("click", switchedDarkMode);
document.getElementById("light-mode-btn").addEventListener("click", switchedLightMode);

```

- updaterat 
```js
let toggleMode = (mode) => {
    body.classList.toggle("dark-mode", mode === "dark");
    body.classList.toggle("light-mode", mode === "light");
};

```
-
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