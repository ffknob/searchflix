const { Client } = require('@elastic/elasticsearch');

const Search = require('../models/search');
const MatchQuery = require('../models/match-query');
const MatchClause = require('../models/match-clause');
const Highlighter = require('../models/highlighter');

module.exports = class Elasticsearch {
  constructor() { }

  static getElasticsearchHost() {
    return `${process.env.ES_PROTOCOL || 'http'}://${process.env.ES_HOST || 'localhost'}:${process.env.ES_PORT || '9200'}`
  }

  static matchQuery(search, cb) {
    const matchClause = new MatchClause(search.field, search.terms);
    const highlighter = new Highlighter(search.field, 3, 50, ["<em>"], ["</em>"]);

    const matchQuery = new MatchQuery(matchClause.toString(), null, highlighter.toString(), null);

    this.executeQuery(search.index, matchQuery.toString(), cb);
  }
/*
  static boolQuery(search, cb) {
    const mustClauses = search.terms
      .filter(t => t.value)
      .map(t => this.matchClause(t.field, t.value))
      .reduce((acc, curr) => acc ? acc + ", " + curr: acc + curr);

    const body = `
      {
        "query": {
          "bool": {
            "must": [${mustClauses}]
          }
        }
      }
    `;

    this.executeQuery(search.index, body, cb);
  }
*/
  static moreLikeThisQuery(search, cb) {
    const body = `
      {
        "query": {
          "more_like_this": {
            "fields": [
              "${search.field}"
            ],
            "like": "${search.like}",
            "min_term_freq": 1,
            "max_query_terms": 12
          }
        }
      }
    `;

    this.executeQuery(search.index, body, cb);
  }

  static executeQuery(index, body, cb) {
    const client = new Client({ node: this.getElasticsearchHost() });

    console.log(body);

    client.search(
      {
        index: index,
        body: JSON.parse(body)
      },
      (err, { body }) => {
        if (err) {
          console.log(err);
          cb(err, null);
        } else {
          cb(null, body);
        }
      });
  }
};
