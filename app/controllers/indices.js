const Elasticsearch = require('../services/elasticsearch');

exports.getIndices = (req, res, next) => {

    Elasticsearch.getIndices((err, indices) => {
        if (err) {
            console.log(err);
        } else {
            if (err) {
                console.log(err);
            } else {
                res.json(indices);
            }
        }
    });
};

exports.getFields = (req, res, next) => {
    const index = req.params.index;

    Elasticsearch.getFields(index, (err, fields) => {
        if (err) {
            console.log(err);
        } else {
            if (err) {
                console.log(err);
            } else {
                res.json(fields);
            }
        }
    });
};