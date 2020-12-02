const fs = require('fs');

var tex = JSON.parse(fs.readFileSync('./gen_modules/symbols.json'));
var bin = JSON.parse(fs.readFileSync('./gen_modules/bin.json'));
var temp = JSON.parse(fs.readFileSync('./temp.json'));

if (process.argv[2] == '--all') {
    let l1 = 0;

    for (i in bin) {
        l1++;
    }

    for (let count = 0; count < l1; count++) {
        let json = bin[count];
        console.log(tex[count]);
        for (let x = 0; x < json.length; x++) {
            let str = '';
            for (let y = 0; y < json[x].length; y++) {
                str += json[x][y];
            }
            console.log(str);
        }
        console.log('');
    }
}
else if (process.argv[2] == '--last') {
    let json = bin[bin.length - 1];

    for (let x = 0; x < json.length; x++) {
        let str = '';
        for (let y = 0; y < json[x].length; y++) {
            str += json[x][y];
        }
        console.log(str);
    }
}
else if (process.argv[2] == '--temp') {
    let jsonRevers = temp;

    let json = new Array();
    for (let y = 0; y < jsonRevers[0].length; y++) {
        let temp = new Array();
        for (let x = 0; x < jsonRevers.length; x++)
            temp.push(jsonRevers[x][y]);
        json.push(temp);
    }

    for (let x = 0; x < json.length; x++) {
        let str = '';
        for (let y = 0; y < json[x].length; y++) {
            str += json[x][y];
        }
        console.log(str);
    }
}
else if (process.argv[2] == '--log') {
    let l1 = 0;

    for (i in combine) {
        l1++;
    }

    for (let count = 0; count < l1; count++) {
        let tex = combine[count][0];
        let matrix = combine[count][1];
        console.log(tex);
        for (let x = 0; x < matrix.length; x++) {
            let str = '';
            for (let y = 0; y < matrix[x].length; y++) {
                str += matrix[x][y];
            }
            console.log(str);
        }
        console.log('');
    }
}
else {
    let json = bin[process.argv[2]];

    for (let x = 0; x < json.length; x++) {
        let str = '';
        for (let y = 0; y < json[x].length; y++) {
            str += json[x][y];
        }
        console.log(str);
    }
}