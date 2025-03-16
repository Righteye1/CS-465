const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars as the template engine
app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const travelerRoutes = require('./app_server/routes/travelerRoutes');
app.use('/', travelerRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
