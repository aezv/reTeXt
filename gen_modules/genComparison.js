const genObject = require('./genObject');
const scan = require('./comparison');
const cfg = require('../config.json');

function genComparison(originalMatrix, comparisonMatrixes, genObjectTex) {
    let object = new genObject;

    for (let i = 0; i < comparisonMatrixes.length; i++) {
        let resultScan = scan(originalMatrix, comparisonMatrixes[i]);
        if (cfg.precisionComparison <= resultScan) {
            object.tex.push(genObjectTex[i]);
            let fullResultScan = resultScan * (comparisonMatrixes[i].length / originalMatrix.length);
            if (object.maxPrecision.value < fullResultScan) {
                object.maxPrecision.value = fullResultScan;
                object.maxPrecision.index = object.tex.length - 1;
            }
        }
    }

    return object;
}

module.exports = genComparison;
