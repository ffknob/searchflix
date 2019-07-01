const { Client } = require('@elastic/elasticsearch');

module.exports = class Elasticsearch {
  constructor() { }

  static getIndices(cb) {
    const client = new Client({ node: process.env.ES_HOST + ':' + process.env.ES_PORT });

    client.cat.indices(
      { format: 'json' },
      (err, { body }) => {
        if (err) {
          console.log(err);
          cb(err, null);
        } else {
          const indices = body.filter(index => index.status === 'open').map(index => index.index);
          cb(null, indices);
        }
      });
  }

  static getFields(index, cb) {
    const client = new Client({ node: process.env.ES_HOST + ':' + process.env.ES_PORT });

    client.indices.getMapping(
      { index: index },
      (err, { body }) => {
        if (err) {
          console.log(err);
          cb(err, null);
        } else {
          const type = Object.keys(body[index].mappings);
          const fields = Object.keys(body[index].mappings.properties);

          cb(null, fields);
        }
      });
  }

  static matchQuery(search, cb) {
    const client = new Client({ node: process.env.ES_HOST + ':' + process.env.ES_PORT });
    const body = `
      {
        "query": {
          "match": {
            "${search.field}": "${search.terms}"
          }
        }
      }
    `;

    client.search(
      {
        index: search.index,
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
