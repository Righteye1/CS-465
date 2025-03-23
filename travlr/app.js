const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3000;


app.set('views', path.join(__dirname, 'app_server', 'views'));

// Set up Handlebars
app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Use your routes
const travelerRoutes = require('./app_server/routes/travelerRoutes');
app.use('/', travelerRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Trips route available at: http://localhost:${PORT}/trips`);
});
