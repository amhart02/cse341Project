const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

const userController = require('../controllers/user')

router.get('/', userController.getAll);
router.get('/:id', userController.getSingle);
router.post('/', requiresAuth(), userController.createUser);
router.put('/:id', requiresAuth(), userController.updateUser);
router.delete('/:id', requiresAuth(), userController.deleteUser);

module.exports = router;
