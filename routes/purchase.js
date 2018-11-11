var express = require('express');
var router = express.Router();
var dao = require('../common_dao');
var common = require('../lib/utils');

router.post('/', purchase);

/**
 *  구매 API 
 *  data{
 *      {object} beer, 
 *      {number} userId, 
 *      {number} cnt, 
 *      {number{ totalPrice
 *  }
 */
async function purchase(req, res, next) {
    let regdt = common.getDate();
    let ordno = `${common.getUnixTimestamp()}`
    let purchaseBeerbeers = req.body.purchaseBeer;
    let user_id = req.body.user_id;
    let cnt = req.body.cnt; // 구매한 종류
    let totalPrice = req.body.totalPrice

    // 1. purchase 테이블
    let sql_purchase = `INSERT INTO purchase  (order_no, user_id, regdt, total, cnt) VALUES (${ordno}, ${user_id}, '${regdt}', ${totalPrice}, ${cnt});`
    await dao.query(sql_purchase);
    
    // 2. purchase_link_beers 테이블
    purchaseBeerbeers.forEach(async function(beer){
        var sql_purchase = `INSERT INTO purchase_link_beers  (order_no, beer_id, count) VALUES (${ordno}, ${beer.id}, ${beer.count})`;
        await dao.query(sql_purchase);
    })
    
    res.json({result:'구매 성공', status:200, totalCount:cnt, totalPrice:totalPrice});
}

module.exports = router;