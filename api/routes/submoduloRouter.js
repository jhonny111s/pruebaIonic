var express = require('express');
var bodyParser = require('body-parser');
var Submodulo = require('../models/submodulo');

var submoduloRouter = express.Router();
submoduloRouter.use(bodyParser.json());

submoduloRouter.route('/')
.get(function(req, res) {
      Submodulo.getAll(res);
    })
.post(function(req, res) {
      Submodulo.create(req.body, res);
    })
.put(function(req, res) {
      Submodulo.update(req.body, res);
    });

submoduloRouter.route('/:id')
.get(function(req, res) {
      Submodulo.get(req.params.id, res);
    })
.delete(function(req, res) {
       Submodulo.delete(req.params.id, res);
    });

module.exports = submoduloRouter;
