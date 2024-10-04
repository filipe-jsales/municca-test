let users = [];

const createUser = (req, res) => {
    const { name, email } = req.body;
    const id = users.length + 1;
    const newUser = { id, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
};

const getUsers = (req, res) => {
    res.json(users);
};

const getUserById = (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id === parseInt(id));
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
    }
};

const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const userIndex = users.findIndex(u => u.id === parseInt(id));
    if (userIndex !== -1) {
        users[userIndex] = { id: parseInt(id), name, email };
        res.json(users[userIndex]);
    } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
    }
};

const deleteUser = (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex(u => u.id === parseInt(id));
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
    }
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
