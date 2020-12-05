const cfg = require('../config.json');

function processingArea(genObjectAreasLeft, genObjectAreasRight) {
    let arrayIndex = new Array();
    let arrayPosition = new Array();
    for (let i = 0; i < genObjectAreasLeft.length; i++) {
        for (let j = 0; j < genObjectAreasRight.length; j++) {
            for (let ii = 0; ii < genObjectAreasLeft[i].length; ii++) {
                for (let jj = 0; jj < genObjectAreasRight[j].length; jj++) {
                    //console.log(genObjectAreasRight[j].length + '->' + j + '->' + jj);
                    let width = ((genObjectAreasLeft[i][ii][1] - genObjectAreasLeft[i][ii][0]) + (genObjectAreasRight[j][jj][1] - genObjectAreasRight[j][jj][0])) * cfg.factorArea;
                    let height = ((genObjectAreasLeft[i][ii][3] - genObjectAreasLeft[i][ii][2]) + (genObjectAreasRight[j][jj][3] - genObjectAreasRight[j][jj][2])) * cfg.factorArea;

                    //4 случая, когда правый объект -> справа и выше, справа и ниже, слева и выше, слева и ниже

                    if (genObjectAreasLeft[i][ii][0] <= genObjectAreasRight[j][jj][0]) {
                        //случай когда правый объект справа
                        let widthArea = genObjectAreasLeft[i][ii][0] + width;
                        if (genObjectAreasRight[j][jj][1] <= widthArea) {
                            if (genObjectAreasLeft[i][ii][2] <= genObjectAreasRight[j][jj][2]) {
                                //случай когда правый объект справа и ниже
                                let heightArea = genObjectAreasLeft[i][ii][2] + height;
                                if (genObjectAreasRight[j][jj][3] <= heightArea) {
                                    let pushIndex = new Array();
                                    pushIndex[0] = i;
                                    pushIndex[1] = j;
                                    arrayIndex.push(pushIndex);
                                    arrayPosition.push({
                                        horizontal: 'left',
                                        vertical: 'up'
                                    });
                                }
                            }
                            else {
                                //случай когда правый объект справа и выше
                                let heightArea = genObjectAreasLeft[i][ii][3] - height;
                                if (genObjectAreasRight[j][jj][2] >= heightArea) {
                                    let pushIndex = new Array();
                                    pushIndex[0] = i;
                                    pushIndex[1] = j;
                                    arrayIndex.push(pushIndex);
                                    arrayPosition.push({
                                        horizontal: 'left',
                                        vertical: 'down'
                                    });
                                }
                            }
                        }
                    }
                    else {
                        //случай когда правый объект слева
                        let widthArea = genObjectAreasLeft[i][ii][1] - width;
                        if (genObjectAreasRight[j][jj][0] >= widthArea) {
                            if (genObjectAreasLeft[i][ii][2] >= genObjectAreasRight[j][jj][2]) {
                                //случай когда правый объект слева и ниже
                                let heightArea = genObjectAreasLeft[i][ii][2] + height;
                                if (genObjectAreasRight[j][jj][3] <= heightArea) {
                                    let pushIndex = new Array();
                                    pushIndex[0] = i;
                                    pushIndex[1] = j;
                                    arrayIndex.push(pushIndex);
                                    arrayPosition.push({
                                        horizontal: 'right',
                                        vertical: 'up'
                                    });
                                }
                            }
                            else {
                                //случай когда правый объект слева и выше
                                let heightArea = genObjectAreasLeft[i][ii][3] - height;
                                if (genObjectAreasRight[j][jj][2] >= heightArea) {
                                    let pushIndex = new Array();
                                    pushIndex[0] = i;
                                    pushIndex[1] = j;
                                    arrayIndex.push(pushIndex);
                                    arrayPosition.push({
                                        horizontal: 'right',
                                        vertical: 'down'
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return {
        arrayIndex: arrayIndex,
        arrayPosition: arrayPosition
    };
}

module.exports.processingArea = processingArea;
