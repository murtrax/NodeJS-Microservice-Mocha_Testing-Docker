const express = require('express');
const thumbnailController = require('../controller/thumbnailController');

const router = express.Router();

router.post('/', thumbnailController.thumbnailGenerator);

module.exports = router;
