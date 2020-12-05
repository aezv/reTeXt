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

function scan(precision, originalMatrix, comparisonMatrix, area) {
    let maxPrecision = 0;
    let areas = new Array();
    let tempX = comparisonMatrix.length / originalMatrix.length;
    let tempY = comparisonMatrix[0].length / originalMatrix[0].length;
    if (tempX <= 1 && tempY <= 1) {
        if (area && area.length) {
            area[0] = 0 <= area[0] ? area[0] : 0;
            area[1] = area[1] <= originalMatrix.length - comparisonMatrix.length ? area[1] : originalMatrix.length - comparisonMatrix.length;
            area[2] = 0 <= area[2] ? area[2] : 0;
            area[3] = area[3] <= originalMatrix[0].length - comparisonMatrix[0].length ? area[3] : originalMatrix[0].length - comparisonMatrix[0].length;
        }
        else {
            area = new Array();
            area[0] = 0;
            area[1] = originalMatrix.length - comparisonMatrix.length;
            area[2] = 0;
            area[3] = originalMatrix[0].length - comparisonMatrix[0].length;
        }
        for (let offsetX = area[0]; offsetX <= area[1]; offsetX++) {
            for (let offsetY = area[2]; offsetY <= area[3]; offsetY++) {
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
    /*if(result.length)
        console.log(result);*/
    return {
        areas: areas,
        maxPrecision: maxPrecision
    };
}

module.exports.scan = scan;
