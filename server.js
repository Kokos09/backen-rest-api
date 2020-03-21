'user strict'
const express= require('express');
const bodyParse= require('body-parser');

var app= express();

//archivos de rutas


let porject_routers= require('./routes/project');
//middleware
app.use(bodyParse.urlencoded({extended:false}));
app.use(bodyParse.json());

//Cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas
app.use('/api',porject_routers);


//export 
module.exports=app;