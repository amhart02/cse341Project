const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDB('CSE341Project').collection('Recipes').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(lists);
    })
}

const getSingle = async (req, res) => {
    const recipeId = new ObjectId(req.params.id);
    const result = await mongodb.getDB('CSE341Project').collection('Recipes').find({_id: recipeId});
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    })
}

const createRecipe = async (req, res) => {
    const recipe = {
        name: req.body.name,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        prepTime: req.body.prepTime,
        cookTime: req.body.cookTime,
        difficulty: req.body.difficulty,
        tags: req.body.tags,
        imageURL: req.body.imageURL
    }
    const result = await mongodb.getDB('CSE341Project').collection('Recipes').insertOne(recipe);
    if (result.acknowledged) {
        res.status(201).json(result);
    } else {
        res.status(500).json('An error occured');
    }
}

const updateRecipe = async (req, res) => {
    const recipeId = new ObjectId(req.params.id);
    const recipe = {
        name: req.body.name,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        prepTime: req.body.prepTime,
        cookTime: req.body.cookTime,
        difficulty: req.body.difficulty,
        tags: req.body.tags,
        imageURL: req.body.imageURL
    }
    const result = await mongodb.getDB('CSE341Project').collection('Recipes').replaceOne({_id : recipeId}, recipe)
    if (result.modifiedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json('An error occurred')
    }
}

const deleteRecipe = async (req, res) => {
    const recipeId = new ObjectId(req.params.id)
    const result = await mongodb.getDB('CSE341Project').collection('Recipes').deleteOne({_id : recipeId});
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json('An error occurred')
    }
}

module.exports = { getAll, getSingle, createRecipe, updateRecipe, deleteRecipe };