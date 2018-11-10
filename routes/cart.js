var express = require('express');
var router = express.Router();
var dao = require('../common_dao');


router.get('/cnt/:action/:userId/:beerId/:cnt',cartCnt ); 
router.get('/:action/:userId/:beerId/',cartAction ); 
router.get('/:userId',getCart ); 

/**
 * 장바구니 정보 가져오기
 * @param {number} userId 유저 아이디
 * @param {object} {result:"장바구니 조회 성공", status:200, cart:cart}
 */
async function getCart(req, res, next) {
    let userId = req.params.userId;
    
    // 장바구니 현황 쿼리
    let sql_cart = `select user_id, beer_id, count from cart where user_id = ${userId}`
    let cart =  await dao.query(sql_cart);

    res.json({result:"장바구니 조회 성공", status:200, cart:cart});

}
/**
 * 장바구니에 아이탬 추가 / 삭제
 * @param {string} action 'add' / 'del'
 * @param {number} userId 유저 아이디
 * @param {number} beerId 맥주 아이디
 * @param {object} {result:"장바구니 추가 성공", status:200, cart:cart}
 */
async function cartAction(req, res, next) {
    let action = req.params.action;
    let beerId = req.params.beerId;
    let userId = req.params.userId;

    let sql_cartActionCheck = `select user_id, beer_id, count from cart where user_id = ${userId} and beer_id = ${beerId}`;
    let cartActionCheck = await dao.query(sql_cartActionCheck);
    let isExistBeer = cartActionCheck.length > 0 ? true : false;

    // 장바구니 액션 쿼리
    let sql_cartAction
    if(action == "add"){
        if(isExistBeer){
            res.json({result:"장바구니 실패", status:500});
            return false
        }
        sql_cartAction = `INSERT INTO cart  (user_id, beer_id, count) VALUES (${userId}, ${beerId}, 1);`
    }else if (action == "del"){
        if(!isExistBeer){
            res.json({result:"장바구니 실패", status:500});
            return false
        }
        sql_cartAction = `DELETE FROM cart where user_id = ${userId} and beer_id = ${beerId};`
    }else{
        return false; 
    }

    await dao.query(sql_cartAction);

    // 장바구니 현황 쿼리
    let sql_cart = `select user_id, beer_id, count from cart where user_id = ${userId}`
    let cart =  await dao.query(sql_cart);

    res.json({result:"장바구니 추가/삭제 성공", status:200, cart:cart});

}

/**
 * 장바구니 수량 변경
 * @param {string} action 카트 액션 'plus' or 'minus'  
 * @param {number} userId 상품 id 
 * @param {number} beerId 상품 id 
 * @param {number} cnt 장바구니에 담을 갯수
 * @return {object} // {result:"장바구니 추가 성공"}
 */
async function cartCnt(req, res, next) {
    let action = req.params.action
    let beerId = req.params.beerId;
    let userId = req.params.userId;
    let cnt = Number(req.params.cnt);
    
    // 1. 일단 DB에 있는 상품의 재고파악
    let sql_stock = `select stock from beers where id = ${beerId};`
    let nowStock = await dao.query(sql_stock);
    nowStock = Number(nowStock[0].stock);
    // 장바구니 담기 액션이고, 재고가 모자랄때
    if(action == 'plus' && nowStock < cnt){
        res.json({result:`재고가 모자랍니다.`, status:500});
        return false;
    }

    // 2. DB 재고 업데이트 - DB 업데이트 할 재고숫자
    let targetStock = action == 'plus' ? (nowStock - cnt) : (nowStock + cnt)  
        // parms(tag) 값에 따라 쿼리 설정
    let sql_removeStock = `
        update beers set stock = ${targetStock} where id = ${beerId}; 
    `;
        // 쿼리를 날린다
    await dao.query(sql_removeStock);

    // 3. 장바구니 업데이트 -  유저 장바구니 내역
    let sql_count = `select count from cart where user_id = ${userId} and beer_id = ${beerId};`
    let nowCount = await dao.query(sql_count);
    nowCount = Number(nowCount[0].count);
    let targetCnt = action == 'plus' ? (nowCount + cnt) : (nowCount - cnt)  

    let sql_nowCart = `
        update cart set count = ${targetCnt}  where user_id = ${userId} and beer_id = ${beerId}; 
    `;

    await dao.query(sql_nowCart);


    // 4.장바구니 현황 쿼리
    let sql_cart = `select user_id, beer_id, count from cart where user_id = ${userId}`
    let cart =  await dao.query(sql_cart);

    res.json({result:"수량변경 성공", status:200, cart:cart});
}

module.exports = router;