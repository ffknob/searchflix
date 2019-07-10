module.exports = class MatchQuery {
    constructor(matchClause, aggregations, highlight, options) {
        this.matchClause = matchClause;
        this.aggregations = aggregations;
        this.highlight = highlight;
        this.options = options;
    }

    toString() {
        let body = '{"query":' + this.matchClause;

        if (this.highlight) {
            body = body + ',' + this.highlight;
        }
    
        body = body + '}';

        return body;
    }
}