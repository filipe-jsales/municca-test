const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API Básica com Node.js e Prisma');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
