const bin = require('./bin.json');
const cfg = require('../config.json');
const genObject = require('./genObject').genObject;
const scan = require('./searchArea').scan;

function searchSymbols(originalMatrix, callback) {
    let object = new genObject();
    for (i in bin) {
        let resultScan = scan(cfg.precisionSearchSymbols, originalMatrix, bin[i][1]);
        if (resultScan.length) {
            object.tex.push(bin[i][0]);
            object.areas.push(resultScan);
        }
    }
    callback(null, object);
}
module.exports.searchSymbols = searchSymbols;