const path = require('path');
const fs = require('fs');

exports.trips = (req, res) => {
    const dataPath = path.join(__dirname, '../../trips.json');
    const trips = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    res.render('trips', {
        title: 'Available Trips',
        trips: trips
    });
};