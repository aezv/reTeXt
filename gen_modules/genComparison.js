const genObject = require('./genObject').genObject;
const scan = require('./searchArea').scan;
const cfg = require('../config.json');

function genComparison(originalMatrix, comparisonMatrixes, genObjectTex) {
    let object = new genObject;

    for (let i = 0; i < comparisonMatrixes.length; i++) {
        let resultScan = scan(cfg.precisionComparison, originalMatrix, comparisonMatrixes[i]);
        if (resultScan.areas.length) {
            object.tex.push(genObjectTex[i]);
            object.areas.push(resultScan.areas);
            if (object.maxPrecision.value < resultScan.maxPrecision) {
                object.maxPrecision.value = resultScan.maxPrecision;
                object.maxPrecision.index = object.tex.length - 1;
            }
        }
    }

    return object;
}

module.exports.genComparison = genComparison;
