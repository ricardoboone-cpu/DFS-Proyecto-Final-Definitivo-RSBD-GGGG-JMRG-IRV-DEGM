const router = require('express').Router();
const controller = require('../controllers/games.controller');

const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

// público
router.get('/', controller.getGames);

// solo admin (Dr. Eggman)
router.post('/', authMiddleware, adminMiddleware, controller.createGame);
router.put('/:id', authMiddleware, adminMiddleware, controller.updateGame);
router.delete('/:id', authMiddleware, adminMiddleware, controller.deleteGame);

// público: obtener un juego por ID
router.get('/:id', controller.getGameById);

module.exports = router;
