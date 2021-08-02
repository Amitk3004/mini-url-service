const express = require('express');
const router = express.Router();
const urlController = require('../controllers/base-controller');

router.get('/:shorturl', urlController.getOriginalUrl);

router.post('/create', urlController.createMiniUrl);

router.delete('/delete/:shorturl', urlController.deleteRecord);

module.exports = router;