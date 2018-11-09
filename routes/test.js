var express = require('express');
var router = express.Router();
var dao = require('../common_dao');

router.get('/', test);

async function test(req, res, next) {
    var sql =`INSERT INTO tags_link_beers (beers_id, tags_key) VALUES `;
    var tags = ["L", "A", "R", "IP", "DO", "G", "B", "BG", "SM","BK"]
    for(var i =1; i<27; i++){
        tags.forEach((e)=>{
            sql += `
                (${i},"${e}"),
             `;
        })
    }
    sql += `(26, "TEMP");`
    await dao.query(sql);
    
    res.json('done');
}

module.exports = router;