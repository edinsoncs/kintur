var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
	res.render('peru', {
		title: 'Publicar'
	});
});

module.exports = router;