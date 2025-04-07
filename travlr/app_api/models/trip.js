const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    // your schema fields here
    name: { type: String, required: true },
    destination: String,
    price: Number,
    date: Date
    // etc.
});

// ✅ Fix: Only register model if it hasn't been registered already
mongoose.models.Trip || mongoose.model('Trip', tripSchema);
