var express = require('express');
var router = express.Router();
var dao = require('../common_dao');


router.get('/', function(req, res, next){
    let data = {test:'test'}
    res.json(data)
})

module.exports = router;
