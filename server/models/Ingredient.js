const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;