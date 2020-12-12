const cfg = require('../config.json');
const compileBin = require('../gen_modules/compileBin').build;
const scan = require('../gen_modules/comparison');
const library = require('./libraryTestComparison.json');

function testComparison(count, callback) {
    compileBin(library[count], function (result) {
        let scanResult = new Array();
        for (let i = 0; i < result.length; i++)
            scanResult.push([library[count][i], scan(result[0], result[i])]);
        callback(scanResult);
    });
}

module.exports = testComparison;
