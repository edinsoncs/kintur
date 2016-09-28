var express = require('express');
var router = express.Router();

router.get('/v1/:id', function(req, res, next){

	var db = req.db;
	var kintur = db.get('kintur');

	kintur.find({}, function(err, data){
		res.json(data);
	});

});

router.get('/v2/:category', function(req, res, next){
	var db = req.db;
	var kintur = db.get('kintur');

	kintur.find({'categoria': req.params.category}, function(err, doc){
		if(err) throw err;

		res.json(doc);
	});

});

router.get('/v3/:id', function(req, res, next){
	var db = req.db;
	var kintur = db.get('kintur');

	kintur.find({'_id': req.params.id}, function(err, doc){
		if(err){
			return err;
		} else {
			res.json(doc);
		}
	});
});

module.exports = router;