const fs = require('fs');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const child_process = require('child_process');
const cfg = require('../config.json');
const pngToBin = require('./pngToBin');

function compileBin(latexFormuls, callback) {
    let tempPath = cfg.pathCompile + '/' + Date.now();
    let strFormuls = '';
    mkdirp.sync(tempPath + '/img');
    for (i in latexFormuls)
        strFormuls += cfg.prefixFormulas + latexFormuls[i] + cfg.postfixFormulas;
    fs.writeFile(tempPath + '/temp.tex', cfg.prefix + strFormuls + cfg.postfix, function (error) {
        if (error) throw error;
        child_process.exec('latex -quiet -output-directory=' + tempPath + ' -job-name=temp ' + tempPath + '/temp.tex', (error) => {
            if (error) throw error;
        }).on('exit', (code => {
            //console.log('latex ' + path + 'code: ' + code);
            child_process.exec('dvipng -q* -D 300 -o ' + tempPath + '/img/temp_%d.png ' + tempPath + '/temp.dvi', (error) => {
                if (error) throw error;
            }).on('exit', (code => {
                //console.log('dvipng ' + path + 'code: ' + code);
                fs.readdir(tempPath + '/img/', (error, imgFiles) => {
                    if (error) throw error;
                    pngToBin(tempPath + '/img/temp_', '.png', 1, imgFiles.length).then(res => {
                        rimraf(tempPath, function () {
                            callback(res);
                        });
                    });
                });
            }));
        }));
    });
}

module.exports = compileBin;
