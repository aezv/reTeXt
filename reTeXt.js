const pngToBinBlock = require('./gen_modules/pngToBinBlock');
const genAlgorithm = require('./genAlgorithm');
const combinedGenAlgorithm = require('./combinedGenAlgorithm');

let originalObject;
let reTeXt = new Array();

let processHandler = {
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

processHandler.listener(function (val) {
    if (val < originalObject.length) {
        console.log('Обработка основного блока ' + val);
        combinedGenAlgorithm(originalObject[val], function (element) {
            if (element) {
                console.log('Результат -> ' + element);
                reTeXt.push(element);
                processHandler.value++;
            }
            else {
                genAlgorithm(null, originalObject[val], function (element) {
                    console.log('Результат -> ' + element);
                    reTeXt.push(element);
                    processHandler.value++;
                });
            }
        });
    }
    else {
        console.log('Все основные блоки обработаны');
        reTeXt = reTeXt.filter(m => m);
        console.log('Сборка формулы');
        let formula = '';
        reTeXt.map(m => formula += m);
        console.log('Получена формула -> ' + formula);
    }
});

pngToBinBlock('./test1.png').then(function (result) {
    originalObject = result[0];
    console.log('Количество основных блоков: ' + originalObject.length);
    console.log('Обработка основного блока 0');
    combinedGenAlgorithm(originalObject[0], function (element) {
        if (1 <= originalObject.length) {
            console.log('Основной блок 0 обработан');
            console.log('Результат -> ' + element);
            reTeXt.push(element);
            console.log('TTTTTTTTTTTTTTTTT');
            processHandler.value++;
        }
        else {
            console.log('Все основные блоки распознаны');
            console.log('Итоговый результат -> ' + element);
        }
    });
});