const Handlebars = require('handlebars');

const source =
    '<!DOCTYPE html>' +
    '<html lang="en">' +
    //********************
    '<head>' +

    '<meta charset="UTF-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
    '<title>reTeXt main</title>' +
    '<link rel="stylesheet" type="text/css" href="styles/main.css"></link>' +

    '</head>' +
    //********************
    '<body>' +

    '<h1>Главная страница</h1>' +
    '<form action="/processing" method="post" enctype="multipart/form-data">' +
    '<p id="inputImage"> <input type="file" name="fileData" accept="image/png, image/jpg, image/jpeg">' +
    '<button type="submit">Отправить</button> </p>' +
    '</form>' +

    '</body>' +
    //********************
    '</html>';

const template = Handlebars.compile(source);

module.exports = template;
