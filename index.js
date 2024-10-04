const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

const middlewares = require('./configs/middlewares');
const routes = require('./configs/router');

app.use(middlewares);

app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('API Básica com Node.js e Prisma');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
