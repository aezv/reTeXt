const Handlebars = require('handlebars');

const cfgTemplate = {
    name: 'reTeXt processing',
    header: 'Страница обработчика',
    css: 'styles/processing.css',
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
    '<h2>{{headerL2}}</h2>' +
    '<img src="{{pathImage}}" alt="">'+

    '<form action="/" method="get">' +
    '<button type="submit">Главная страница</button>' +
    '</form>' +

    '<form action="/result" method="post">' +
    '<button type="submit">Запустить алгоритм</button>' +
    '</form>' +

    '</body>' +
    //********************
    '</html>';

const template = Handlebars.compile(source);

module.exports = template;
