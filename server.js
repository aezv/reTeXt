const express = require('express');
const ejs = require('ejs');
const multer = require('multer');
const fs = require('fs');

const compileBin = require('./compileBin.js');

const app = express();
const port = 8000;

app.set('view engine', 'ejs');

app.use(express.static('source'));

const storageCfg = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'source/client');
    },
    filename: function (req, file, cb) {
        cb(null, 'file_' + Date.now() + '_' + file.originalname);
    }
});

app.use(multer({ storage: storageCfg }).single("fileData"));

app.get('/', function (req, res) {
    res.redirect('index.html');
});

app.post('/compile', function (request, response) {
    if (!request.body) return response.sendStatus(400);
    compileBin.build(request.body.id, JSON.parse(fs.readFileSync('./symbols.json')), function (res) {
        response.render('compile.ejs', {
            img: 'client/' + request.file.filename,
            id: request.body.id,
            status: 'ok: '
        });
    });
});

app.listen(port, () => {
    console.log(`Сервер запущен: http://localhost:${port}`);
});
