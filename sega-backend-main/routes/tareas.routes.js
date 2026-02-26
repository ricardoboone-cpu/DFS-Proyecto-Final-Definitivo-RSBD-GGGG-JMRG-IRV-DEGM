const express = require("express");
const router = express.Router();
const tareas = require("../controllers/tareas.controller");
const authMiddleware = require("../middlewares/authMiddleware");

// Middleware inline para solo admin
const onlyAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ msg: "Solo admin puede asignar tareas" });
  next();
};

// Rutas de tareas
// GET: todos para admin, solo asignadas para usuario normal
router.get("/tareas", authMiddleware, tareas.getTareas);

// POST: crear tarea, solo admin puede asignar
router.post("/tareas", authMiddleware, onlyAdmin, tareas.createTarea);

// PUT: actualizar tarea (podrías dejar solo admin o permitir que usuario actualice su tarea)
router.put("/tareas/:id", authMiddleware, tareas.updateTarea);

// DELETE: eliminar tarea (opcional: solo admin)
router.delete("/tareas/:id", authMiddleware, tareas.deleteTarea);

module.exports = router;
