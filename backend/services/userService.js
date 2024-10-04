let users = [];

const createUser = (name, email) => {
    const id = users.length + 1;
    const newUser = { id, name, email };
    users.push(newUser);
    return newUser;
};


const getUserById = (id) => {
    return users.find(u => u.id === parseInt(id));
};

const updateUser = (id, name, email) => {
    const userIndex = users.findIndex(u => u.id === parseInt(id));
    if (userIndex !== -1) {
        users[userIndex] = { id: parseInt(id), name, email };
        return users[userIndex];
    } else {
        return null;
    }
};

const deleteUser = (id) => {
    const userIndex = users.findIndex(u => u.id === parseInt(id));
    if (userIndex !== -1) {
        users[userIndex].deletedAt = new Date();
        return true;
    } else {
        return false;
    }
};

const getUsers = () => {
    return users;
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
};