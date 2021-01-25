var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/reservaSalas',{useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true},function(error){
    if(error){
        throw error;
    } else {
        console.log('Conexion a base de datos exitosa');
    }
});

module.exports=mongoose;