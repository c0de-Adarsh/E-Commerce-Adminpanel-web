const mongoose = require('mongoose');
require('dotenv').config()

const Mongourl = process.env.MONGO_URL

mongoose.connect(Mongourl,{
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})

const db = mongoose.connection;

db.on('error', (error) => console.error(error));

db.on('connected', () => console.log('Connected to MongoDB'));

db.on('disconnected', () => console.log('Disconnected from MongoDB'));

module.exports = db;