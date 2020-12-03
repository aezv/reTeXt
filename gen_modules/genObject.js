class genObject {
    constructor(cTex, cAreas) {
        this.tex = cTex ? cTex : new Array();
        this.areas = cAreas ? cAreas : new Array();
    }
}

module.exports.genObject = genObject;
