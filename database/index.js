const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost/listing';
const db = mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
const { connection } = mongoose;

module.exports = db;
module.exports.connection = connection;
