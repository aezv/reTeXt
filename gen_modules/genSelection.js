function unificationL(objL, objR) {
    return objL + objR;
}

function unificationR(objL, objR) {
    return objR + objL;
}

function divisionU(objU, objD) {
    return '\\frac{' + objU + '}{' + objD + '}';
}

function divisionD(objU, objD) {
    return '\\frac{' + objD + '}{' + objU + '}';
}

let selectionArrayFuncHorizontal = [
    unificationL,
    unificationR
];

let selectionArrayFuncVertical = [
    divisionU,
    divisionD
];

function selection(genObjectTexLeft, genObjectTexRight, genProcessingArea) {
    let tex = new Array();

    for (let i = 0; i < genProcessingArea.arrayIndex.length; i++) {
        if (genProcessingArea.arrayPosition[i].horizontal == 'left') {
            for (let func = 0; func < selectionArrayFuncHorizontal.length; func += 2)
                tex.push(selectionArrayFuncHorizontal[func](genObjectTexLeft[genProcessingArea.arrayIndex[i][0]], genObjectTexRight[genProcessingArea.arrayIndex[i][1]]));
        }
        else {
            for (let func = 1; func < selectionArrayFuncHorizontal.length; func += 2)
                tex.push(selectionArrayFuncHorizontal[func](genObjectTexLeft[genProcessingArea.arrayIndex[i][0]], genObjectTexRight[genProcessingArea.arrayIndex[i][1]]));
        }

        if (genProcessingArea.arrayPosition[i].vertical == 'up') {
            for (let func = 0; func < selectionArrayFuncVertical.length; func += 2)
                tex.push(selectionArrayFuncVertical[func](genObjectTexLeft[genProcessingArea.arrayIndex[i][0]], genObjectTexRight[genProcessingArea.arrayIndex[i][1]]));
        }
        else {
            for (let func = 1; func < selectionArrayFuncVertical.length; func += 2)
                tex.push(selectionArrayFuncVertical[func](genObjectTexLeft[genProcessingArea.arrayIndex[i][0]], genObjectTexRight[genProcessingArea.arrayIndex[i][1]]));
        }
    }

    return tex;
}

module.exports.selection = selection;
