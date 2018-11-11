Date.prototype.yyyymmdd = function () {
	var mm = this.getMonth() + 1; // getMonth() is zero-based
	var dd = this.getDate();

	return [this.getFullYear(), (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd].join('-');
};

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
    },
    getDate: function () {  
		return new Date().yyyymmdd();
    },
    getUnixTimestamp: function () {
		return Math.round(new Date().getTime() / 1000.0);
	},

}

module.exports = common;