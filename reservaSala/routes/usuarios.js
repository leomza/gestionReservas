var express = require('express');
var router = express.Router();
var usuariosController = require('../controllers/usuariosControllers');

/* GET users listing. */
router.get('/', usuariosController.mostrarTodosUsuarios);
router.post('/registro', usuariosController.crearUsuario);
router.post('/', usuariosController.validate);
router.get('/:id', usuariosController.mostrarPorIdUsuarios);
router.delete('/:id', usuariosController.eliminarUsuario);

module.exports = router;
