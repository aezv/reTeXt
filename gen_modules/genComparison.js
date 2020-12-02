const genObject = require('./genObject').genObject;
const scan = require('./searchArea').scan;
const cfg = require('../config.json');

function genComparison(originalMatrix, comparisonObject) {
    let object = new genObject;

    for (let i = 0; i < comparisonObject.matrixes.length; i++) {
        let area = scan(cfg.precisionComparison, originalMatrix, comparisonObject.matrixes[i]);
        if (area.length) {
            object.tex.push(comparisonObject.tex[i]);
            object.matrixes.push(comparisonObject.matrixes[i]);
            object.areas.push(area);
        }
    }

    return object;
}

module.exports.genComparison = genComparison;
