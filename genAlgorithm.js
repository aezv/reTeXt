const genObject = require('./gen_modules/genObject');
const pngToBin = require('./gen_modules/pngToBin');
const compileBin = require('./gen_modules/compileBin');
const genComparison = require('./gen_modules/genComparison');
const selection = require('./gen_modules/genSelection');
const searchSymbols = require('./gen_modules/genSearchSymbols');
const genFilter = require('./gen_modules/genFilter');
const genProcessingArea = require('./gen_modules/genProcessingArea');

function genAlgorithm(initialGenObject, binMatrixesBlock, callback) {
    let comparisonBuffer = new Array();
    let genObjects = new Array();

    let processHandlerObject = {
        valueInternal: 0,
        valueListener: function (val) { },
        set value(val) {
            this.valueInternal = val;
            this.valueListener(val);
        },
        get value() {
            return this.valueInternal;
        },
        listener: function (listener) {
            this.valueListener = listener;
        }
    }

    //**************************************

    let count = 0;
    let offset = 1;
    processHandlerObject.listener(function (val) {
        let boolGen = true;
        if (comparisonBuffer.length < val)
            comparisonBuffer[val - offset] = new Array();
        for (let i = 0; i < comparisonBuffer[val - offset].length; i++) {
            if (comparisonBuffer[val - offset][i] == count) {
                boolGen = false;
                break;
            }
        }
        if (genObjects[val - 1].tex.length && boolGen) {
            console.log('**************************************************');
            console.log('Поколение ' + val + ' -> построение');
            console.log('Левое поколение: ' + count);
            console.log('Правое поколение: ' + (val - offset));
            comparisonBuffer[val - offset].push(count);

            genObjects[val] = new genObject();
            genObjects[val] = selection(genObjects[count].tex, genObjects[val - offset].tex);
            console.log('Поколение ' + val + ' -> фильтрация');
            genObjects[val] = genFilter(genObjects, val);
            console.log('Поколение ' + val + ' -> количество объектов ' + genObjects[val].tex.length);
            console.log('Поколение ' + val + ' -> компиляция');

            compileBin(genObjects[val].tex, function (matrixes) {
                console.log('Поколение ' + val + ' -> сравнение');
                genObjects[val] = genComparison(originalMatrix, matrixes, genObjects[val].tex);
                console.log('Поколение ' + val + ' -> количество объектов прошедших отбор ' + genObjects[val].tex.length);
                console.log('Поколение ' + val + ' -> объекты ');
                console.log(genObjects[val].tex);
                if (genObjects[val].tex.length) {
                    count = val;
                    offset = 1;
                    console.log('Поколение ' + val + ' -> результат: точность ' + genObjects[val].maxPrecision.value + ', формула ' + genObjects[val].tex[genObjects[val].maxPrecision.index]);
                }
                else
                    console.log('Поколение ' + val + ' -> результат: пустое поколение');
                if (genObjects[val].maxPrecision.value < 0.995)
                    processHandlerObject.value++;
                else {
                    console.log('Результат -> ' + genObjects[val].tex[genObjects[val].maxPrecision.index]);
                    callback(genObjects[val].tex[genObjects[val].maxPrecision.index]);
                }
            });
        }
        else if (genObjects[val - 1].tex.length && !boolGen) {
            if (count == 0) {
                offset++;
                count = val - offset;
            }
            else
                count--;
            processHandlerObject.value += 0;
        }
        else {
            genObjects.splice(genObjects.length - 1, 1);
            if (count == 0) {
                offset++;
                count = val - offset - 1;
            }
            else
                count--;
            if (0 <= val - offset - 1)
                processHandlerObject.value--;
            else {
                console.log('Результат -> не удалось выполнить распознавание');
                callback(null);
            }
        }
    });
    //**************************************


    originalMatrix = binMatrixesBlock;
    if (initialGenObject) {
        genObjects[0] = new genObject();
        genObjects[0].tex = initialGenObject;
        console.log('Получены блоки: ' + genObjects[0].tex);
        if (genObjects[0].maxPrecision.value <= 0.995 && genObjects[0].tex.length) {
            processHandlerObject.value++;
        }
        else if (genObjects[0].tex.length) {
            console.log('Результат -> ' + genObjects[0].tex[genObjects[0].maxPrecision.index]);
            callback(genObjects[0].tex[genObjects[0].maxPrecision.index]);
        }
        else {
            console.log('Результат -> не удалось распознать блок');
            callback(null);
        }
    }
    else {
        searchSymbols(originalMatrix, function (error, rGenObject) {
            genObjects[0] = rGenObject;
            console.log('Подбор символов завершен');
            console.log('Найдены символы: ' + genObjects[0].tex);
            if (genObjects[0].maxPrecision.value <= 0.995 && genObjects[0].tex.length) {
                processHandlerObject.value++;
            }
            else if (genObjects[0].tex.length) {
                console.log('Результат -> ' + genObjects[0].tex[genObjects[0].maxPrecision.index]);
                callback(genObjects[0].tex[genObjects[0].maxPrecision.index]);
            }
            else {
                console.log('Результат -> не удалось распознать символы');
                callback(null);
            }
        });
    }

}

module.exports = genAlgorithm;
