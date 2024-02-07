const Book = require ('../models/Book');
const fs = require('fs');

// Create a new book in the database
exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        ratings: {
            userId: req.auth.userId,
            grade: 0,
            averageRating:0
        }
    });
    book.save()
    .then((book) => {
        res.status(201).json({message: 'Livre enregistré'});
    })
    .catch((error) => {
        res.status(400).json({ error });
    });
  };

  // Set the rating for the provided user ID
exports.setBookRating = (req, res, next) => {
    const { userId, rating } = req.body;
    const bookId = req.params.id;

    // Validate the rating value
    if (rating < 0 || rating > 5) {
        return res.status(400).json({ error: 'Rating must be between 0 and 5' });
    }

    // Find the book by its ID in the database
    Book.findById(bookId)
        .then(book => {
            if (!book) {
                return res.status(404).json({ error: 'Book not found' });
            }

            // Check if the user has already rated the book
            const existingRating = book.rating.find(entry => entry.userId === userId);
            if (existingRating) {
                return res.status(400).json({ error: 'User has already rated this book' });
            }

            // Add the new rating entry to the book's rating array
            book.rating.push({ userId, rating });

            // Save the updated book
            return book.save();
        })
        .then(updatedBook => {
            res.status(200).json(updatedBook);
        })
        .catch(error => {
            res.status(500).json({ error: 'Internal server error' });
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
    console.log(req.params.id)
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
    const bookObject = req.file ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    delete bookObject._userId;
    Book.findOne({_id: req.params.id})
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Livre modifié !'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
 };

  // Delete the single book with the provided _id
  exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id})
        .then(book => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'});
            } else {
                const filename = book.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Book.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Livre supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
 };