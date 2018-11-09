var express = require('express');
var router = express.Router();
var dao = require('../common_dao');

router.get('/', test);

async function test(req, res, next) {
    var sql = `
        select * from beers;
    `;
    var result = await dao.query(sql);
    
    res.json(result);
}

module.exports = router;