import { checkForValidDateString } from "./date.js";

export function setValidators() {
    // Zet browser validation uit
    const form = document.querySelector('form');
    form.setAttribute('novalidate', '');

    const dateOfDeathField = document.querySelector("#date-of-death");
    const bsnField = document.querySelector("#bsn");
    const dateFields = document.querySelectorAll('.text-date');
    const initialsLabels = document.querySelectorAll(".initials-label");


    initialsLabels.forEach(label => {
        const input = label.querySelector("input");
        const error = label.querySelector(".error-message");

        const errorId = error.getAttribute('id');

        input.addEventListener('blur', (event) => {
            if(!input.validity.valid) {
                error.classList.add('active');
                input.setAttribute('aria-describedby', errorId);
            } else {
                error.classList.remove('active');
                input.removeAttribute('aria-describedby');
            }
        })
    })



    dateFields.forEach(dateField => {
        dateField.addEventListener('blur', validateDate);
    })
    bsnField.addEventListener('blur', validateBSN);
    dateOfDeathField.addEventListener('blur', validateDeathDate);
}

function validateDeathDate(event) {
    const deathDate = new Date(event.target.value);
    /* Je hebt 8 maanden om het erfbelastingsformulier in te vullen */
    const today = new Date();
    const minDate = new Date();
    minDate.setMonth(today.getMonth() - 8);
    const inputSection = event.target.parentElement.parentElement.parentElement;
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

function validateDate(event) {
    
    if (event.target.validity.patternMismatch === true) {
        event.target.setCustomValidity('Zorg er voor dat de datum volgens het gegeven format is. Voorbeeld: 31-12-1999');
        return;
    } if (!checkForValidDateString(event.target.value)) {
        event.target.setCustomValidity('Deze datum is niet geldig');
        return;
    }
    event.target.setCustomValidity('');
}