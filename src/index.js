initInputFields();

function initInputFields() {
    const dateOfDeathField = document.querySelector('#dateOfDeath');
    dateOfDeathField.max = new Date().getDate();
    console.log(dateOfDeathField);
}