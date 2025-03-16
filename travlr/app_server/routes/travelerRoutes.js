const express = require('express');
const router = express.Router();
const travelerController = require('../controllers/travelerController');

router.get('/', travelerController.home);

module.exports = router;
