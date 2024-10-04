const { Router } = require('express');
const userRoutes = require('../routes/userRoutes');
const documentRoutes = require('../routes/documentRoutes');
const verifyPermission = require('../middlewares/verifyPermission');

const routes = Router();
console.log('bateu em routes');

const ownerRouter = Router();
ownerRouter.all('*', verifyPermission({
  isLogged: true,
  methodAllowed: ['POST', 'PUT', 'PATCH', 'DELETE', 'HEAD'],
}));

routes.use('/users', userRoutes);
routes.use('/documents', documentRoutes);

routes.use('/owner', ownerRouter);

module.exports = routes;
