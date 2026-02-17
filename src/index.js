import { seperateCharactersByDot } from "./helpers/string.js";

initInputFields();
initEventListeners();

function initInputFields() {
    const dateOfDeathField = document.querySelector('#dateOfDeath');
    const today = new Date();
    const minDate = new Date();
    /* Je hebt 8 maanden om het erfbelastingsformulier in te vullen */
    minDate.setMonth(today.getMonth() - 8);

     /* toIsoString etc gedeelte van stackoverflow: https://stackoverflow.com/a/49916376 */
    dateOfDeathField.max = today.toISOString().split("T")[0]; /* Hier zou ik een helper functie van kunnen maken */
    dateOfDeathField.min = minDate.toISOString().split("T")[0];

    const initialsInputs = document.querySelectorAll('[id*="initials"]');

    initialsInputs.forEach(input => {
        input.addEventListener('input', (event) => {
            if (event.inputType === 'deleteContentBackward') {
                event.target.value = event.target.value.slice(0, -1);
                return;
            }
            const string = event.target.value;
            event.target.value = seperateCharactersByDot(string)
        })
    })
}

function initEventListeners() {
    // Source - https://stackoverflow.com/a/74812383 en aangepast met behulp van ChatGPT
    // Mijn use case is net anders dan die op stackoverflow, omdat de top van mijn element niet 0 is.
    // Daarom gebruik ik een scroll-listener in plaats van een intersection observer.
    const el = document.querySelector("#deceased-info-legend");

    function checkPosition() {
        const rect = el.getBoundingClientRect();
        const stickyTop = parseFloat(getComputedStyle(el).top);

        if (rect.top <= stickyTop) {
            el.classList.add("is-pinned");
        } else {
            el.classList.remove("is-pinned");
        }
    }

    window.addEventListener("scroll", checkPosition);
}