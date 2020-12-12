function comparison(originalMatrix, comparisonMatrix, offsetX, offsetY) {
    let result = 0;
    let count = 0;
    let maxCount = 0;
    for (let x = offsetX; x < offsetX + comparisonMatrix.length; x++) {
        for (let y = offsetY; y < offsetY + comparisonMatrix[0].length; y++) {
            if (comparisonMatrix[x - offsetX][y - offsetY]) {
                if (originalMatrix[x][y])
                    count++;
                maxCount++;
            }
        }
    }
    if (maxCount)
        result = count / maxCount;
    return result;
}

function scan(precision, originalMatrix, comparisonMatrix) {
    let maxPrecision = 0;
    let areas = new Array();
    let tempX = comparisonMatrix.length / originalMatrix.length;
    let tempY = comparisonMatrix[0].length / originalMatrix[0].length;
    if (tempX <= 1 && tempY <= 1) {
        for (let offsetX = 0; offsetX <= originalMatrix.length - comparisonMatrix.length; offsetX++) {
            for (let offsetY = 0; offsetY <= originalMatrix[0].length - comparisonMatrix[0].length; offsetY++) {
                let resultComparison = comparison(originalMatrix, comparisonMatrix, offsetX, offsetY);
                if (precision < resultComparison) {
                    let object = new Array();
                    object.push(offsetX, offsetX + comparisonMatrix.length);
                    object.push(offsetY, offsetY + comparisonMatrix[0].length);
                    areas.push(object);

                    if (maxPrecision < resultComparison * tempX * tempY)
                        maxPrecision = resultComparison * tempX * tempY;
                }
            }
        }
    }
    return {
        areas: areas,
        maxPrecision: maxPrecision
    };
}

module.exports = scan;
