const router = require('express').Router();
const Ingredient = require('../models/Ingredient');

router.get('/', (req, res, next) => {
    Ingredient
        .find()
        .sort('name')
        .exec()
        .then(ingredients => {
            res.status(200).json(ingredients);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });

});

module.exports = router;