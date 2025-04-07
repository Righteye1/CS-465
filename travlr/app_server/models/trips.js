const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    name: { type: String, required: true },
    destination: { type: String },
    price: { type: Number },
    date: { type: Date }
});

// ✅ Only register model if it hasn't been registered yet
module.exports = mongoose.models.Trip || mongoose.model('Trip', tripSchema);
