const bin = require('../temp/bin.json');
const cfg = require('../config.json');
const genObject = require('./genObject');
const scan = require('./comparison');

function searchSymbols(originalMatrix, callback) {
    let object = new genObject();
    for (i in bin) {
        let resultScan = scan(originalMatrix, bin[i][1]);
        if (cfg.precisionComparison <= resultScan) {
            object.tex.push(bin[i][0]);
            let fullResultScan = resultScan * (bin[i][1].length / originalMatrix.length);
            if (object.maxPrecision.value < fullResultScan) {
                object.maxPrecision.value = fullResultScan;
                object.maxPrecision.index = object.tex.length - 1;
            }
        }
    }
    callback(null, object);
}
module.exports = searchSymbols;