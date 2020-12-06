const cfg = require('../config.json');

function processingArea(genObjectAreasLeft, genObjectAreasRight) {
    let arrayIndex = new Array();
    let arrayAreas = new Array();
    let arrayPosition = new Array();
    for (let i = 0; i < genObjectAreasLeft.length; i++) {
        for (let j = 0; j < genObjectAreasRight.length; j++) {
            for (let ii = 0; ii < genObjectAreasLeft[i].length; ii++) {
                for (let jj = 0; jj < genObjectAreasRight[j].length; jj++) {
                    let width = ((genObjectAreasLeft[i][ii][1] - genObjectAreasLeft[i][ii][0]) + (genObjectAreasRight[j][jj][1] - genObjectAreasRight[j][jj][0])) * cfg.factorWidthArea;
                    let height = ((genObjectAreasLeft[i][ii][3] - genObjectAreasLeft[i][ii][2]) + (genObjectAreasRight[j][jj][3] - genObjectAreasRight[j][jj][2])) * cfg.factorHeightArea;

                    let leftLimit = Math.min(genObjectAreasLeft[i][ii][0], genObjectAreasRight[j][jj][0]);
                    let rightLimit = Math.max(genObjectAreasLeft[i][ii][1], genObjectAreasRight[j][jj][1]);
                    let upperLimit = Math.min(genObjectAreasLeft[i][ii][2], genObjectAreasRight[j][jj][2]);
                    let lowerLimit = Math.max(genObjectAreasLeft[i][ii][3], genObjectAreasRight[j][jj][3]);

                    if (rightLimit - leftLimit <= width && lowerLimit - upperLimit <= height) {
                        arrayIndex.push([i, j]);
                        arrayAreas.push([leftLimit, rightLimit, upperLimit, lowerLimit]);

                        let medianWidthLeft = (genObjectAreasLeft[i][ii][0] + genObjectAreasLeft[i][ii][1]) / 2;
                        let medianWidthRight = (genObjectAreasRight[j][jj][0] + genObjectAreasRight[j][jj][1]) / 2;
                        let medianHeightLeft = (genObjectAreasLeft[i][ii][2] + genObjectAreasLeft[i][ii][3]) / 2;
                        let medianHeightRight = (genObjectAreasRight[j][jj][2] + genObjectAreasRight[j][jj][3]) / 2;
                        
                        if (medianWidthLeft <= medianWidthRight && medianHeightLeft <= medianHeightRight)
                            arrayPosition.push({ horizontal: 'left', vertical: 'up' });
                        else if (medianWidthLeft <= medianWidthRight && medianHeightLeft >= medianHeightRight)
                            arrayPosition.push({ horizontal: 'left', vertical: 'down' });
                        else if (medianWidthLeft >= medianWidthRight && medianHeightLeft <= medianHeightRight)
                            arrayPosition.push({ horizontal: 'right', vertical: 'up' });
                        else if (medianWidthLeft >= medianWidthRight && medianHeightLeft >= medianHeightRight)
                            arrayPosition.push({ horizontal: 'right', vertical: 'down' });
                    }
                }
            }
        }
    }
    return {
        arrayIndex: arrayIndex,
        arrayAreas: arrayAreas,
        arrayPosition: arrayPosition
    };
}

module.exports.processingArea = processingArea;
