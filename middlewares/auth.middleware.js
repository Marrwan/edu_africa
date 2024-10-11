const jwt = require('jsonwebtoken');
const User = require('../models/user.model');


exports.authenticateJWT = async (req, res, next) => {
    try {

        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Access Denied' });
        }


        const token = authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Access Denied' });


        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);


        const user = await User.findOne({ username: decodedToken.username });
        if (!user) return res.status(401).json({ message: 'Access Denied' });


        req.user = user;
        next();
    } catch (error) {

        res.status(401).json({ message: 'Invalid or expired token' });
    }
};
