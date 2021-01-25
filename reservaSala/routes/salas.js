var express = require('express');
var router = express.Router();
var salasController = require('../controllers/salasControllers');

/* GET users listing. */
router.get('/', salasController.mostrarTodasSalas);
router.post('/', salasController.crearSala);
router.get('/:id', salasController.mostrarSalaPorId);
router.delete('/:id', salasController.eliminarSala);

module.exports = router;
