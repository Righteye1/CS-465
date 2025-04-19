const jwt = require('jsonwebtoken');
const secret = 'yourSuperSecretKey'; // Use .env in production

// Generate a JWT token
function generateToken(user) {
    return jwt.sign(user, secret, { expiresIn: '2h' });
}

// Middleware to verify token
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'No token provided' });

    jwt.verify(token.replace('Bearer ', ''), secret, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Failed to authenticate token' });
        req.user = decoded;
        next();
    });
}

module.exports = { generateToken, verifyToken };
