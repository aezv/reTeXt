const pngToBinBlock = require('./gen_modules/pngToBinBlock');
const genAlgorithm = require('./genAlgorithm');

pngToBinBlock('./test1.png').then(function (result) {
    result = result[0];

    let str = '';

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
        if (val < result.length) {
            console.log('Обработка блока ' + val);
            genAlgorithm(result[val], function (element) {
                console.log('Обработка блока ' + val + ' завершена, результат -> ' + element);
                str += element;
                processHandler.value++;
            });
        }
        else {
            console.log('Все блоки обработаны');
            console.log('Итоговый результат -> ' + str);
        }
    });

    console.log('Обработка блока 0');
    genAlgorithm(result[0], function (element) {
        console.log('Обработка блока 0 завершена, результат -> ' + element);
        str += element;
        processHandler.value++;
    });

});