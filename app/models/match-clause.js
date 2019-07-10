module.exports = class MatchClause {
    constructor(field, value) {
        this.field = field;
        this.value = value;
    }

    toString() {
        if (typeof this.value === 'string') {
            return `{"match":{"${this.field}":"${this.value}"}}`;
        } else {
            return `{"match":{"${this.field}":${this.value}}}`;
        }
    }
}