const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const apiRouter = require('./app_api/routes/trips');



// Connect to MongoDB and load models
require('./app_server/models/db');

// Import routes
const travelerRouter = require('./app_server/routes/travelerRoutes');

// Initialize app
const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', travelerRouter);
app.use('/api', apiRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

// Listen to port 3000 OUTSIDE the error handler
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});

module.exports = app;
