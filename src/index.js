import { seperateCharactersByDot } from "./helpers/string.js";
import { initQuestionEventListeners } from "./helpers/questions.js";
import { setValidators } from "./helpers/validation.js";
import { printResultOnChange } from "./helpers/result.js";

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

    /* Dit stuk door chatGPT laten genereren https://chatgpt.com/s/t_69b9bec15edc81919014aeb130fe73b9 */
    document.querySelectorAll('.navigation-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').replace('#', '');
            setActivePage(targetId);
        });
    });

    setActivePage('page-1');
}

function initEventListeners() {
    initQuestionEventListeners();
    setValidators();
    printResultOnChange();
}

 /* Dit stuk door chatGPT laten genereren https://chatgpt.com/s/t_69b9bec15edc81919014aeb130fe73b9 */
function setActivePage(id) {
    const pages = document.querySelectorAll('.pages-container > *');

    if (id == 'page-3') {
        pages.forEach(page => {
            page.removeAttribute('inert');
        });
        return;
    }
    pages.forEach(page => {
        if (page.id === id) {
            page.removeAttribute('inert');
        } else {
            page.setAttribute('inert', '');
        }
    });
}