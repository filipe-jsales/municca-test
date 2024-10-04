const { Router } = require('express');
const userRoutes = require('../routes/userRoutes');
const documentRoutes = require('../routes/documentRoutes');
const authenticationRoutes = require('../routes/authenticationRoutes');

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/documents', documentRoutes);
routes.use('/auth', authenticationRoutes);

module.exports = routes;