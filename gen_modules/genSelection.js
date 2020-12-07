const genObject = require('./genObject').genObject;

function unificationL(objL, objR) {
    return objL + objR;
}

function unificationR(objL, objR) {
    return objR + objL;
}

function mergerL(objL, objR) {
    if (1 < objL.length && 1 < objR.length) {
        let j = 0;
        let count = 0;
        for (let i = objL.length - 1; i >= 0; i--) {
            if (j < objR.length) {
                if (objL[i] == objR[j])
                    count++;
                else
                    break;
            }
            else
                break;
            j++;
        }
        objL = objL.slice(0, objL.length - count);
    }
    return objL + objR;
}

function mergerR(objL, objR) {
    if (1 < objL.length && 1 < objR.length) {
        let j = 0;
        let count = 0;
        for (let i = objR.length - 1; i >= 0; i--) {
            if (j < objL.length) {
                if (objR[i] == objL[j])
                    count++;
                else
                    break;
            }
            else
                break;
            j++;
        }
        objR = objR.slice(0, objR.length - count);
    }
    return objR + objL;
}

function divisionU(objU, objD) {
    return '\\frac{' + objU + '}{' + objD + '}';
}

function divisionD(objU, objD) {
    return '\\frac{' + objD + '}{' + objU + '}';
}

let selectionArrayFuncHorizontal = [ //1.14
    unificationL,
    unificationR,
    mergerL,
    mergerR
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
