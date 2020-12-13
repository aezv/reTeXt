class genObject {
    constructor(cTex, cMaxPrecision) {
        this.tex = cTex ? cTex : new Array();
        this.maxPrecision = cMaxPrecision ? cMaxPrecision : {
            value: 0,
            index: 0
        };
    }
}

module.exports = genObject;
