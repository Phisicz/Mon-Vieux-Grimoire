const express = require('express');
const mongoose = require('mongoose');
const Book = require ('./models/Book');

const app = express();

app.use(express.json());

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

// Create a new book in the database
app.post('/api/books', (req, res, next) => {
  const book = new Book({
      ...req.body
  });

  book.save()
  .then((book) => {
      res.status(201).json({book: book});
  })
  .catch((error) => {
      res.status(400).json({error: error});
  });
});

// Return all books in the database
app.get('/api/books', (req, res, next) => {
  Book.find()
  .then((books) => {
      res.status(200).json(books);
  })
  .catch((error) => {
      res.status(400).json({error: error});
  });
});

// Return the single book with the provided _id
app.get('/api/books/:id', (req, res, next) => {
  Book.findOne({_id: req.params.id})
  .then((book) => {
      res.status(200).json(book);
  })
  .catch((error) => {
      res.status(404).json({error: error});
  });
});

// Update the book with the provided  _id  with the data provided in the request body.
app.put('/api/books/:id', (req, res, next) => {
  const book = new Book({
      _id: req.params.id,
      ...req.body
  });

  Book.updateOne({_id: req.params.id}, book)
  .then(() => {
      res.status(201).json({message: 'Modified!'});
  })
  .catch((error) => {
      res.status(400).json({error: error});
  });
});


// Delete the single book with the provided _id
app.delete('/api/books/:id', (req, res, next) => {
  Book.deleteOne({_id: req.params.id})
  .then(() => {
      res.status(201).json({message: 'Deleted!'});
  })
  .catch((error) => {
      res.status(404).json({error: error});
  });
});

module.exports = app;