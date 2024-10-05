const bcrypt = require('bcrypt');

let users = [
    {
      id: 1,
      name: 'Admin',
      email: 'admin4@example.com',
      password: '$2b$10$Q9gIWpTcdZ3cO8htG9C4q.fnvN3rQJx.bFwsEzMgLqBOnYwZ6QBXm', //senha: 123456 
      createdAt: new Date(),
      deletedAt: null,
    },
  ];
  

const createUser = async (name, email, password) => {
    const id = users.length + 1;
    const createdAt = new Date();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id, name, email, password: hashedPassword, createdAt, deletedAt: null };
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
    return users.filter(u => !u.deletedAt);
};

const getUserByEmail = (email) => {
    return users.find(u => u.email === email);
}


module.exports = {
    createUser,
    getUsers,
    getUserByEmail,
    getUserById,
    updateUser,
    deleteUser,
};