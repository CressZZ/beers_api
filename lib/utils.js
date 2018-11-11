const common = {
    /**
     * @param {array} 맥주리스트 객체
     * tags에 대한 값으로 들어온 String 타입을 
     * 과제 조건에 맞게 Array로 변경
     */
    preProcessBeers(beers){
        let _beers = beers.map((beer)=>{
            beer.tags = beer.tags.split(',')
            beer.tags.sort();
            return beer
        })
        return _beers;
    }

}

module.exports = common;