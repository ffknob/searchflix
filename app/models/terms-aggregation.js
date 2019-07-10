module.exports = class TermsAggregation {
    constructor(field) {
        this.field = field;
    }

    toString() {
        return `"__${field}":{"terms":{"field": "${field}"}}}`;
    }
}