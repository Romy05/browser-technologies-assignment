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
    const oneRequiredFieldsets = document.querySelectorAll('.optional-but-one-required');

    const disabledQuestions = [
        conditionsQuestion,
        conditionsExtraQuestion,
        hasDeceasedChildQuestion,
        childHasChildrenQuestion,
        testamonyExtraQuestions
    ]

    oneRequiredFieldsets.forEach( fieldset =>{
        fieldset.addEventListener('input', () => {
            let oneHasValue = false;
            const inputs = fieldset.querySelectorAll('input');

            inputs.forEach(input => {
                if (input.value) {
                    oneHasValue = true;
                }
            });

            inputs.forEach(input => {
                console.log(input, oneHasValue, input.value, input.disabled)
                if (oneHasValue && !input.value) {
                    input.disabled = true;
                } else {
                    input.disabled = false;
                }
            });
        })
    })
    
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
}

function toggleQuestion(event, question) {
    if (event.target.value == "true") {
        enableQuestion(question);
        return;
    }
    disableQuestion(question);
}

function disableQuestion(question) {
    question.classList.add('disabled')
    const inputs = question.querySelectorAll('input');
    // Zet de inputs naar de default waarde.
    inputs.forEach(input => {
        input.disabled = true;
        input.value = input.defaultValue;
        input.checked = input.defaultChecked;
    });

    // Extra vragen voor het inklappen van vragen die in dezelfde container zitten.
    const extraQuestions = question.querySelectorAll('.extra-question');
    extraQuestions.forEach(extraQuestion => {
        disableQuestion(extraQuestion);
    });
    // Zet de hoogte naar 0 pixels zodat hij geen ruimte inneemt.
    setTimeout(() => {
        question.style.height = '0px';

        if (question.classList.contains('question-set')) {
            question.style.padding = '0px';
        }
    }, 250);
}

function enableQuestion(question) {
    if (!question.classList.contains('disabled')) return;

    question.classList.remove('disabled')
    const inputs = question.querySelectorAll('input');
    inputs.forEach(input => {
        input.disabled = false;
    });
  
    question.style.height = 'fit-content';
    if (question.classList.contains('question-set')) {
        question.style.padding = '1rem';
    }
}