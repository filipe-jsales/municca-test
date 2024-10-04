const verifyPermission = (options) => {
    return (req, res, next) => {
        const { isLogged, methodAllowed } = options;

        if (isLogged && !req.user) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }

        if (!methodAllowed.includes(req.method)) {
            return res.status(403).json({ message: 'Método não permitido' });
        }

        next();
    };
};

module.exports = verifyPermission;
