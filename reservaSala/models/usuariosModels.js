const mongoose = require('../bin/mongodb');
const bcrypt = require('bcrypt');

const usuariosSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        trim:true,
        },
    password: {
        type: String,
        trim:true
    },
    })

    usuariosSchema.pre('save',function(next){
        this.password = bcrypt.hashSync(this.password,3);
        next();
    })

module.exports = mongoose.model("usuarios", usuariosSchema);