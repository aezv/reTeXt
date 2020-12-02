class genObject {
    constructor(cTex, cMatrixes, cAreas) {
        this.tex = cTex ? cTex : new Array();
        this.matrixes = cMatrixes ? cMatrixes : new Array();
        this.areas = cAreas ? cAreas : new Array();
    }
}

module.exports.genObject = genObject;
