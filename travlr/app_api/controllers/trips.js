const mongoose = require('mongoose');

// Ensure the Trip model is registered before using it
require('../models/trip');

const Trip = mongoose.model('Trip');

const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find();
        res.status(200).json(trips);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving trips" });
    }
};

const tripsReadOne = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.tripid);
        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }
        res.status(200).json(trip);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving trip" });
    }
};

module.exports = {
    tripsList,
    tripsReadOne
};
