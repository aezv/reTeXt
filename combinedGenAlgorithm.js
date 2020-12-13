const genAlgorithm = require('./genAlgorithm');

function combinedGenAlgorithm(block, callback) {
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
        if (val < block.length) {
            console.log('Обработка подблока ' + val);
            genAlgorithm(null, block[val], function (element) {
                console.log('Обработка подблока ' + val + ' завершена, результат -> ' + element);
                str += element;
                processHandler.value++;
            });
        }
        else {
            console.log('Все подблоки обработаны');
            callback(str);
        }
    });

    console.log('Обработка подблока 0');
    genAlgorithm(null, block[0], function (element) {
        console.log('Обработка подблока 0 завершена, результат -> ' + element);
        str += element;
        processHandler.value++;
    });
}

module.exports = combinedGenAlgorithm;
