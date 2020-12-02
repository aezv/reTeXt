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

function genFilter(tex) {
    //console.log(tex);
    let object = new Array();
    for (let i = 0; i < tex.length; i++) {
        let filterBool = true;

        for (let j = 0; j < reg.length; j++) {
            if (tex[i].search(reg[j]) != -1) {
                filterBool = false;
                break;
            }
        }

        if (filterBool) {
            for (let j = i + 1; j < tex.length; j++) {
                if (tex[i].replace(/{}/g, '') == tex[j].replace(/{}/g, '')) {
                    filterBool = false;
                    break;
                }
            }
        }

        if (filterBool)
            object.push(tex[i]);
    }
    return object;
}

module.exports.genFilter = genFilter;