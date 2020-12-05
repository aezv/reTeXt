const genObject = require('./gen_modules/genObject').genObject;
const pngToBin = require('./gen_modules/pngToBin').pngToBin;
const compileBin = require('./gen_modules/compileBin').build;
const genComparison = require('./gen_modules/genComparison').genComparison;
const selection = require('./gen_modules/genSelection').selection;
const searchSymbols = require('./gen_modules/genSearchSymbols').searchSymbols;
const genFilter = require('./gen_modules/genFilter').genFilter;
const genProcessingArea = require('./gen_modules/genProcessingArea').processingArea;

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
        let processingArea = genProcessingArea(genObjects[count].areas, genObjects[val - offset].areas);
        if (processingArea.arrayIndex.length) {
            genObjects[val] = new genObject();
            genObjects[val] = selection(genObjects[count].tex, genObjects[val - offset].tex, processingArea);
            console.log('Поколение ' + val + ' -> фильтрация');
            genObjects[val] = genFilter(genObjects[val]);
            console.log('Поколение ' + val + ' -> количество объектов ' + genObjects[val].tex.length);
            console.log('Поколение ' + val + ' -> компиляция');

            compileBin(genObjects[val].tex, function (matrixes) {
                console.log('Поколение ' + val + ' -> сравнение');
                genObjects[val] = genComparison(originalMatrix, matrixes, genObjects[val].tex, genObjects[val].areas);
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
                if (genObjects[val].maxPrecision.value < 0.95)
                    processHandlerObject.value++;
                else
                    console.log('Результат -> ' + genObjects[val].tex[genObjects[val].maxPrecision.index]);
            });
        }
        else {
            console.log('Поколение ' + val + ' -> результат: пустое поколение');
            genObjects[val] = new genObject();
            processHandlerObject.value++;
        }
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
        processHandlerObject.value--;
    }
});
//**************************************

pngToBin(process.argv[2]).then(matrix => {
    originalMatrix = matrix[0];
    searchSymbols(originalMatrix, function (error, rGenObject) {
        genObjects[0] = rGenObject;
        console.log('Подбор символов завершен');
        console.log('Найдены символы: ' + genObjects[0].tex);
        processHandlerObject.value++;
    });
});

