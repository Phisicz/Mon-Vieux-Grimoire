const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: String, required: true },
  category: {type: String, required: true},
  review: {type: Number, required: true},
  userId: { type: String, required: true },
});

module.exports = mongoose.model('Book', bookSchema);