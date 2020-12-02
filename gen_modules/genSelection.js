function unificationL(objL, objR) {
    return objL + objR;
}

function unificationR(objL, objR) {
    return objR + objL;
}

function additionL(objL, objR) {
    return objL + '+' + objR;
}

function additionR(objL, objR) {
    return objR + '+' + objL;
}

function subtractionL(objL, objR) {
    return objL + '-' + objR;
}

function subtractionR(objL, objR) {
    return objR + '-' + objL;
}

function comparisonL(objL, objR) {
    return objL + '=' + objR;
}

function comparisonR(objL, objR) {
    return objR + '=' + objL;
}

function divisionL(objL, objR) {
    return '\\frac{' + objL + '}{' + objR + '}';
}

function divisionR(objL, objR) {
    return '\\frac{' + objR + '}{' + objL + '}';
}

selectionArrayFunc = [
    unificationL,
    unificationR,
    additionL,
    additionR,
    subtractionL,
    subtractionR,
    comparisonL,
    comparisonR,
    divisionL,
    divisionR
];

function selection(genObjectTexLeft, genObjectTexRight) {
    let tex = new Array();
    console.log(genObjectTexRight);
    for (let i = 0; i < selectionArrayFunc.length; i++) {
        for (let j = 0; j < genObjectTexLeft.length; j++) {
            for (let g = 0; g < genObjectTexRight.length; g++)
                tex.push(selectionArrayFunc[i](genObjectTexLeft[j], genObjectTexRight[g]));
        }
    }
    return tex;
}

module.exports.selection = selection;
