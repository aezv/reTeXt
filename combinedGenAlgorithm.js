const genAlgorithm = require('./genAlgorithm');

function combinedGenAlgorithm(block, callback) {
    let genBlock = new Array();

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
            combinedGenAlgorithm([block[val]], function (element) {
                console.log('Обработка подблока ' + val + ' завершена');
                console.log('результат -> ' + element);
                genBlock.push(element);
                processHandler.value++;
            });
        }
        else {
            console.log('Все подблоки обработаны');
            let count = 0;
            let splitGenBlock = new Array();
            for (let i = 0; i < genBlock.length; i++) {
                if (genBlock[i]) {
                    if (!splitGenBlock[count])
                        splitGenBlock[count] = '';
                    splitGenBlock[count] += genBlock[i];
                }
                else
                    count++;
            }
            genAlgorithm(splitGenBlock, block, function (element) {
                console.log('Результат -> ' + element);
                callback(element);
            });
        }
    });

    console.log('Количество подблоков: ' + block.length);
    console.log('Обработка подблока 0');
    if (1 < block.length) {
        combinedGenAlgorithm([block[0]], function (element) {
            console.log('Обработка подблока 0 завершена');
            console.log('Результат -> ' + element);
            genBlock.push(element);
            processHandler.value++;
        });
    }
    else {
        genAlgorithm(null, block, function (element) {
            console.log('Обработка подблока 0 завершена');
            console.log('Результат -> ' + element);
            callback(element);
        });
    }
}

module.exports = combinedGenAlgorithm;
