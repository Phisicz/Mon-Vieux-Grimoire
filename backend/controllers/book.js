const Book = require('../models/Book');
const fs = require('fs');

// Create book rating
exports.setRating = (req, res, next) => {
    const user = req.body.userId;
    const grade = req.body.rating;

    // Vérifiez si la note est un nombre valide et entre 1 et 5
    if (isNaN(grade) || grade < 1 || grade > 5) {
        return res.status(400).json({ message: "La note doit être comprise entre 1 et 5." });
    }

    // Vérifiez si l'utilisateur est autorisé à noter le livre
    if (user !== req.auth.userId) {
        return res.status(403).json({ message: "Non autorisé" });
    }

    // Trouvez le livre et mettez à jour la note
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (!book) {
                return res.status(404).json({ message: "Livre non trouvé" });
            }

            // Vérifiez si l'utilisateur a déjà noté ce livre
            if (book.ratings.some(rating => rating.userId.toString() === user.toString())) {
                return res.status(401).json({ message: "Livre déjà noté" });
            }

            // Ajoutez la nouvelle note au livre
            const newRating = {
                userId: user,
                grade: grade,
            };
            book.ratings.push(newRating);

            // Calculez la nouvelle moyenne des notes
            const totalRatings = book.ratings.reduce((acc, curr) => acc + Number(curr.grade), 0);
            book.averageRating = Math.round((totalRatings / book.ratings.length) * 10) / 10;

            // Sauvegardez le livre avec la nouvelle note
            return book.save();
        })
        .then(updatedBook => {
            res.status(200).json(updatedBook);
        })
        .catch(error => {
            res.status(400).json({ error });
        });
};


// Create a new book in the database
exports.createBook = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ message: "Vous devez ajouter une image pour créer un livre." });
    }

    let bookObject;
    try {
        bookObject = JSON.parse(req.body.book);
        
        // Ici, vous pouvez vérifier si la note a été fournie dans l'objet book
        if (!bookObject.averageRating || bookObject.averageRating < 1 || bookObject.averageRating > 5) {
            return res.status(400).json({ message: "Vous devez attribuer une note entre 1 et 5 pour créer un livre." });
        }

        // Vous pourriez également vouloir vérifier si un tableau de ratings est fourni, et s'il contient au moins une note
        if (!bookObject.ratings || !bookObject.ratings.length || bookObject.ratings.some(r => r.grade < 1 || r.grade > 5)) {
            return res.status(400).json({ message: "Vous devez attribuer une note valide au livre." });
        }

        delete bookObject._id;
        delete bookObject._userId;

    } catch (error) {
        return res.status(400).json({ message: "Les données du livre sont invalides. Veuillez réessayer." });
    }

    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename.split(".")[0]}.webp`,
    });

    book.save()
        .then(() => res.status(201).json({ message: 'Livre enregistré avec succès.' }))
        .catch((error) => {
            fs.unlink(req.file.path, () => {
                res.status(500).json({ error });
            });
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

// Update the book with the provided _id with the data provided in the request body.
exports.updateBook = (req, res, next) => {
    const bookObject = req.file
        ? // Si modification de l'image on copie les nouvelles données
          {
              ...JSON.parse(req.body.book),
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                  req.file.filename.split(".")[0]
              }.webp`,
          }
        : { ...req.body };

    delete bookObject._userId;

    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(403).json({ message: "Utilisateur non autorisé" });
            } else {
                // Extrait le nom de l'image actuellement stockée
                const oldPicture = book.imageUrl.split("/").pop();

                Book.updateOne({ _id: req.params.id }, { ...bookObject })

                    .then(() => {
                        // Pour supprimer l'ancienne image du dossier si une nouvelle image est détectée
                        if (req.file) {
                            fs.unlink(`images/${oldPicture}`, (err) => {
                                if (err) {
                                    res.status(500).json({ error: err });
                                } else {
                                    res.status(200).json({
                                        message: "Livre modifié",
                                    });
                                }
                            });
                        } else {
                            res.status(200).json({ message: "Livre modifié" });
                        }
                    })
                    .catch((error) => res.status(400).json({ error }));
            }
        })
        .catch((error) => res.status(500).json({ error }));
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