var express = require('express');
var router = express.Router();
var dao = require('../common_dao');

router.get('/tagsLinkBeer', tagsLinkBeer);

/**
 * 초기 더미 디비를 만들기 위한 helper 
 * tags_link_beers
 * 
 * 만약 관리자 페이지가 있고, 실제로 넣은다고 했을때 100% 셀렉트 박스로 테그를 넣을 테니 중복 될리 없다.
 */
async function tagsLinkBeer(req, res, next) {
    var sql =`INSERT INTO tags_link_beers (beers_id, tags_key) VALUES `;
    var tags = ["L", "A", "R", "IP", "DO", "G", "B", "BG", "SM","BK"]
    var tagIndex = [];
    var tempIndex;
    for(let i =1; i<27; i++){
        
        for(let i=0; i<5; i++){
            tempIndex = (Math.floor(Math.random()* 10) );
            tagIndex.indexOf(tempIndex) == -1 ? tagIndex.push(tempIndex) : ''
        }
       
        tagIndex.forEach((idx)=>{
            sql += `
                (${i},"${tags[idx]}"),
             `;
        })

        tagIndex = [];

    }

    sql += `(26, "L");`
    // await dao.query(sql); // 또 실행되면 안되니 주석 처리.
    
    res.json('done');
}

module.exports = router;