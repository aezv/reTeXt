const genObject = require('./genObject').genObject;
const scan = require('./searchArea').scan;
const cfg = require('../config.json');

function genComparison(originalMatrix, comparisonMatrixes, genObjectTex) {
    let object = new genObject;

    for (let i = 0; i < comparisonMatrixes.length; i++) {
        let area = scan(cfg.precisionComparison, originalMatrix, comparisonMatrixes[i]);
        if (area.length) {
            object.tex.push(genObjectTex[i]);
            object.areas.push(area);
        }
    }

    return object;
}

module.exports.genComparison = genComparison;
