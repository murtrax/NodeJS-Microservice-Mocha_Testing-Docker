const express = require('express');

const jsonPatchController = require('../controller/jsonPatchController');

const router = express.Router();

router.patch('/', jsonPatchController.jsonPatch);

module.exports = router;
