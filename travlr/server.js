const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Path to trips.json
const tripsPath = path.join(__dirname, 'trips.json');

// Load trips from file
let trips = [];
if (fs.existsSync(tripsPath)) {
    const data = fs.readFileSync(tripsPath, 'utf8');
    trips = JSON.parse(data);
}

// GET all trips
app.get('/api/trips', (req, res) => {
    res.json(trips);
});

// POST a new trip
app.post('/api/trips', (req, res) => {
    const newTrip = { ...req.body, _id: Date.now().toString() };
    trips.push(newTrip);
    fs.writeFileSync(tripsPath, JSON.stringify(trips, null, 2));
    res.status(201).json(newTrip);
});

// PUT update a trip
app.put('/api/trips/:id', (req, res) => {
    const id = req.params.id;
    const index = trips.findIndex(t => t._id === id);
    if (index === -1) return res.status(404).json({ error: 'Trip not found' });

    trips[index] = { ...req.body, _id: id };
    fs.writeFileSync(tripsPath, JSON.stringify(trips, null, 2));
    res.json(trips[index]);
});

// DELETE a trip
app.delete('/api/trips/:id', (req, res) => {
    const id = req.params.id;
    const filtered = trips.filter(t => t._id !== id);
    if (filtered.length === trips.length) return res.status(404).json({ error: 'Trip not found' });

    trips = filtered;
    fs.writeFileSync(tripsPath, JSON.stringify(trips, null, 2));
    res.status(204).end();
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
