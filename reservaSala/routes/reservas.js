var express = require('express');
var router = express.Router();
var reservasController = require('../controllers/reservasControllers');
var validar = require('../app');

/* GET users listing. */
router.get('/', reservasController.mostrarTodasReservas);
router.post('/', reservasController.crearReserva);
router.get('/:id', reservasController.mostrarReservaId);
router.delete('/:id', reservasController.eliminarReserva);

module.exports = router;
