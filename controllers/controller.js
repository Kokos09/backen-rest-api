'use strict'

const Project= require('../models/project');
const fs=require('fs');

 let controller={
     home:function(req,res){
         return res.status(200).send({
             message:'Soy el Home'
         });
     },
     test:function(req,res){
        return res.status(200).send({
            message:'Soy el test'
        });
     },
     saveProject: function(req,res){
     const project = new Project();
     
      var params = req.body;
      project.name = params.name;
      project.description = params.description;
      project.category = params.category;
      project.year = params.year;
      project.langs = params.langs;
      project.image = null;

      project.save((err,projectStored)=>{
          if (err) {
              return res.status(500).send({message:'Error al guardar el documento.'});
          }if (!projectStored) {
              return res.status(404).send({message:'No se ha podido guardar el proyecto.'});
          }
          return res.status(200).send({project:projectStored});
      });
     },
     getProject:function(req,res){
      let projectId= req.params.id;

      if (projectId == null) {
        return res.status(404).send({message:'El proyecto no existe'});
       }

      Project.findById(projectId,(err,project)=>{
          if (err) {
              return res.status(500).send({message:'Error al devolver los datos'});
          }
          if (!project) {
              return res.status(404).send({message:'El proyecto no existe'});
          }
          return res.status(200).send({
             project
          });
      });
     },
     getProjects: function (req,res) {
         Project.find({}).sort('+year').exec((err,project)=>{
              if (err) {
                  return res.status(500).send({message:'Error al devolver los datos'});
              }
              if (!project) {
                  return res.status(404).send({message:'Nohay proyecto que mostrar'});
              }
              return res.status(200).send({project});
         });
     },

     updateProject: function(req,res) {
         let projectId=req.params.id;
         let update= req.body;

         Project.findByIdAndUpdate(projectId,update,(err,projectUpdate)=>{
             if (err) {
                 return res.status(500).send({message:'Error al actualizar'});
             }if (!projectUpdate) {
                 return res.status(404).send({message:'No existe el Proyecto para actualizar'});
             }
             return res.status(200).send({project:projectUpdate});
         });

     },

     deleteProject:function (req,res) {
         let projectId =req.params.id;
         Project.findByIdAndRemove(projectId,(err,projectRemove)=>{
              if (err) {
                  return res.status(500).send({message:'No se puede borrar el proyecto'});
              }if (!projectRemove) {
                  return res.status(404).send({message:'No se pude eliminar ese proyecto'});
              }
              return res.status(200).send({project:projectRemove});
         });
     },

     uploadImage:function (req,res) {
         let projectId=req.params.id;
         let file_params='Imagen no subida';
         
         if (req.files) {
             let filePath= req.files.image.path;
            let fileSplit= filePath.split('\\');
            let fileName =fileSplit[1];
            let extsplit=fileName.split('\.');
            let fileExt= extsplit[1];
            
			if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){

				Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true}, (err, projectUpdated) => {
					if(err) return res.status(500).send({message: 'La imagen no se ha subido'});

					if(!projectUpdated) return res.status(404).send({message: 'El proyecto no existe y no se ha asignado la imagen'});

					return res.status(200).send({
						project: projectUpdated
					});
				});

			}else{
				fs.unlink(filePath, (err) => {
					return res.status(200).send({message: 'La extensión no es válida'});
				});
			}
        }
            else{
                return res.status(200).send({
                    message:file_params
   
                });
            }


     }
 };

 module.exports=controller;