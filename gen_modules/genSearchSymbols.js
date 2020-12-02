const bin = require('./bin.json');
const cfg = require('../config.json');
const genObject = require('./genObject').genObject;
const scan = require('./searchArea').scan;

function searchSymbols(originalMatrix, callback) {
    let tex = new Array();
    let matrixes = new Array();
    let areas = new Array();
    for (i in bin) {
        let resultScan = scan(cfg.precisionSearchSymbols, originalMatrix, bin[i][1]);
        if (resultScan.length) {
            tex.push(bin[i][0]);
            matrixes.push(bin[i][1]);
            areas.push(resultScan);
        }
    }
    callback(null, new genObject(tex, matrixes, areas));
}
module.exports.searchSymbols = searchSymbols;