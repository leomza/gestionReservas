const mongoose = require('../bin/mongodb');
const errorMessage = require('../util/errorMessage')

const salasSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true,errorMessage.GENERAL.campo_obligatorio],
        unique: true,
        message: errorMessage.GENERAL.repeticion
        },
    descripcion: {
            type: String,
        },   
});

module.exports = mongoose.model("salas",salasSchema);