const genObject = require('./genObject').genObject;

let reg = [
    /(}\^)/g,
    /}_/g,

    /\+\++/g,
    /--+/g,
    /\+-/g,
    /-\+/g,

    /{\+}/g,
    /{-}/g,
];

function genFilter(fGenObject, maxWidth, maxHeight) {
    let object = new genObject();
    for (let i = 0; i < fGenObject.tex.length; i++) {
        let filterBool = true;

        if (filterBool) {
            if (maxWidth < fGenObject.areas[i][1] || maxHeight < fGenObject.areas[i][3])
                filterBool = false;
        }

        if (filterBool) {
            for (let j = 0; j < reg.length; j++) {
                if (fGenObject.tex[i].search(reg[j]) != -1) {
                    filterBool = false;
                    break;
                }
            }
        }

        if (filterBool) {
            for (let j = i + 1; j < fGenObject.tex.length; j++) {
                if (fGenObject.tex[i].replace(/{}/g, '') == fGenObject.tex[j].replace(/{}/g, '')) {
                    filterBool = false;
                    break;
                }
            }
        }

        if (filterBool) {
            object.tex.push(fGenObject.tex[i]);
            object.areas.push(fGenObject.areas[i]);
        }
    }
    return object;
}

module.exports.genFilter = genFilter;