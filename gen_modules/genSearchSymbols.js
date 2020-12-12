const bin = require('../temp/bin.json');
const cfg = require('../config.json');
const genObject = require('./genObject').genObject;
const scan = require('./comparison');

function searchSymbols(originalMatrix, callback) {
    let object = new genObject();
    for (i in bin) {
        let resultScan = scan(originalMatrix, bin[i][1]);
        if (cfg.precisionComparison <= resultScan)
            object.tex.push(bin[i][0]);
    }
    callback(null, object);
}
module.exports.searchSymbols = searchSymbols;