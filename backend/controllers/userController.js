const userService = require('../services/userService');

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    let defaultPassword = password === undefined ? 'senhagenerica123' : password;
    
    try {
        const newUser = await userService.createUser(name, email, defaultPassword);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar usuário', error });
    }
};

const getUsers = (req, res) => {
    const users = userService.getUsers();
    res.json(users);
};

const getUserById = (req, res) => {
    const { id } = req.params;
    const user = userService.getUserById(id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
    }
};

const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const updatedUser = userService.updateUser(id, name, email);
    if (updatedUser) {
        res.json(updatedUser);
    } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
    }
};

const deleteUser = (req, res) => {
    const { id } = req.params;
    const success = userService.deleteUser(id);
    if (success) {
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
    }
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
};
