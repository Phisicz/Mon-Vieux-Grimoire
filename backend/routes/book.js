const express = require('express');
const router = express.Router();

const auth = require ('../middleware/auth')

const bookController = require('../controllers/book')

// Create a new book in the database
router.post('/', auth, bookController.createBook);
// Return all books in the database
  router.get('/', auth, bookController.getAllBooks);
// Return the single book with the provided _id
  router.get('/:id', auth, bookController.getOneBook);
// Update the book with the provided  _id  with the data provided in the request body.
  router.put('/:id', auth, bookController.updateBook);
// Delete the single book with the provided _id
  router.delete('/:id', auth, bookController.deleteBook);

module.exports = router;