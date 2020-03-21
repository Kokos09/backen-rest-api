'use strict'

const mongoose= require('mongoose');

const schema= mongoose.Schema;

var projectSchema = schema({
        name:String,
        description:String,
        category:String,
        year:Number,
        langs:String,
        image:String
});

module.exports=mongoose.model('Project',projectSchema);
//Project --> guarda los documentos en la coleccion