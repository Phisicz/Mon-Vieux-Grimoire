const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  userId: { type: String, required: true }, //user unique mongodb
  title: { type: String, required: true }, //titre du livre
  author: { type: String, required: true }, //auteur du livre
  imageUrl: { type: String, required: true }, //url de la couverture du livre
  year: { type: Number, required: true }, //année de publication du livre
  genre: {type: String, required: true}, //genre du livre
  ratings: [{
    userId: { type: String, required: true }, //user unique mongodb qui a noté le livre
    grade: { type: Number, required: true, min: 0, max: 5 }, //note d'un livre
    averageRating: { type: Number, required: true } //note moyenne du livre
  }]
});

module.exports = mongoose.model('Book', bookSchema);