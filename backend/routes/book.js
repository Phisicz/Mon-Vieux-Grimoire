const express = require('express');
const router = express.Router();

const bookController = require('../controllers/book')

// Create a new book in the database
router.post('/', bookController.createBook);
// Return all books in the database
  router.get('/', bookController.getAllBooks);
// Return the single book with the provided _id
  router.get('/:id', bookController.getOneBook);
// Update the book with the provided  _id  with the data provided in the request body.
  router.put('/:id', bookController.updateBook);
// Delete the single book with the provided _id
  router.delete('/:id', bookController.deleteBook);

module.exports = router;