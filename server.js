const cfg = require('./config.json');
const express = require('express');
const multer = require("multer");
const mkdirp = require('mkdirp');
const router = require('./router');

const app = express();

mkdirp.sync(cfg.tempDirectory);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './temp');
    },
    filename: function (req, file, cb) {
        cb(null, 'img' + Date.now() + '.' + file.originalname.replace(/.+(\.)/, ''));
    }
});

//app.use(multer({ dest: './temp' }).single('fileData'));

app.use(multer({ storage: storage }).single('fileData'));


app.use(express.static('source'));

app.use('/', router);

app.listen(cfg.port, cfg.host, () => {
    console.log(`Сервер запущен: http://${cfg.host}:${cfg.port}`);
});
