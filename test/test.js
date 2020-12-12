const cfg = require('../config.json');
const testComparison = require('./testComparison');

QUnit.assert.comparison = function (original, comparison) {
  this.pushResult({
    result: comparison[1] >= cfg.precisionComparison,
    actual: 'значение: ' + comparison[0] + ', точность: ' + comparison[1],
    expected: 'значение: ' + comparison[0] + ', точность: ' + cfg.precisionComparison,
    message: 'не достигнута необходимая точность для [' + original[0] + ']'
  });
};

QUnit.module('Comparison');
for (let i = 0; i < cfg.countTestComparison; i++) {
  QUnit.test('Тест сканирования ' + i, function (assert) {
    let done = assert.async();
    testComparison(i, function (result) {
      done();
      for (let i = 0; i < result.length; i++)
        assert.comparison(result[0], result[i]);
    });
  });
}
