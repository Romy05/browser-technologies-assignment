// Hier is de disable vragen logica

export function initQuestionEventListeners() {
    const marriedQuestion = document.querySelector('#married-question');
    const conditionsQuestion = document.querySelector('#conditions-question');
    const conditionsExtraQuestion = document.querySelector('#conditions-extra-questions');
    const hasChildrenQuestion = document.querySelector('#has-children-question');
    const hasDeceasedChildQuestion = document.querySelector('#has-deceased-child-question');
    const childHasChildrenQuestion = document.querySelector('#child-has-children-question');
    const hasTestamonyQuestion = document.querySelector('#has-testamony-question');
    const testamonyExtraQuestions = document.querySelector('#testamony-extra-questions');
    const whichNumberQuestion = document.querySelector('#which-number-question');
    const bsnBeconProtocolInput = document.querySelector('#bsn-becon-protocol-input');
    const extraQuestionsPage2 = document.querySelector('#page-2-extra-questions');
    const countryDatePicker = document.querySelector('#landcode');

    const disabledQuestions = [
        conditionsQuestion,
        conditionsExtraQuestion,
        hasDeceasedChildQuestion,
        childHasChildrenQuestion,
        testamonyExtraQuestions,
        bsnBeconProtocolInput,
        extraQuestionsPage2
    ]
    
    disabledQuestions.forEach(question => {
        disableQuestion(question);
    })

    marriedQuestion.querySelector('.radio-buttons').addEventListener('change', (event) => {
        toggleQuestion(event, conditionsQuestion);
    });

    conditionsQuestion.querySelector('.radio-buttons').addEventListener('change', (event) => {
        toggleQuestion(event, conditionsExtraQuestion);
    });

    hasChildrenQuestion.querySelector('.radio-buttons').addEventListener('change', (event) => {
        toggleQuestion(event, hasDeceasedChildQuestion);
    });

    hasDeceasedChildQuestion.querySelector('.radio-buttons').addEventListener('change', (event) => {
        toggleQuestion(event, childHasChildrenQuestion);
    });

    hasTestamonyQuestion.querySelector('.radio-buttons').addEventListener('change', (event) => {
        toggleQuestion(event, testamonyExtraQuestions);
    });

    whichNumberQuestion.querySelector('.radio-buttons').addEventListener('change', event => {
        toggleQuestion(event, bsnBeconProtocolInput);
        toggleQuestion(event, extraQuestionsPage2);

        const input = bsnBeconProtocolInput.querySelector('input');
        const text = bsnBeconProtocolInput.querySelector('span');

        switch(event.target.value) {
            case 'bsn':
                text.textContent = 'Bsn/RSIN gemachtigde';
                input.pattern = `\\d{8,9}`;
                break;
            case 'becon':
                text.textContent = 'Beconnummer adviseur';
                input.pattern = `\\d{6}`;
                break;
            case 'protocol':
                text.textContent = 'Protocolnummer notaris';
                input.pattern = `\\d{6}`;
                break;
            default: 
                text.textContent = 'Bsn/RSIN gemachtigde / Beconnummer adviseur / Protocolnummer notaris';
        }    
        input.setAttribute('data-type', event.target.value);
    });

    countryDatePicker.addEventListener('change', event => {
        const addOnQuestion = document.querySelector('#add-on-question');
        if (event.target.value != 'NLD') {
            disableQuestion(addOnQuestion);
        } else {
            enableQuestion(addOnQuestion);
        }
    })
}

function toggleQuestion(event, question) {
    if (event.target.value != "false") {
        enableQuestion(question);
        return;
    }
    disableQuestion(question);
}

function disableQuestion(question) {
    question.classList.add('disabled')
    const inputs = question.querySelectorAll('input, select');
    // Zet de inputs naar de default waarde.
    inputs.forEach(input => {
        input.disabled = true;
        input.value = input.defaultValue;
        input.checked = input.defaultChecked;
        input.required = false;
    });

    // Extra vragen voor het inklappen van vragen die in dezelfde container zitten.
    const extraQuestions = question.querySelectorAll('.extra-question');
    extraQuestions.forEach(extraQuestion => {
        disableQuestion(extraQuestion);
    });
    // Zet de hoogte naar 0 pixels zodat hij geen ruimte inneemt.
    setTimeout(() => {
        question.style.height = '0px';
    }, 250);
}

function enableQuestion(question) {
    if (!question.classList.contains('disabled')) return;

    question.classList.remove('disabled')
    // Als er extra questions in zitten > alleen hoofdvraag
    // met behulp van chatGPT https://chatgpt.com/s/t_69b950900b30819183d9c53b78e0cf6c
    const hasExtraQuestions = question.querySelector('.extra-question');
    let inputs = question.querySelectorAll('input, select');
    if (hasExtraQuestions) {
        inputs = question.querySelectorAll(':scope > .radio-buttons input, :scope > .radio-buttons select');
    } 
    inputs.forEach(input => {
        input.disabled = false;
        
        if (input.getAttribute('data-required') == 'true') {
            input.required = true;
        }
    });
  
    question.style.height = 'fit-content';
}