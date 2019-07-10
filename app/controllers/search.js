const Elasticsearch = require('../services/elasticsearch');

const Search = require('../models/search');

exports.search = (req, res, next) => {
  const index = req.body.index;
  const searchField = req.body.searchField;
  const highlightFields = req.body.highlightFields;
  const termsAggregationFields = req.body.termsAggregationFields;
  const terms = req.body.terms;

console.log(req.body);

  const search = new Search(index, searchField, terms);

  Elasticsearch.matchQuery(search, (err, results) => {
    if (err) {
      console.log(err);
    } else {
console.log(JSON.stringify(results));
      res.render(
        'index',
        {
          pageTitle: 'Searchflix',
          path: '/search',
          results: results
        });
    }
  });
};
