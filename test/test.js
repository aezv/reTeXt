const testScan = require('./testScan').testScan;

QUnit.assert.scan = function (original, current, expected) {
  this.pushResult({
    result: current[1] >= expected,
    actual: 'значение: ' + current[0] + ', точность: ' + current[1],
    expected: 'значение: ' + current[0] + ', точность: ' + expected,
    message: 'не достигнута необходимая точность для [' + original[0] + ']'
  });
};

QUnit.module('testScan', function () {

  const correct = 0.9995;

  QUnit.test('Тест сканирования 0', function (assert) {
    let done = assert.async();
    testScan(0, function (error, scanArray) {
      done();
      for (let i = 0; i < scanArray.length; i++)
        assert.scan(scanArray[0], scanArray[i], correct);
    });
  });

  QUnit.test('Тест сканирования 1', function (assert) {
    let done = assert.async();
    testScan(1, function (error, scanArray) {
      done();
      for (let i = 0; i < scanArray.length; i++)
        assert.scan(scanArray[0], scanArray[i], correct);
    });
  });
});