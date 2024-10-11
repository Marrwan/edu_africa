const dotenv = require("dotenv");
dotenv.config()


module.exports = {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpire: '24h',
    PORT: process.env.PORT || 4000,
};
