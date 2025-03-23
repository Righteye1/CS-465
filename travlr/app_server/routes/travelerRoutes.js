const express = require('express');
const router = express.Router();
const travelerController = require('../controllers/travelerController');

// Route for the trips page
router.get('/trips', travelerController.trips);

module.exports = router;
