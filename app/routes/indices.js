const express = require('express');
const router = express.Router();

const indicesController = require('../controllers/indices');

router.get('/', indicesController.getIndices);
router.post('/:index/fields', indicesController.getFields);

module.exports = router;
