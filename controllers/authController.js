const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

let users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '$2b$10$Q9gIWpTcdZ3cO8htG9C4q.fnvN3rQJx.bFwsEzMgLqBOnYwZ6QBXm', //senha: 123456 
  },
];

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }
  const token = jwt.sign(
    { userId: user.id, name: user.name }, 
    'SECRET_KEY',
    { expiresIn: '1h' }
  );

  res.json({ token });
};

module.exports = { login };
