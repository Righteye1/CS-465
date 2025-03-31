const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    length: { type: Number, required: true },
    start: { type: Date, required: true },
    resort: { type: String },
    perPerson: { type: Number },
    image: { type: String },
    description: { type: String }
});

mongoose.model('Trip', tripSchema);
