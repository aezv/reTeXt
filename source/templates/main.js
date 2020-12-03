const Handlebars = require('handlebars');

const cfgTemplate = {
    name: 'reTeXt main',
    header: 'Главная страница',
    css: 'styles/main.css',
    script: ''
}

const source =
    '<!DOCTYPE html>' +
    '<html lang="en">' +
    //********************
    '<head>' +

    '<meta charset="UTF-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
    '<title>' + cfgTemplate.name + '</title>' +
    '<link rel="stylesheet" type="text/css" href="' + cfgTemplate.css + '"></link>' +

    '</head>' +
    //********************
    '<body>' +

    '<h1>' + cfgTemplate.header + '</h1>' +
    '<form action="/processing" method="post" enctype="multipart/form-data">' +
    '<p id="inputImage"> <input type="file" name="fileData" accept="image/png, image/jpg, image/jpeg">' +
    '<button type="submit">Отправить</button> </p>' +
    '</form>' +

    '</body>' +
    //********************
    '</html>';

const template = Handlebars.compile(source);

module.exports = template;
