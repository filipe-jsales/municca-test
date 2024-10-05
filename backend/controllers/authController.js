const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userService = require('../services/userService'); // Certifique-se de ajustar o caminho corretamente

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = userService.getUserByEmail(email);
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

  res.json({ token, email: user.email, userId: user.id });
};

module.exports = { login };
