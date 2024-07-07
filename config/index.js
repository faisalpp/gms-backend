const dotenv = require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

module.exports = {
    NODE_ENV,
    PORT,
    MONGODB_CONNECTION_STRING,
}