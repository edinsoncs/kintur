var express = require('express');
var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var bodyParser = require('body-parser');
var shortid = require('shortid');

var fs = require('fs');
var path = require('path');

router.post('/', multipartMiddleware, function(req, res, next) {

    var db = req.db;
    var kintur = db.get('kintur');

    var nameCategory = req.body.save;

    fs.readFile(req.files.logo.path, function(err, buffer) {
        if (err) throw err;
        var nameimg = shortid.generate() + req.files.logo.name;
        var directory = path.join(__dirname, '..', 'public', 'uploads/' + nameimg);
        
        console.log(nameimg);

        fs.writeFile(directory, buffer, function(err) {
            if (err) throw err;

            kintur.insert({
                'nombre': req.body.titulo,
                'categoria': req.body.categoria,
                'img': nameimg,
                'telefono': req.body.telefono,
                'description': req.body.description
            }, function(err, doc) {
            	res.redirect('kinturadmin');
            });

        });

    });
});

router.post('/peru', multipartMiddleware, function(req, res, next) {

    var db = req.db;
    var peru = db.get('peru');

    var nameCategory = req.body.save;

    fs.readFile(req.files.logo.path, function(err, buffer) {
        if (err) throw err;
        var nameimg = shortid.generate() + req.files.logo.name;
        var directory = path.join(__dirname, '..', 'public', 'uploads/' + nameimg);
        
        console.log(nameimg);

        fs.writeFile(directory, buffer, function(err) {
            if (err) throw err;

            peru.insert({
                'nombre': req.body.titulo,
                'categoria': req.body.categoria,
                'img': nameimg,
                'telefono': req.body.telefono,
                'description': req.body.description,
                'web': req.body.web,
                'direccion': req.body.dire,
                'facebook': req.body.facebook
            }, function(err, doc) {
                res.redirect('../admin');
            });

        });

    });
});


module.exports = router;
