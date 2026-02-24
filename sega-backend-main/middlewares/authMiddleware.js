const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        res.status(401);
        throw new Error("Usuario no autorizado");
      }

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Token inválido");
    }
  } else {
    res.status(401);
    throw new Error("No hay token");
  }
};

module.exports = authMiddleware;
