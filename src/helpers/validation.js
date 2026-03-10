import { checkForValidDateString } from "./date.js";

/* Ik zou zeggen, bij elementen die alleen required hebben, deze alleen bij een submit checken en niet blur.
Bij elementen met bijzondere patterns zoals BSN of datum kan dit wel bij blur. */

export function setValidators() {
    // Zet browser validation uit
    const form = document.querySelector('form');
    form.setAttribute('novalidate', '');

    const dateOfDeathField = document.querySelector("#date-of-death");
    const dateLabels = document.querySelectorAll('.date-label-text');

    dateLabels.forEach(dateField => {
        dateField.addEventListener('blur', validateDateText(dateField));
    })
    dateOfDeathField.addEventListener('blur', validateDeathDate);

    form.addEventListener('submit', (event) => {
        const focusedInput = form.querySelector('label:has(.error-message.active) input, label input:user-invalid');
        event.preventDefault();
        focusedInput.focus();
    })
}

function validateDeathDate(event) {
    const errorMsg = event.target.nextElementSibling;

    if(!event.target.value) {
        errorMsg.classList.add('active');
        event.target.setAttribute('aria-describedby', errorMsg.getAttribute('id'));
        return;
    } else {
        errorMsg.classList.remove('active');
        event.target.removeAttribute('aria-describedby');
    }

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

function validateDateText(label) {
    const input = label.querySelector("input");
    const error = label.querySelector(".error-message");

    const errorId = error.getAttribute('id');

    console.log(input, error, errorId)

    input.addEventListener('blur', () => {
        if((!input.validity.valid) || (!checkForValidDateString(input.value))) {
            error.classList.add('active');
            input.setAttribute('aria-describedby', errorId);
        } else {
            error.classList.remove('active');
            input.removeAttribute('aria-describedby');
        }
    })
}   