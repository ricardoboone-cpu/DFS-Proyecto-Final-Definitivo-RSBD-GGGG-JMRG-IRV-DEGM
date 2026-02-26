const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403);
    throw new Error("Acceso solo para administradores");
  }
};

module.exports = adminMiddleware;
