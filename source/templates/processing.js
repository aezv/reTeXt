const Handlebars = require('handlebars');

const source =
    '<!DOCTYPE html>' +
    '<html lang="en">' +
    //********************
    '<head>' +

    '<meta charset="UTF-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
    '<title>reTeXt processing</title>' +
    '<link rel="stylesheet" type="text/css" href="styles/processing.css"></link>' +

    '</head>' +
    //********************
    '<body>' +

    '<h1>Страница обработчика</h1>' +
    '<h2>{{headerL2}}</h2>' +
    '<form action="/" method="get">' +
    '<button type="submit">Главная страница</button> </p>' +
    '</form>' +
    '<div>{{data}}</div>' +

    '</body>' +
    //********************
    '</html>';

const template = Handlebars.compile(source);

module.exports = template;
