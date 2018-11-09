var express = require('express');
var router = express.Router();
var dao = require('../common_dao');

router.get('/list/:tag', getBeers); 

/**
 * params로 전달된 tag에 따라 맥주 리스트를 불러온다. 
 * 목록은 일치하는 태그가 많은 순으로 정렬함
 * @param {string} req.params.tag // ex) 'A_BG_C_BK'
 */
async function getBeers(req, res, next) {
    let tagsS = req.params.tag; 
    tagsS = tagsS.replace(/_/g, ','); 

    var sql = `
        select 
            B.*, GROUP_CONCAT(TLB.tags_key) as tags, count(TLB.tags_key) as cnt 
        from 
            beers B join tags_link_beers TLB on B.id = TLB.beers_id 
        where 
            TLB.tags_key in (${tagsS}) 
        group by 
            B.id 
        order by 
            cnt DESC;
    `;
    var result = await dao.query(sql);
    
    res.json(result);
}

module.exports = router;