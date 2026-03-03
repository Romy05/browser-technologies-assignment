// Hier is de disable vragen logica

export function initQuestionEventListeners() {
    const marriedQuestion = document.querySelector('#married-question');
    const conditionsQuestion = document.querySelector('#conditions-question');
    const notarialDeed = document.querySelector('#notarial-deed');
    const settlementQuestion = document.querySelector('#settlement-question');
    const hasChildrenQuestion = document.querySelector('#has-children-question');
    const hasDeceasedChildQuestion = document.querySelector('#has-deceased-child-question');
    const childHasChildrenQuestion = document.querySelector('#child-has-children-question');
    const hasTestamonyQuestion = document.querySelector('#has-testamony-question');

    const disabledQuestions = [
        conditionsQuestion,
        notarialDeed,
        settlementQuestion,
        hasDeceasedChildQuestion,
        childHasChildrenQuestion
    ]
    
    disabledQuestions.forEach(question => {
        disableQuestion(question);
    })

    marriedQuestion.querySelector('.radio-buttons').addEventListener('change', (event) => {
        toggleQuestion(event, conditionsQuestion);
    });

    conditionsQuestion.querySelector('.radio-buttons').addEventListener('change', (event) => {
        toggleQuestion(event, notarialDeed);
        toggleQuestion(event, settlementQuestion);
    });
}

function toggleQuestion(event, question) {
    console.log(event.target.value, event.target.name)
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
}