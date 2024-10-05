const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });
    
    return newUser;
};


const getUserById = async (id) => {
    const user = await prisma.user.findUnique({
        where: { id: parseInt(id) }
    });
    return user;
};


const deleteUser = async (id) => {
    const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { deletedAt: new Date() }
    });
    return updatedUser ? true : false;
};

const getUsers = async () => {
    const users = await prisma.user.findMany({
        where: {
            deletedAt: null
        }
    });
    return users;
};


const getUserByEmail = async (email) => {
    const user = await prisma.user.findUnique({
        where: { email }
    });
    return user;
};

const updateUser = async (id, name, email) => {
    const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { name, email }
    });
    return updatedUser;
};




module.exports = {
    createUser,
    getUsers,
    getUserByEmail,
    getUserById,
    updateUser,
    deleteUser,
};