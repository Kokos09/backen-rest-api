'use strict'
const mongoose= require('mongoose');
const app=require('./server');
const port = 3700;



mongoose.set('useFindAndModify', false);
mongoose.Promise= global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio',{ useNewUrlParser:true, useUnifiedTopology: true }
)
.then(()=>{
    console.log("Conexion a la base de datos establecida con exito.");
    //Create server
    app.listen(port,()=>{
        console.log("Servidor corriendo correctamente en la url:3700");
    });

})
.catch(err => console.log(err));