const Elasticsearch = require('../services/elasticsearch');

const Search = require('../models/search');

exports.search = (req, res, next) => {
  const index = req.body.index;
  const field = req.body.field;
  const terms = req.body.terms;

  const search = new Search(index, field, terms);

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
