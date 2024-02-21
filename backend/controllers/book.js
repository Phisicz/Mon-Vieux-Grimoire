const Book = require('../models/Book');
const fs = require('fs');

// Create book rating
exports.setRating = (req, res, next) => {
    const user = req.body.userId;

    const newRating = {
        userId: user,
        grade: req.body.rating,
    };

    if (user !== req.auth.userId) {
        return res.status(403).json({ message: "Non autorisé" });
    }

    Book.findOne({ _id: req.params.id })
        .then((book) => {
            // Checks if book has rating already from a given user
            if (book.ratings.find((rating) => rating.userId === user)) {
                return res.status(401).json({ message: "Livre déjà noté" });
            }
            book.ratings.push(newRating);

            // Update rating
            const totalRatings = book.ratings.reduce(
                (acc, curr) => acc + curr.grade,
                0
            );

            // Adjust the divisor to include the current user's rating
            const divisor = book.ratings.length;

            book.averageRating =
                Math.round((totalRatings / divisor) * 10) / 10;

            return book
                .save()
                .then((updatedBook) => res.status(200).json(updatedBook))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(400).json({ error }));
};

// Create a new book in the database
exports.createBook = (req, res, next) => {
    // Checks if user has uploaded picture
    if (!req.file) {
        return res
            .status(400)
            .json({ message: "L'ajout d'une image est obligatoire" });
    }

    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;

    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        averageRating: 0,
    });
    book.save()
        .then((book) => {
            res.status(201).json({ message: 'Livre enregistré' });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

// Return top rated books
exports.getBestBook = (req, res, next) => {
    Book.find()
        .sort({ averageRating: -1 })
        .limit(3)
        .then((books) => res.status(200).json(books))
        .catch((error) => res.status(400).json({ error }));
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
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (!book) {
                return res.status(404).json({ message: "Livre non trouvé" });
            }
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
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (!book) {
                return res.status(404).json({ message: "Livre non trouvé" });
            }
            if (book.userId != req.auth.userId) {
                return res.status(403).json({ message: 'Non autorisé' });
            }
            Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Livre modifié !' }))
                .catch(error => res.status(404).json({ error }));
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

// Delete the single book with the provided _id
exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => {
            if (!book) {
                return res.status(404).json({ message: "Livre non trouvé" });
            }
            if (book.userId != req.auth.userId) {
                return res.status(403).json({ message: 'Non autorisé' });
            }
            const filename = book.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Book.deleteOne({ _id: req.params.id })
                    .then(() => { res.status(200).json({ message: 'Livre supprimé !' }) })
                    .catch(error => res.status(403).json({ error }));
            });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};