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

function genFilter(fGenObjects, index, maxWidth, maxHeight) {
    let object = new genObject();
    for (let i = 0; i < fGenObjects[index].tex.length; i++) {
        let filterBool = true;

        if (filterBool) {
            if (maxWidth < fGenObjects[index].areas[i][1] || maxHeight < fGenObjects[index].areas[i][3])
                filterBool = false;
        }

        if (filterBool) {
            for (let j = 0; j < reg.length; j++) {
                if (fGenObjects[index].tex[i].search(reg[j]) != -1) {
                    filterBool = false;
                    break;
                }
            }
        }

        if (filterBool) {
            for (let j = i + 1; j < fGenObjects[index].tex.length; j++) {
                if (fGenObjects[index].tex[i].replace(/{}/g, '') == fGenObjects[index].tex[j].replace(/{}/g, '')) {
                    filterBool = false;
                    break;
                }
            }
        }

        if (filterBool) {
            for (let j = 0; j < fGenObjects.length; j++) {
                let boolContinue = true;
                if (index != j) {
                    for (let ii = 0; ii < fGenObjects[j].tex.length; ii++) {
                        if (fGenObjects[index].tex[i].replace(/{}/g, '') == fGenObjects[j].tex[ii].replace(/{}/g, '')) {
                            filterBool = false;
                            boolContinue = false;
                            break;
                        }
                    }
                }
                if (!boolContinue)
                    break;
            }
        }

        if (filterBool) {
            object.tex.push(fGenObjects[index].tex[i]);
            object.areas.push(fGenObjects[index].areas[i]);
        }
    }
    return object;
}

module.exports.genFilter = genFilter;