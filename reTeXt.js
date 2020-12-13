const pngToBinBlock = require('./gen_modules/pngToBinBlock');
const combinedGenAlgorithm = require('./combinedGenAlgorithm');

pngToBinBlock('./test1.png').then(function (result) {
    result = result[0];
    console.log('Количество основных блоков: ' + result.length);
    combinedGenAlgorithm(result, function (str) {
        console.log('Итоговый результат -> ' + str);
    });
});