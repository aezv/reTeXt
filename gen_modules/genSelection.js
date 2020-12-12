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

function divisionL(objL, objR) {
    return '\\frac{' + objL + '}{' + objR + '}';
}

function divisionR(objL, objR) {
    return '\\frac{' + objR + '}{' + objL + '}';
}

let selectionArrayFunc = [
    unificationL,
    unificationR,
    mergerL,
    mergerR,
    divisionR,
    divisionL
];

function selection(genObjectTexLeft, genObjectTexRight) {
    let object = new genObject();
    for (let iFunc = 0; iFunc < selectionArrayFunc.length; iFunc++) {
        for (let i = 0; i < genObjectTexLeft.length; i++) {
            for (let j = 0; j < genObjectTexRight.length; j++)
                object.tex.push(selectionArrayFunc[iFunc](genObjectTexLeft[i], genObjectTexRight[j]));
        }
    }
    return object;
}

module.exports.selection = selection;
