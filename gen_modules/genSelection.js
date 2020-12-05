const genObject = require('./genObject').genObject;

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
    let object = new genObject();

    for (let i = 0; i < genProcessingArea.arrayIndex.length; i++) {
        if (genProcessingArea.arrayPosition[i].horizontal == 'left') {
            for (let func = 0; func < selectionArrayFuncHorizontal.length; func += 2) {
                object.tex.push(selectionArrayFuncHorizontal[func](genObjectTexLeft[genProcessingArea.arrayIndex[i][0]], genObjectTexRight[genProcessingArea.arrayIndex[i][1]]));
                object.areas.push(genProcessingArea.arrayAreas[i]);
            }
        }
        else {
            for (let func = 1; func < selectionArrayFuncHorizontal.length; func += 2) {
                object.tex.push(selectionArrayFuncHorizontal[func](genObjectTexLeft[genProcessingArea.arrayIndex[i][0]], genObjectTexRight[genProcessingArea.arrayIndex[i][1]]));
                object.areas.push(genProcessingArea.arrayAreas[i]);
            }
        }

        if (genProcessingArea.arrayPosition[i].vertical == 'up') {
            for (let func = 0; func < selectionArrayFuncVertical.length; func += 2) {
                object.tex.push(selectionArrayFuncVertical[func](genObjectTexLeft[genProcessingArea.arrayIndex[i][0]], genObjectTexRight[genProcessingArea.arrayIndex[i][1]]));
                object.areas.push(genProcessingArea.arrayAreas[i]);
            }
        }
        else {
            for (let func = 1; func < selectionArrayFuncVertical.length; func += 2) {
                object.tex.push(selectionArrayFuncVertical[func](genObjectTexLeft[genProcessingArea.arrayIndex[i][0]], genObjectTexRight[genProcessingArea.arrayIndex[i][1]]));
                object.areas.push(genProcessingArea.arrayAreas[i]);
            }
        }
    }

    return object;
}

module.exports.selection = selection;
