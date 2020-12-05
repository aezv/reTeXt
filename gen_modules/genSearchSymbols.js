const bin = require('./bin.json');
const cfg = require('../config.json');
const genObject = require('./genObject').genObject;
const scan = require('./searchArea').scan;

function searchSymbols(originalMatrix, callback) {
    let object = new genObject();
    for (i in bin) {
        let resultScan = scan(cfg.precisionSearchSymbols, originalMatrix, bin[i][1]);
        if (resultScan.areas.length) {
            object.tex.push(bin[i][0]);
            object.areas.push(resultScan.areas);
            if (object.maxPrecision.value < resultScan.maxPrecision) {
                object.maxPrecision.value = resultScan.maxPrecision;
                object.maxPrecision.index = object.tex.length - 1;
            }
        }
    }
    callback(null, object);
}
module.exports.searchSymbols = searchSymbols;