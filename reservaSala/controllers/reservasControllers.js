const reservasModels = require('../models/reservasModels');

module.exports = {
    crearReserva : async (req,res,next) =>{
        try{
        const reserva = new reservasModels({
            descripcion: req.body.descripcion,
            turno: req.body.turno,
            fecha: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            fechaReunion: new Date(req.body.fechaReunion).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            sala: req.body.sala,
            persona: req.body.persona
        });
        console.log(req.body.persona)
        const documento = await reserva.save(); 
        res.json(documento);
    } catch(mal) {
        console.log(mal);
        next(mal);
    }
    },
   
    mostrarTodasReservas : async (req,res,next) =>{
        const reserva = await reservasModels.find().populate("sala");
        res.json(reserva);
    },
    
    mostrarReservaId : async (req,res,next) =>{
        const reserva = await reservasModels.findById(req.params.id).populate("sala");
        res.json(reserva);
    },
   
    eliminarReserva: async (req, res, next) =>{
        try {
            console.log(req.params.id);
            const reserva = await reservasModels.findByIdAndDelete({ _id: req.params.id });
            console.log (reserva)
            res.status(200).json(reserva);
            return;
        } catch (e){
            next(e);
        }
    }
}