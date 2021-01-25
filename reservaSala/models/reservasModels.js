const mongoose = require('../bin/mongodb');
const errorMessage = require('../util/errorMessage')

const personaSchema = new mongoose.Schema(
    {nombre: { type: String },
    dni: { type: String },
    email: { type: String },
    telefono: { type: String }
    })

const reservasSchema = new mongoose.Schema({
    persona: personaSchema,    
    descripcion: {
            type: String,
            enum: ["Negocio", "Social","Presentación producto","Videoconferencia", "Otro"]
        },
    turno: {
            type: String,
            //Las salas se alquilan por dia completo o por medio dia
            enum: ["Turno mañana", "Turno tarde", "Dia completo"] 
        },
    //Fecha en la que sera la reunión
    fechaReunion: {
        type: Date,
    },
    fecha: {
        type: Date
    },
    sala: {
            type: mongoose.Schema.ObjectId,
            ref: "salas"
        },
    
    });

module.exports = mongoose.model("reservas",reservasSchema);