var express = require('express');
var router = express.Router();
var dao = require('../common_dao');

router.get('/list', getTags);

/**
 * @return {array-json} 태그리스트
 */
async function getTags(req, res, next) {
    let sql = `
        select 
            T.key, T.name 
        from 
            tags T;
    `;
    // 쿼리를 날린다
    let tags = await dao.query(sql);

    res.json(tags);
}

module.exports = router;