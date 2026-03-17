export function printResultOnChange() {
    const canvas = document.querySelector('.results');
    const labels = document.querySelectorAll('label');

    // Gebruik van een set inspo door chatGPT
    const processedRadioNames = new Set();

    // % Source - https://stackoverflow.com/a/19885871
    // % Posted by kavun, modified by community. See post 'Timeline' for change history
    // % Retrieved 2026-03-17, License - CC BY-SA 3.0
    while (canvas.childElementCount > 1) {
        canvas.removeChild(canvas.lastChild);
    }

    labels.forEach(label => {
        const input = label.querySelector('input, select')

        if(!input.value) {
            return;
        }

        let dtText = label.firstElementChild.textContent;
        let ddText = input.value;

        if(input.type == 'radio') {
            if(input.name == 'which-number' || processedRadioNames.has(input.name)) {
                return;
            }
            processedRadioNames.add(input.name);

            const legend = label.parentElement.parentElement.querySelector('legend');
            const checked = label.parentElement.querySelector('input:checked'); 

            dtText = legend.textContent;
            ddText = checked?.parentElement.textContent;
            if(!ddText) {
                return;
            }
        }

        const dl = document.createElement('dl');
        const dt = document.createElement('dt');
        const dd = document.createElement('dd');
        dt.textContent = dtText;
        dd.textContent = ddText;

        dl.appendChild(dt);
        dl.appendChild(dd);
        canvas.appendChild(dl);
    });
}