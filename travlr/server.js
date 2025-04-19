const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { generateToken, verifyToken } = require('./auth');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

const tripsPath = path.join(__dirname, 'trips.json');
let trips = [];
if (fs.existsSync(tripsPath)) {
    const data = fs.readFileSync(tripsPath, 'utf8');
    trips = JSON.parse(data);
}

// Hardcoded admin user
const adminUser = {
    username: 'admin',
    passwordHash: bcrypt.hashSync('admin123', 10)
};

// Login Route
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (username === adminUser.username && bcrypt.compareSync(password, adminUser.passwordHash)) {
        const token = generateToken({ username });
        return res.json({ token });
    }

    res.status(401).json({ message: 'Invalid credentials' });
});

// GET 
app.get('/api/trips', (req, res) => {
    res.json(trips);
});

// POST
app.post('/api/trips', verifyToken, (req, res) => {
    const newTrip = { ...req.body, _id: Date.now().toString() };
    trips.push(newTrip);
    fs.writeFileSync(tripsPath, JSON.stringify(trips, null, 2));
    res.status(201).json(newTrip);
});

// PUT
app.put('/api/trips/:id', verifyToken, (req, res) => {
    const id = req.params.id;
    const index = trips.findIndex(t => t._id === id);
    if (index === -1) return res.status(404).json({ error: 'Trip not found' });

    trips[index] = { ...req.body, _id: id };
    fs.writeFileSync(tripsPath, JSON.stringify(trips, null, 2));
    res.json(trips[index]);
});

//  DELETE
app.delete('/api/trips/:id', verifyToken, (req, res) => {
    const id = req.params.id;
    const filtered = trips.filter(t => t._id !== id);
    if (filtered.length === trips.length) return res.status(404).json({ error: 'Trip not found' });

    trips = filtered;
    fs.writeFileSync(tripsPath, JSON.stringify(trips, null, 2));
    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
