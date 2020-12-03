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

function selection(genObjectTexLeft, genObjectTexRight, arrayIndex) {
    let tex = new Array();

    for (let func = 0; func < selectionArrayFunc.length; func++) {
        for (let i = 0; i < arrayIndex.length; i++)
            tex.push(selectionArrayFunc[func](genObjectTexLeft[arrayIndex[i][0]], genObjectTexRight[arrayIndex[i][1]]));
    }
    
    return tex;
}

module.exports.selection = selection;
