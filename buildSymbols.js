const fs = require('fs');
const symbols = require('./gen_modules/symbols.json');
const compileBin = require('./gen_modules/compileBin');

compileBin(symbols, function (res) {
    let objects = new Array();
    for (i in symbols) {
        objects[i] = new Array();
        objects[i][0] = symbols[i][0];
        objects[i][1] = res[i];
    }
    fs.writeFileSync('./temp/bin.json', JSON.stringify(objects));
    console.log('Построение символов завершено');
});