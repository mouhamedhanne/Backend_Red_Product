const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: 'Token invalide ou expiré.' });
            } else {
                req.userId = decodedToken.userId;
                next();
            }
        });
    } else {
        return res.status(401).json({ message: 'Token manquant.' });
    }
};

module.exports = { requireAuth };