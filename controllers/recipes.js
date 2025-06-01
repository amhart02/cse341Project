const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const isValidObject = (id) => ObjectId.isValid(id) && String(new ObjectId(id)) === id;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDB('CSE341Project').collection('Recipes').find();
        const recipes = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(recipes);
    }
    catch {
        res.status(500).json({ message: 'Failed to get recipes', error: err.message});
    }
}

const getSingle = async (req, res) => {
    const id = req.params.id;
        console.log('Incoming ID:', id, 'Valid:', isValidObject(id)); // 👈 Add this
    if (!isValidObject(id)) {
        return res.status(400).json({message: 'Invalid recipe ID'});
    }
    try{
        const recipeId = new ObjectId(id);
        const recipe = await mongodb.getDB('CSE341Project').collection('Recipes').findOne({_id: recipeId});
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found'});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(recipe);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching recipe', error: err.message})
    }
}

const createRecipe = async (req, res) => {
    const requiredFields = ['name', 'ingredients', 'steps', 'prepTime', 'cookTime', 'difficulty', 'tags', 'imageURL'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
        return res.status(400).json({ message: `Missing required fields: ${missingFields.join(',')}`});
    }
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
    try {
        const result = await mongodb.getDB('CSE341Project').collection('Recipes').insertOne(recipe);
        if (result.acknowledged) {
        res.status(201).json(result);
        }
        else {
            throw new error ('Insert not acknowledged');
        }
    } catch (err) {
        res.status(500).json({ message: 'Error creating recipe', error: err.message} );
    }
}

const updateRecipe = async (req, res) => {
    const recipeId = new ObjectId(req.params.id);
    if (!isValidObject(recipeId)) {
        return res.status(400).json({message: 'Invalid recipe ID'});
    }
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
    try {
        const result = await mongodb.getDB('CSE341Project').collection('Recipes').replaceOne({_id : recipeId}, recipe)
        if (result.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json('An error occurred')
        }
    } catch (err) {
        res.status(500).json({ message: 'Error updating recipe', error: err.message});
    }
    
}

const deleteRecipe = async (req, res) => {
    const id = req.params.id;
    if (!isValidObject(id)) {
        return res.status(400).json({message: 'Invalid recipe ID'});
    }
    try {
        const recipeId = new ObjectId(id);
        const result = await mongodb.getDB('CSE341Project').collection('Recipes').deleteOne({_id : recipeId});
        if (result.deletedCount > 0) {
        res.status(200).send();
        } else {
            res.status(500).json('An error occurred')
        }
    } catch (err) {
        res.status(500).json({ message: 'Error deleting recipe', error: err.message });
    }
}

module.exports = { getAll, getSingle, createRecipe, updateRecipe, deleteRecipe };