import { checkForValidDateString } from "./date.js";
import { printResultOnChange } from "./result.js";

export function setValidators() {
    // Zet browser validation uit
    const form = document.querySelector('form');
    form.setAttribute('novalidate', '');

    const dateOfDeathField = document.querySelector("#date-of-death");
    const dateOfDeathInfo = document.querySelector("#date-of-death-info");
    const bsnInput = document.querySelector('#bsn');
    const dateLabels = document.querySelectorAll('.date-label-text');
    const bsnBecoProtocolInput = document.querySelector('#bsn-becon-protocol');
    const textInputs = document.querySelectorAll('input[type="text"]');

    const allErrors = document.querySelectorAll('.error-message');

    allErrors.forEach(msg => {
        msg.textContent = '';
    })

    textInputs.forEach(input => {
        if (input.required) {
            input.addEventListener('blur', validateEmptyText);
        }
    })

    dateLabels.forEach(dateField => {
        const input = dateField.querySelector('input');
        input.addEventListener('blur', validateDateText);
    })
    dateOfDeathField.addEventListener('blur', validateDeathDate);
    dateOfDeathInfo.style.display = 'none';

    bsnInput.addEventListener('blur', (event) => {
        validateWithRegexInput(event, 'Vul een geldig BSN in');
    });

    bsnBecoProtocolInput.addEventListener('blur', (event) => {
        let errorMessage;
/* Switch error message aan de hand van het type! */
        switch(bsnBecoProtocolInput.getAttribute('data-type')){
            case 'bsn':
                errorMessage = 'Vul een geldig BSN in'
                break;
            case 'becon':
                errorMessage = 'Vul een geldig Beconnummer in'
                break;
            case 'protocol':
                errorMessage = 'Vul een geldig Protocolnummmer in'
                break;
            default: 
                errorMessage = 'Vul een geldig nummer in';
        }
        validateWithRegexInput(event, errorMessage);
    });

    form.addEventListener('change', printResultOnChange);

    form.addEventListener('submit', (event) => {
        if(form.checkValidity()) {
            setPositiveFeedback();
        }
        const errorInputs = form.querySelectorAll('label:has(.error-message.active) input, label input:user-invalid');
        const focusedInput = errorInputs[0];

        errorInputs.forEach(input => {
            let errorMsg = input.parentElement.nextElementSibling;

            
            if (!(input.type === 'radio')) {
                errorMsg = input.nextElementSibling;
                console.log(errorMsg);
            }
            
            if (errorMsg && !errorMsg.textContent){
                input.setAttribute('aria-describedby', errorMsg.getAttribute('id'));
                errorMsg.textContent = "Vul dit veld in";
            }
        })
        event.preventDefault();
        focusedInput.focus();
    })
}

function validateDeathDate(event) {
    const input = event.target;
    const errorMsg = input.nextElementSibling;

    if(!event.target.value) {
        errorMsg.classList.add('active');
        input.setAttribute('aria-describedby', errorMsg.getAttribute('id'));
        errorMsg.textContent = "Vul een geldige datum in";
        return;
    }
    errorMsg.classList.remove('active');
    input.removeAttribute('aria-describedby');
    errorMsg.textContent = ""

    const deathDate = new Date(event.target.value);
    /* Je hebt 8 maanden om het erfbelastingsformulier in te vullen */
    const today = new Date();
    const minDate = new Date();
    minDate.setMonth(today.getMonth() - 8);

    const note = input.nextElementSibling.nextElementSibling;
    
    if (deathDate < minDate) {
        // Geef melding dat er rente betaalt moet worden.
        input.setAttribute('aria-describedby', 'date-of-death-info');
        note.style.display = 'block';
        note.textContent = "Let op: Omdat u de aangifte meer dan 8 maanden na het overlijden indient, betaalt u belastingsrente."

        return;
    } 
    note.style.display = 'none';
    note.textContent =  '';
}

function validateDateText(event) {
    const input = event.target;
    const error = input.nextElementSibling;

    const errorId = error.getAttribute('id');

    if((!input.validity.valid) || (!checkForValidDateString(input.value))) {
        
        error.classList.add('active');
        input.setAttribute('aria-describedby', errorId);
        error.textContent = 'Vul een geldige datum in';
    } else {
        error.classList.remove('active');
        error.textContent = '';
        input.removeAttribute('aria-describedby');
    }
}   

function validateWithRegexInput(event, errorMessage = 'Vul een geldige waarde in!') {
    const input = event.target;
    const errorMsg = input.nextElementSibling;
    const regex = new RegExp(input.getAttribute('pattern'));

    if(!regex.test(event.target.value)) {
        errorMsg.classList.add('active');
        input.setAttribute('aria-describedby', errorMsg.getAttribute('id'));
        errorMsg.textContent = errorMessage;
        return;
    }
    errorMsg.classList.remove('active');
    input.removeAttribute('aria-describedby');
    errorMsg.textContent = ""
}

function validateEmptyText(event) {
    const input = event.target;
    const errorMsg = input.nextElementSibling;

    if(!input.value) {
        errorMsg.classList.add('active');
        input.setAttribute('aria-describedby', errorMsg.getAttribute('id'));
        errorMsg.textContent = 'Dit veld is verplicht';
        return;
    }
    errorMsg.classList.remove('active');
    input.removeAttribute('aria-describedby');
    errorMsg.textContent = ""
}

function setPositiveFeedback() {
    const form = document.querySelector('form');

    form.innerHTML = '<h2>Uw aangifte is verzonden!</h2> <p>De aangifte zal binnen 2 maanden verwerkt worden. U hoeft nu niets te doen.</p>';
}