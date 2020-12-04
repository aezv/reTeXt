const Handlebars = require('handlebars');

const cfgTemplate = {
    name: 'reTeXt result',
    header: 'Результат',
    css: 'styles/result.css',
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

    '<form action="/" method="get">' +
    '<button type="submit">Главная страница</button>' +
    '</form>' +
    
    '{{{loud data}}}' +

    '</body>' +
    //********************
    '</html>';

Handlebars.registerHelper('loud', function (dataArray) {
    let reDataArray = '';
    for (let i = 0; i < dataArray.length; i++)
        reDataArray += '<p>' + dataArray[i] + '</p>';
    return '<div>' + reDataArray + '</div>';
});

const template = Handlebars.compile(source);


module.exports = template;
