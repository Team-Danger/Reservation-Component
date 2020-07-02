const mongoose = require('mongoose');

const DB = process.env.DB || 'localhost';
const mongoUri = `mongodb://${DB}/listing`;
const db = mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
const { connection } = mongoose;

module.exports = db;
module.exports.connection = connection;
