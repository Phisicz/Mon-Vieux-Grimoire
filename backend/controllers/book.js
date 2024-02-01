const Book = require ('../models/Book');

// Create a new book in the database
exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
  
    book.save()
    .then((book) => {
        res.status(201).json({message: 'Livre enregistré'});
    })
    .catch((error) => {
        res.status(400).json({ error });
    });
  };

  // Return all books in the database
exports.getAllBooks = (req, res, next) => {
    Book.find()
    .then((books) => {
        res.status(200).json(books);
    })
    .catch((error) => {
        res.status(400).json({ error });
    });
  }; 
  
  // Return the single book with the provided _id
exports.getOneBook = (req, res, next) => {
    Book.findOne({_id: req.params.id})
    .then((book) => {
        res.status(200).json(book);
    })
    .catch((error) => {
        res.status(404).json({ error });
    });
  };

  // Update the book with the provided  _id  with the data provided in the request body.
exports.updateBook = (req, res, next) => {
    const book = new Book({
        _id: req.params.id,
        ...req.body
    });
    Book.updateOne({_id: req.params.id}, book)
    .then(() => {
        res.status(201).json({message: 'Modified!'});
    })
    .catch((error) => {
        res.status(400).json({ error });
    });
  };

  // Delete the single book with the provided _id
  exports.deleteBook = (req, res, next) => {
    Book.deleteOne({_id: req.params.id})
    .then(() => {
        res.status(201).json({message: 'Deleted!'});
    })
    .catch((error) => {
        res.status(404).json({ error });
    });
  };