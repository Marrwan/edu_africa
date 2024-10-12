const jwt = require('jsonwebtoken');
const {jwtSecret} = require("../config/config");

exports.generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, jwtSecret, { expiresIn: '1d' });
};
