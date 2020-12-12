const Async = require('async');
const Jimp = require('jimp');

const fs = require('fs');

function checkElem(elem, array) {
    let check = true;
    for (let i = 0; i < array.length; i++) {
        if (elem[0] == array[i][0] && elem[1] == array[i][1]) {
            check = false;
            break;
        }
    }
    return check;
}

function pngToBin(prefix, postfix, countStart, countEnd) {
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

            //разбивает матрицу по вертикали ***
            let tempCount = 0;
            let boolNewCount = true;
            let tempMatrix = new Array();
            for (let x = 0; x < fWidth; x++) {
                let countNull = 0;
                let column = new Array();
                for (let y = 0; y < fHeight; y++) {
                    column.push(matrix[x][y]);
                    if (!matrix[x][y])
                        countNull++;

                }
                if (countNull != column.length) {
                    if (boolNewCount) {
                        tempMatrix[tempCount] = new Array();
                        boolNewCount = false;
                    }
                    tempMatrix[tempCount].push(column);
                }
                else {
                    boolNewCount = true;
                    tempCount++;
                }
            }
            tempMatrix = tempMatrix.filter(m => m);
            //***

            //разбивает полученные матрицы по горизонтали(и, по сути, переворачивает матрицы, ЭТО ВАЖНО)***
            tempCount = 0;
            boolNewCount = true;
            matrix = new Array();
            for (let iCount = 0; iCount < tempMatrix.length; iCount++) {
                for (let y = 0; y < tempMatrix[iCount][0].length; y++) {
                    let countNull = 0;
                    let line = new Array();
                    for (let x = 0; x < tempMatrix[iCount].length; x++) {
                        line.push(tempMatrix[iCount][x][y]);
                        if (!tempMatrix[iCount][x][y])
                            countNull++;
                    }
                    if (countNull != line.length) {
                        if (boolNewCount) {
                            matrix[tempCount] = new Array();
                            boolNewCount = false;
                        }
                        matrix[tempCount].push(line);
                    }
                    else {
                        boolNewCount = true;
                        tempCount++;
                    }
                }
            }
            matrix = matrix.filter(m => m);
            //***

            //создает массив массивов индексов связных пространств***
            let count = 0;
            let arrayConnectedSpaces = new Array();
            for (let iCount = 0; iCount < matrix.length; iCount++) {
                for (let y = 0; y < matrix[iCount][0].length; y++) {
                    for (let x = 0; x < matrix[iCount].length; x++) {
                        if (matrix[iCount][x][y]) {
                            let maxX = x;
                            let maxY = y;
                            arrayConnectedSpaces[count] = new Array();
                            arrayConnectedSpaces[count].push([x, y]);
                            for (let i = 0; i < arrayConnectedSpaces[count].length; i++) {
                                x = arrayConnectedSpaces[count][i][0];
                                y = arrayConnectedSpaces[count][i][1];

                                if (maxX < x)
                                    maxX = x;
                                if (maxY < y)
                                    maxY = y;

                                if (0 <= x - 1) {
                                    if (0 <= y - 1) {
                                        if (matrix[iCount][x - 1][y - 1] && checkElem([x - 1, y - 1], arrayConnectedSpaces[count]))
                                            arrayConnectedSpaces[count].push([x - 1, y - 1]);
                                    }
                                    if (matrix[iCount][x - 1][y] && checkElem([x - 1, y], arrayConnectedSpaces[count]))
                                        arrayConnectedSpaces[count].push([x - 1, y]);
                                    if (y + 1 < matrix[iCount][x].length) {
                                        if (matrix[iCount][x - 1][y + 1] && checkElem([x - 1, y + 1], arrayConnectedSpaces[count]))
                                            arrayConnectedSpaces[count].push([x - 1, y + 1]);
                                    }
                                }

                                if (0 <= y - 1) {
                                    if (matrix[iCount][x][y - 1] && checkElem([x, y - 1], arrayConnectedSpaces[count]))
                                        arrayConnectedSpaces[count].push([x, y - 1]);
                                }
                                if (y + 1 < matrix[iCount][x].length) {
                                    if (matrix[iCount][x][y + 1] && checkElem([x, y + 1], arrayConnectedSpaces[count]))
                                        arrayConnectedSpaces[count].push([x, y + 1]);
                                }

                                if (x + 1 < matrix[iCount].length) {
                                    if (0 <= y - 1) {
                                        if (matrix[iCount][x + 1][y - 1] && checkElem([x + 1, y - 1], arrayConnectedSpaces[count]))
                                            arrayConnectedSpaces[count].push([x + 1, y - 1]);
                                    }
                                    if (matrix[iCount][x + 1][y] && checkElem([x + 1, y], arrayConnectedSpaces[count]))
                                        arrayConnectedSpaces[count].push([x + 1, y]);
                                    if (y + 1 < matrix[iCount][x].length) {
                                        if (matrix[iCount][x + 1][y + 1] && checkElem([x + 1, y + 1], arrayConnectedSpaces[count]))
                                            arrayConnectedSpaces[count].push([x + 1, y + 1]);
                                    }
                                }
                            }
                            x = maxX;
                            y = maxY;
                            count++;
                        }
                    }
                }
            }
            //***

            //восстанавливает матрицы пикселей из массивов индексов(возможно, стоит вообще отказаться от этого, ЭТО ВАЖНО)***
            matrix = new Array();
            for (let iCount = 0; iCount < arrayConnectedSpaces.length; iCount++) {
                let minX = Infinity;
                let minY = Infinity;
                let maxX = 0;
                let maxY = 0;
                for (let i = 0; i < arrayConnectedSpaces[iCount].length; i++) {
                    minX = Math.min(minX, arrayConnectedSpaces[iCount][i][0]);
                    minY = Math.min(minY, arrayConnectedSpaces[iCount][i][1]);
                    maxX = Math.max(maxX, arrayConnectedSpaces[iCount][i][0]);
                    maxY = Math.max(maxY, arrayConnectedSpaces[iCount][i][1]);
                }
                for (let i = 0; i < arrayConnectedSpaces[iCount].length; i++) {
                    arrayConnectedSpaces[iCount][i][0] -= minX;
                    arrayConnectedSpaces[iCount][i][1] -= minY;
                }
                matrix[iCount] = new Array();
                for (let x = 0; x < maxX - minX + 1; x++) {
                    matrix[iCount][x] = new Array();
                    for (let y = 0; y < maxY - minY + 1; y++)
                        matrix[iCount][x][y] = !checkElem([x, y], arrayConnectedSpaces[iCount]) ? 1 : 0;
                }
            }
            //***
            let callbackM = new Array();
            callbackM.push(matrix);
            callback(null, callbackM);
        });
    });
}

/*pngToBin('./test1.png').then(function (result) {
    fs.writeFileSync('./temp.json', JSON.stringify(result[0]));
});*/

module.exports.pngToBin = pngToBin; // префикс пути, постфикс пути, начало отсчета, конец отсчета 
