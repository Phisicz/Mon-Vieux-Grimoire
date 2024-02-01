const express = require('express');
const mongoose = require('mongoose');
const Book = require ('./models/Book');
const bookRoutes = require('./routes/book');

const app = express();

app.use(express.json());
app.use('/api/books', bookRoutes);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

mongoose.connect('mongodb+srv://adminOC:cYOj87wWszpWWsPe@databaseoc.6ynao2m.mongodb.net/books?retryWrites=true&w=majority')
.then(() => {
    console.log('Successfully connected to MongoDB Community Atlas!')
})
.catch((error) => {
    console.log('Unable to connect to MongoDB Community Atlas!');
    console.error(error);
});

module.exports = app;