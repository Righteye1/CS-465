exports.home = (req, res) => {
    res.render('home', { title: 'Travlr Getaways', message: 'Welcome to Travlr!' });
};
