import { seperateCharactersByDot } from "./helpers/string.js";
import { initQuestionEventListeners } from "./helpers/questions.js";
import { setValidators } from "./helpers/validation.js";

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
    initQuestionEventListeners();
    setValidators();
}