var express = require('express');
var router = express.Router();
var dao = require('../common_dao');


router.get('/list/:tag?', getBeers); 
router.get('/cart_action/:action/:id/:cnt',cartAction ); 

/**
 * 장바구니에 담거나 뺄때
 * @param {string} action // 'add' | 'del'  
 * @param {number} id 상품 id 
 * @param {number} cnt 장바구니에 담을 갯수
 * @return {object} // {result:"장바구니 추가 성공"}
 */
async function cartAction(req, res, next) {
    let action = req.params.action
    let beerId = req.params.id;
    let cnt = Number(req.params.cnt);
    
    // 일단 DB에 있는 상품의 재고파악
    let sql_stock = `select stock from beers where id = ${beerId};`
    let nowStock = await dao.query(sql_stock);
    nowStock = Number(nowStock[0].stock);

    // 장바구니 담기 액션이고, 재고가 모자랄때
    if(action == 'add' && nowStock < cnt){
        return false;
    }

    // DB 업데이트 할 재고숫자
    let targetStock = action == 'add' ? (nowStock - cnt) : (nowStock + cnt) 

    // parms(tag) 값에 따라 쿼리 설정
    let sql_removeStock = `
        update beers set stock = ${targetStock} where id = ${beerId};
    `;

    // 쿼리를 날린다
    await dao.query(sql_removeStock);

    res.json({result:"재고 수정 성공", status:200});
}

/**
 * params로 전달된 tag에 따라 맥주 리스트를 불러온다. 
 * 목록은 일치하는 태그가 많은 순으로 정렬함
 * @param {string} tag // ex) 'A_BG_C_BK'
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