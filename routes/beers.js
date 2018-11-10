var express = require('express');
var router = express.Router();
var dao = require('../common_dao');


router.get('/list/:tag?', getBeers); 

/**
 * params로 전달된 tag에 따라 맥주 리스트를 불러온다. 
 * 목록은 일치하는 태그가 많은 순으로 정렬함
 * @param {string} req.params.tag // ex) 'A_BG_C_BK'
 * @return {array-json} 맥주리스트 객체
 */
async function getBeers(req, res, next) {
    let tagsS = req.params.tag ?  req.params.tag : ''; 
    tagsS = tagsS.replace(/_/g, '\",\"'); 

    // parms(tag) 값에 따라 쿼리 설정
    let sql = `
        select 
            B.id, B.name, B.image, B.price, B.stock,
            GROUP_CONCAT(T.name) as tags 
        from 
            beers B 
            join tags_link_beers TLB on B.id = TLB.beers_id
            join tags T on TLB.tags_key = T.key
        where 
            TLB.tags_key in (\"${tagsS}\") 
        group by 
            B.id 
        order by 
            count(TLB.tags_key) DESC;
    `;

    // 쿼리를 날린다
    let beers = await dao.query(sql);

    // DB에서 받아온 맥주리스트 전처리
    beers = preProcessBeers(beers);

    res.json(beers);
}

/**
 * @param {array} 맥주리스트 객체
 * tags에 대한 값으로 들어온 String 타입을 
 * 과제 조건에 맞게 Array로 변경
 */
function preProcessBeers(beers){
    let _beers = beers.map((beer)=>{
        beer.tags = beer.tags.split(',')
        return beer
    })
    return _beers;
}


module.exports = router;