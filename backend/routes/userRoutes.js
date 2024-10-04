const { Router } = require('express');
const {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/userController');

const userRoutes = Router();

userRoutes.post('/', createUser);
userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUserById);
userRoutes.put('/:id', updateUser);
userRoutes.delete('/:id', deleteUser);

module.exports = userRoutes;
