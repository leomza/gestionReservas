const salasModels = require('../models/salasModels');

module.exports = {
    crearSala : async (req,res,next) =>{
        try{
        const sala = new salasModels({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion
               })
        const documento = await sala.save();
        res.json(documento); 
    } catch (mal) {
        console.log(mal)
        //Al next le paso "mal" que es la excepcion como parametro, eso lo recibe app.js en Error Handler predefinido como "err"
        next(mal);
    }
    },

    mostrarTodasSalas : async (req,res,next) =>{
        const sala = await salasModels.find();
        res.json(sala);
    },

    mostrarSalaPorId : async (req,res,next) =>{
        const sala = await salasModels.findById(req.params.id);
        res.json(sala);
    },
    
    eliminarSala: async (req, res, next) =>{
        try {
            console.log(req.params.id);
            const sala = await salasModels.findByIdAndDelete({ _id: req.params.id });
            console.log (sala)
            res.status(200).json(sala);
            return;
        } catch (e){
            next(e);
        }
    }
}