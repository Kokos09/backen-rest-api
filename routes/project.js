'use strict'

const express= require('express');
const projectController= require('../controllers/controller');

let router = express.Router();
const multipart= require('connect-multiparty');
var multipartMiddleware=multipart({uploadDir:'./upload'});


router.get('/home',projectController.home);
router.post('/test',projectController.test);
router.post('/save-project',projectController.saveProject);
router.get('/project/:id?',projectController.getProject);
router.get('/projects',projectController.getProjects);
router.put('/project/:id',projectController.updateProject);
router.delete('/project/:id',projectController.deleteProject);
router.post('/upload-images/:id',multipartMiddleware,projectController.uploadImage);
module.exports= router;