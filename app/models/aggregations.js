module.exports = class TermsAggregation {
    constructor(aggregations) {
        this.aggregations = aggregations;
    }

    toString() {
        let aggs = `{"aggs":`
        this.aggregations.array.forEach(aggregation => {
            aggs = aggs + aggregation.toString();
        });

        aggs = aggs + '}';

        return aggs;
    }
}