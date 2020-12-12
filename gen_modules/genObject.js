class genObject {
    constructor(cTex, cAreas, cMaxPrecision) {
        this.tex = cTex ? cTex : new Array();
        this.areas = cAreas ? cAreas : new Array();
        this.maxPrecision = cMaxPrecision ? cMaxPrecision : {
            value: 0,
            index: 0
        };
    }
}

module.exports = genObject;
