module.exports = function identificator(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        req.user = { id: 1, name: 'Usuário Exemplo' };
    }

    next();
};
