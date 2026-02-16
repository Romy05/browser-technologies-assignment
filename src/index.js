import { seperateCharactersByDot } from "./helpers/string.js";

initInputFields();

function initInputFields() {
    const dateOfDeathField = document.querySelector('#dateOfDeath');
    /* toIsoString etc gedeelte van stackoverflow: https://stackoverflow.com/a/49916376 */
    dateOfDeathField.max = new Date().toISOString().split("T")[0];

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

