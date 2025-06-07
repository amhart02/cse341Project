const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const isValidObject = (id) => ObjectId.isValid(id) && String(new ObjectId(id)) === id;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDB('CSE341Project').collection('Users').find();
        const users = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    }
    catch {
        res.status(500).json({ message: 'Failed to get users', error: err.message});
    }
}

const getSingle = async (req, res) => {
    const id = req.params.id;
    if (!isValidObject(id)) {
        return res.status(400).json({message: 'Invalid user ID'});
    }
    try{
        const userId = new ObjectId(id);
        const user = await mongodb.getDB('CSE341Project').collection('Users').findOne({_id: userId});
        if (!user) {
            return res.status(404).json({ message: 'User not found'});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(recipe);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user', error: err.message})
    }
}

const createUser = async (req, res) => {
    const requiredFields = ['name', 'email'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
        return res.status(400).json({ message: `Missing required fields: ${missingFields.join(',')}`});
    }
    const user = {
        name: req.body.name,
        email: req.body.email
    }
    try {
        const result = await mongodb.getDB('CSE341Project').collection('Users').insertOne(user);
        if (result.acknowledged) {
        res.status(201).json(result);
        }
        else {
            throw new error ('Insert not acknowledged');
        }
    } catch (err) {
        res.status(500).json({ message: 'Error creating user', error: err.message} );
    }
}

const updateUser = async (req, res) => {
    const id = req.params.id;
    if (!isValidObject(id)) {
        return res.status(400).json({message: 'Invalid user ID'});
    }
    const user = {
        name: req.body.name,
        email: req.body.email
    }
    try {
        const userId = new ObjectId(id)
        const result = await mongodb.getDB('CSE341Project').collection('Users').replaceOne({_id : userId}, user)
        if (result.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json('An error occurred')
        }
    } catch (err) {
        res.status(500).json({ message: 'Error updating user', error: err.message});
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    if (!isValidObject(id)) {
        return res.status(400).json({message: 'Invalid user ID'});
    }
    try {
        const userId = new ObjectId(id);
        const result = await mongodb.getDB('CSE341Project').collection('Users').deleteOne({_id : userId});
        if (result.deletedCount > 0) {
        res.status(200).send();
        } else {
            res.status(500).json('An error occurred')
        }
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user', error: err.message });
    }
}

module.exports = [getAll, getSingle, createUser, updateUser, deleteUser ]