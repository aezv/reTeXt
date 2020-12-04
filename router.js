const cfg = require('./config.json');
const child_process = require('child_process');
const router = require('express').Router();

const mainTemplate = require('./source/templates/main');
const processingTemplate = require('./source/templates/processing');
const resultTemplate = require('./source/templates/result');

router.get('/', function (req, res) {
  res.send(mainTemplate());
});

router.post('/processing', function (req, res) {
  if (req.file) {
    res.send(processingTemplate({
      headerL2: 'Изображение успешно обработано',
      pathImage: req.file.filename
    }));
  }
  else
    res.send(processingTemplate({ headerL2: 'Не удалось обработать изображение' }));
});

router.post('/result', function (req, res) {
  let processExec = child_process.exec('node genAlgorithm.js', function (error, stdout, stderr) {
    let arrayData = stdout.split('\n');
    res.send(resultTemplate({
      data: arrayData
    }));
  });
});

module.exports = router;