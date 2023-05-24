
var myChart;
// post请求封装
// function post(url,data) {
// 	let baseUrl='http://192.168.3.135:8080';
// 	return new Promise((resolve,reject)=>{
// 		axios({
// 			headers:{
// 				"Content-Type": "application/x-www-form-urlencoded",
// 			},
// 			method:'post',
// 			url:baseUrl+url,
// 			data:Qs.stringify( data || {})
// 		})
// 		.then(res=>{
// 			console.log(res)
// 			if(res.data.code==1){
// 				resolve(res.data)
// 			}else{
// 				reject()
// 				alertError('请求超时')
// 			}
// 		})
// 		.catch(err=>{
// 			alertError('请求超时')
// 		})
// 	})
// }
// 弹窗
