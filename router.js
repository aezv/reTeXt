const child_process = require('child_process');
const router = require('express').Router();

const mainTemplate = require('./source/templates/main');
const processingTemplate = require('./source/templates/processing');

router.get('/', function (req, res) {
  res.send(mainTemplate());
});

router.post('/processing', function (req, res) {
  if (req.file) {
    res.send(processingTemplate({ headerL2: 'Изображение успешно обработано' }));
  }
  else
    res.send(processingTemplate({ headerL2: 'Не удалось обработать изображение' }));
});

module.exports = router;