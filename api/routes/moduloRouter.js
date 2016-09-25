var express = require('express');
var bodyParser = require('body-parser');
var Modulo = require('../models/modulo');

var moduloRouter = express.Router();
moduloRouter.use(bodyParser.json());

moduloRouter.route('/')
.get(function(req, res) {
      Modulo.getAll(res);
    })
.post(function(req, res) {
      Modulo.create(req.body, res);
    })
.put(function(req, res) {
      Modulo.update(req.body, res);
    });

moduloRouter.route('/:id')
.get(function(req, res) {
      Modulo.get(req.params.id, res);
    })
.delete(function(req, res) {
       Modulo.delete(req.params.id, res);
    });

module.exports = moduloRouter;