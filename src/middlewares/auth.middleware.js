const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized - Invalid token provided" });
    }
    try {
        const verified = jwt.verify(token, process.env.AUTH_SECRET_KEY);
        req.user = verified; 
        next();
    } catch (error) {
        res.status(403).json({ message: "Token inválido" });
    }
};

module.exports = authMiddleware;