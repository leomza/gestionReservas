const usuariosModels = require('../models/usuariosModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    crearUsuario : async (req,res,next) =>{
        try{
        const usuario = new usuariosModels({
            username: req.body.username,
            password: req.body.password,
            })
        const documento = await usuario.save(); 
        res.json(documento);
        } catch (mal){
        console.log(mal);
        next(mal);
    }
    },

    mostrarTodosUsuarios : async (req,res,next) =>{
        const usuario = await usuariosModels.find({});
        res.json(usuario);
    },

    mostrarPorIdUsuarios : async (req,res,next) =>{
        const user = await usuariosModels.findById(req.params.id);
        res.json(user);
    }, 

    //El siguiente metodo validara que el username y la contraseña introducidos por el usuario sean los correctos
    validate: async (req, res, next) => {
        const usuario = await usuariosModels.findOne({ username: req.body.username });
        if (usuario) {
            if (bcrypt.compareSync(req.body.password, usuario.password)) {
                //Si esta todo bien, genero el token
                const token = jwt.sign({ userId: usuario.username }, req.app.get('claveSecreta'), { expiresIn: "24h" });
                res.json({ message: "Usuario y contraseña correctos", token: token });
            } else {
                res.json({ message: "Contraseña incorrecta" });
            }
        } else {
            res.json({ message: "Usuario incorrecto" })
        }
    },

    eliminarUsuario: async (req, res, next) =>{
        try {
            console.log(req.params.id);
            const usuario = await usuariosModels.findByIdAndDelete({ _id: req.params.id });
            console.log (usuario)
            return;
        } catch (e){
            next(e);
        }
    }
}