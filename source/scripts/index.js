const inputFile = document.getElementById('inputFile');
const divStatus = document.getElementById('divStatus');
const inputId = document.getElementById('inputId');

let id = 'id_' +
Math.floor(Math.random()*10) + '' +
Math.floor(Math.random()*10) + '' +
Math.floor(Math.random()*10) + '' +
Math.floor(Math.random()*10) + '' +
Math.floor(Math.random()*10) + '' +
Math.floor(Math.random()*10) + '' +
Math.floor(Math.random()*10) + '' +
Math.floor(Math.random()*10) + '' +
Math.floor(Math.random()*10) + '' +
Math.floor(Math.random()*10);

inputId.value = id;

function handleFiles() {
    divStatus.innerText = inputFile.files[0].name;
}