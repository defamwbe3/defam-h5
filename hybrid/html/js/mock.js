// K线数据
// var rawData = [
// 	            ["2022-04-07 15:00", 0.05, 0.06, 0.07, 0.07, 19146],
// 	            ["2022-04-07 15:05", 0.06, 0.03, 0.02, 0.05, 22549],
// 	            ["2022-04-07 15:10", 0.07, 0.04, 0.09, 0.09, 23777],
// 	            ["2022-04-07 15:15", 0.05, 0.09, 0.02, 0.08, 22325],
// 	            ["2022-04-07 15:20", 0.05, 0.08, 0.05, 0.03, 19796],
// 	            ["2022-04-07 15:25", 0.08, 0.08, 0.09, 0.05, 19731],
// 	            ["2022-04-07 15:30", 0.07, 0.07, 0.09, 0.05, 18628],
// 	            ["2022-04-07 15:35", 0.02, 0.05, 0.02, 0.03, 26009],
// 	            ["2022-04-07 15:40", 0.07, 0.01, 0.01, 0.08, 25417],
// 	            ["2022-04-07 15:45", 0.02, 0.06, 0.02, 0.06, 22430],
// 	            ["2022-04-07 15:50", 0.07, 0.02, 0.01, 0.02, 21492],
// 	            ["2022-04-07 15:55", 0.02, 0.08, 0.03, 0.01, 21972],
// 	            ["2022-04-07 16:00", 0.05, 0.09, 0.04, 0.07, 23426],
// 	            ["2022-04-07 16:05", 0.02, 0.01, 0.04, 0.08, 18617],
// 	            ["2022-04-07 16:10", 0.01, 0.02, 0.03, 0.01, 20656],
// 	            ["2022-04-07 16:15", 0.07, 0.07, 0.04, 0.05, 24766],
// 	            ["2022-04-07 16:20", 0.01, 0.09, 0.02, 0.06, 27397],
// 	            ["2022-04-07 16:25", 0.02, 0.07, 0.06, 0.03, 20899],
// 	            ["2022-04-07 16:30", 0.08, 0.08, 0.05, 0.04, 22480],
// 	            ["2022-04-07 16:35", 0.08, 0.08, 0.05, 0.08, 18381],
// 	            ["2022-04-07 16:40", 0.01, 0.04, 0.01, 0.05, 22776],
// 	            ["2022-04-07 16:45", 0.03, 0.05, 0.02, 0.07, 18781],
// 	            ["2022-04-07 16:50", 0.09, 0.03, 0.04, 0.01, 18288],
// 	            ["2022-04-07 16:55", 0.01, 0.03, 0.02, 0.01, 16072],
// 	            ["2022-04-07 17:00", 0.04, 0.05, 0.08, 0.03, 16059],
// 	            ["2022-04-07 17:05", 0.08, 0.02, 0.05, 0.01, 27785],
// 	            ["2022-04-07 17:10", 0.08, 0.07, 0.04, 0.03, 19756],
// 	            ["2022-04-07 17:15", 0.02, 0.05, 0.06, 0.07, 20834],
// 	            ["2022-04-07 17:20", 0.08, 0.08, 0.08, 0.07, 16973],
// 	            ["2022-04-07 17:25", 0.08, 0.09, 0.02, 0.06, 16437],
// 	            ["2022-04-07 17:30", 0.09, 0.03, 0.04, 0.05, 21989],
// 	            ["2022-04-07 17:35", 0.09, 0.03, 0.01, 0.07, 22056],
// 	            ["2022-04-07 17:40", 0.05, 0.02, 0.09, 0.04, 22995],
// 	            ["2022-04-07 17:45", 0.05, 0.07, 0.03, 0.01, 22567],
// 	            ["2022-04-07 17:50", 0.09, 0.02, 0.02, 0.03, 19242],
// 	            ["2022-04-07 17:55", 0.04, 0.04, 0.01, 0.06, 22323],
// 	            ["2022-04-07 18:00", 0.05, 0.02, 0.03, 0.05, 20005],
// ];
var rawData = [];
var dates = rawData.map(function(item) {
	return item[0];
});
var data = rawData.map(function(item) {
	return [+item[1], +item[2], +item[3], +item[4], +item[5]];
});
var volumes = rawData.map(function(item, index) {
	return [index, item[5], item[1] > item[2] ? 1 : -1];
});

// 交易统计数据
var txData={
		// 最新成交价
		"lastPrice": 8.944,
		// 涨幅
		"upRate": "-79.67%",
		// 1涨绿 2跌红
		"upFlag": "2",
		// 24小时交易量
		"volume": 3,
		// 24小时最高价
		"high": 11.922,
		// 24小时最低价
		"low": 8.944
}
// 获取指定区间随机数
function sum (m,n){
　　var num = Math.floor(Math.random()*(m - n) + n);
	return num;
}
// 深度数据
var depthList=function(){
	let obj={
		buyList:[],
		sellList:[]
	};
	for(let i=0;i<20;i++){
		obj.buyList.push({
			"price": 0.988,
			"amount": 12,
			'width':sum(1,100)
		})
		obj.sellList.push({
			"price": 0.252,
			"amount": 15,
			'width':sum(1,100)
		})
	}
	return obj;
}

// 成交列表
var dealHis=function(){
	let arr=[];
	for(let i =0;i<20;i++){
		arr.push({
			"date": "07-22 16:27:44",
			// 1买入 2卖出
			"takerFlag": "1",
			"price": 44,
			"amount": 444
		})
	}
	return arr;
}
// 项目信息
var tokenInfo={
		"tokenName": "XXX",
		// 发行时间
		"issueDate": "2020-06-15",
		// 发行总量
		"totalSupply": "1000000000",
		// 流通总量
		"nowSupply": "--",
		// 众筹价格
		"price": "--",
		// 白皮书地址
		"whitePaper": "--",
		// 官网
		"webSite": "--",
		// 区块查询
		"exploereSite": "--",
		// 简介
		"remark": "--"
}
