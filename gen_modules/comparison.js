function comparison(originalMatrix, comparisonMatrix, index) {
    let resultComparison = Infinity;
    for (let i = index; i < index + comparisonMatrix.length; i++) {
        let minX = Math.min(originalMatrix[i].length, comparisonMatrix[i - index].length);
        let maxX = Math.max(originalMatrix[i].length, comparisonMatrix[i - index].length);
        let minY = Math.min(originalMatrix[i][0].length, comparisonMatrix[i - index][0].length);
        let maxY = Math.max(originalMatrix[i][0].length, comparisonMatrix[i - index][0].length);
        let countElem = 0;
        let maxCountElem = 0;
        for (let x = 0; x < minX; x++) {
            for (let y = 0; y < minY; y++) {
                if (originalMatrix[i][x][y] == comparisonMatrix[i - index][x][y])
                    countElem++;
                maxCountElem++;
            }
        }
        let result = (countElem / maxCountElem) * (minX / maxX) * (minY / maxY);
        resultComparison = Math.min(result, resultComparison);
    }
    return resultComparison;
}

function scan(originalMatrix, comparisonMatrix) {
    let resultComparison = 0;
    if (comparisonMatrix.length <= originalMatrix.length) {
        for (let i = 0; i <= originalMatrix.length - comparisonMatrix.length; i++) {
            resultComparison = Math.max(resultComparison, comparison(originalMatrix, comparisonMatrix, i));
        }
    }
    return resultComparison;
}

module.exports = scan;
