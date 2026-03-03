import { seperateCharactersByDot } from "./helpers/string.js";
import { initQuestionEventListeners } from "./helpers/questions.js";

initInputFields();
initEventListeners();

function initInputFields() {
    const dateOfDeathField = document.querySelector('#date-of-death');
    const today = new Date();
    /* toIsoString etc gedeelte van stackoverflow: https://stackoverflow.com/a/49916376 */
    dateOfDeathField.max = today.toISOString().split("T")[0];

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
    const infoLegend = document.querySelector("#deceased-info-legend");

    function checkPosition() {
        const rect = infoLegend.getBoundingClientRect();
        const stickyTop = parseFloat(getComputedStyle(infoLegend).top);

        if (rect.top <= stickyTop) {
            infoLegend.classList.add("is-pinned");
        } else {
            infoLegend.classList.remove("is-pinned");
        }
    }

    window.addEventListener("scroll", checkPosition);
    initQuestionEventListeners();
    initFormValidators();
}

function initFormValidators() {
    const dateOfDeathField = document.querySelector("#date-of-death");
    const bsnField = document.querySelector("#bsn");

    function validateDeathDate(event) {
        const deathDate = new Date(event.target.value);
        /* Je hebt 8 maanden om het erfbelastingsformulier in te vullen */
        const today = new Date();
        const minDate = new Date();
        minDate.setMonth(today.getMonth() - 8);
        const inputSection = event.target.parentElement.parentElement;
        const note = inputSection.querySelector('.note-message');
        

        if (deathDate < minDate) {
            // Geef melding dat er rente betaalt moet worden.
            note.style.display = 'block';
            return;
        } 
        note.style.display = 'none';
    }

    function validateBSN(event) {
        if (event.target.validity.patternMismatch === true) {
            event.target.setCustomValidity('Het BSN bestaat uit 8 tot 9 cijfers.');
            return;
        }
        event.target.setCustomValidity('');
    }

    bsnField.addEventListener('blur', validateBSN);
    dateOfDeathField.addEventListener('blur', validateDeathDate);
}