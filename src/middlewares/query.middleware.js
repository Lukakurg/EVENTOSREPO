// Igual que payload.middleware, pero valida los parametros de la URL (req.query)
// en lugar del body. Si algo no es valido responde 400 y no llega al controlador.
const queryMiddleware = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.query);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
    }
};

module.exports = queryMiddleware;
