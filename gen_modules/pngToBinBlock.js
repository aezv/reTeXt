const Async = require('async');
const Jimp = require('jimp');
const splitBlocks = require('./splitBlocks');

function pngToBinBlock(prefix, postfix, countStart, countEnd) {
    let object = new Array();
    let countObjects = 0;
    if (postfix && countStart && countEnd) {
        for (let i = countStart; i <= countEnd; i++) {
            object[countObjects] = prefix + i + postfix;
            countObjects++;
        }
    }
    else
        object[0] = prefix;
    return Async.concatSeries(object, function (path, callback) { //функция из пакета Async, запускает функцию и передает параметры из object, потом ждет пока все они выполнятся
        Jimp.read(path).then(img => {
            var fWidth = img.bitmap.width;
            var fHeight = img.bitmap.height;
            var matrix = new Array();
            for (var x = 0; x < fWidth; x++) {
                let column = new Array();
                for (var y = 0; y < fHeight; y++)
                    column.push(img.bitmap.data[img.getPixelIndex(x, y)] <= 150 ? 1 : 0)
                matrix.push(column);
            }
            callback(null, [splitBlocks(matrix)]);
        });
    });
}

module.exports = pngToBinBlock; // префикс пути, постфикс пути, начало отсчета, конец отсчета 
