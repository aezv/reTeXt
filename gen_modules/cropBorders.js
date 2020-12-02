function cropBordersLeftRight(fMatrix) {
    let returnMatrix = new Array();
    let borderLeft = Infinity;
    let borderRight = 0;
    for (let y = 0; y < fMatrix.length; y++) {
        for (let x = 0; x < fMatrix[y].length; x++) {
            if (fMatrix[y][x]) {
                borderLeft = borderLeft < x ? borderLeft : x;
                break;
            }
        }
        for (let x = fMatrix[y].length - 1; x >= 0; x--) {
            if (fMatrix[y][x]) {
                borderRight = borderRight > x ? borderRight : x;
                break;
            }
        }
    }
    for (let y = 0; y < fMatrix.length; y++) {
        let tempX = 0;
        returnMatrix[y] = new Array();
        for (let x = borderLeft; x <= borderRight; x++) {
            returnMatrix[y][tempX] = fMatrix[y][x];
            tempX++;
        }
    }
    return returnMatrix;
}

function cropBordersUpDown(fMatrix) {
    let returnMatrix = new Array();
    let borderUp = Infinity;
    let borderDown = 0;
    for (let y = 0; y < fMatrix.length; y++) {
        let isEmptyLine = true;
        for (let x = 0; x < fMatrix[y].length; x++) {
            if(fMatrix[y][x]){
                isEmptyLine = false;
                break;
            }
        }
        if(!isEmptyLine) {
            borderUp = y;
            break;
        }
    }
    for (let y = fMatrix.length - 1; y >= 0; y--) {
        let isEmptyLine = true;
        for (let x = 0; x < fMatrix[y].length; x++) {
            if(fMatrix[y][x]){
                isEmptyLine = false;
                break;
            }
        }
        if(!isEmptyLine) {
            borderDown = y;
            break;
        }
    }
    let tempY = 0;
    for (let y = borderUp; y <= borderDown; y++) {
        returnMatrix[tempY] = fMatrix[y];
        tempY++; 
    }
    return returnMatrix;
}

module.exports.cropBordersLeftRight = cropBordersLeftRight;
module.exports.cropBordersUpDown = cropBordersUpDown;
