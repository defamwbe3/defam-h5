import {
	API_URL
} from '@/env'
import {
	router
} from '@/engine/router'
export default {

	/**
	 * 跳转再封装,主要是为了兼容外链。
	 * @param {String} path - 跳转路径
	 * @param {isTabbar} isTabbar - 是否是底部导航
	 */
	routerTo(path, isTabbar) {
		if (path) {
			// 是否跳转外部链接
			if (~path.indexOf('http') || ~path.indexOf('www')) {
				if (~path.indexOf('http') < 0) {
					// #ifdef H5
					window.location.href = path;
					// #endif
					// #ifndef  H5
					router.push({
						path: '/pages/public/webview',
						query: {
							'webviewPath': path
						}
					})
					// #endif
					return false
				} else {
					// #ifdef H5
					window.location.href = 'https://' + path;
					// #endif
					// #ifndef  H5
					router.push({
						path: '/pages/public/webview',
						query: {
							'webviewPath':'https://' +  path
						}
					})
					// #endif
					return false
				}
			}
			if (isTabbar) {
				router.replaceAll(path)
			} else {
				path.includes('/pages/index') && !path.includes('/pages/index/view') ? router.pushTab(path) : router
					.push(path)
			}

		} else {
			console.log(`%cerr:没有填写跳转路径`, 'color:green;background:yellow');
		}
	},
	/**
	 * 图片处理-预览图片
	 * @param {Array} urls - 图片列表
	 * @param {Number} current - 首个预览下标
	 */
	previewImage(urls = [], current = 0) {
		uni.previewImage({
			urls: urls,
			current: current,
			indicator: 'default',
			loop: true,
			fail(err) {
				console.log('previewImage出错', urls, err)
			},
		})
	},
	// 图片处理-选择图片
	chooseImage(count = 1) {
		return new Promise((resolve, reject) => {
			uni.chooseImage({
				count: count, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: res => {
					// console.log('~~~~~~~~~~~',res);
					resolve(res.tempFilePaths);
				}
			});
		}).catch(e => {
			reject(e)
		})
	},
	// 图片处理-上传图片
	uploadImage(api, url) {
		let config_url = API_URL;
		uni.showLoading({
			title: '上传中'
		});
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				url: config_url + api,
				filePath: url,
				name: 'file',
				header: {
					authorization: 'Bearer ' + uni.getStorageSync('token'),
					Accept: 'application/json'
				},
				success: res => {
					let shuju = JSON.parse(res.data)
					// console.log('++++++',res)
					if (shuju.code === 10000) {
						uni.hideLoading()
						uni.showToast({
							title: '上传成功',
							icon: 'none'
						});
						resolve(shuju.data)
					} else {
						uni.hideLoading()
						uni.showModal({
							title: '上传失败',
							content: shuju.message
						});
					}
				}
			});
		}).catch(e => {
			reject(e)
		})
	},
	/**
	 * 数据分组
	 * @param {Array} oArr - 原数组列表
	 * @param {Number} length - 单个数组长度
	 * @return {Array}  arr - 分组后的新数组
	 */
	splitData(oArr = [], length = 1) {
		let arr = [];
		let minArr = [];
		oArr.forEach(c => {
			if (minArr.length === length) {
				minArr = [];
			}
			if (minArr.length === 0) {
				arr.push(minArr);
			}
			minArr.push(c);
		});

		return arr;
	},

	/**
	 * 剩余时间格式化
	 * @param {Number} t - 剩余多少秒
	 * @return {Object}  format - 格式后的天时分秒对象
	 */
	format(t) {
		let format = {
			d: '00',
			h: '00',
			m: '00',
			s: '00'
		};
		if (t > 0) {
			let d = Math.floor(t / 86400);
			let h = Math.floor((t / 3600) % 24);
			let m = Math.floor((t / 60) % 60);
			let s = Math.floor(t % 60);
			format.d = d < 10 ? '0' + d : d;
			format.h = h < 10 ? '0' + h : h;
			format.m = m < 10 ? '0' + m : m;
			format.s = s < 10 ? '0' + s : s;
		}
		return format;
	},
	/**
	 *  @fn  时间间隔格式化
	 *  @param {*} startTime 开始时间的时间戳
	 *  @param {*} endTime 结束时间的时间戳
	 *  @return {string} str 返回时间字符串
	 */
	getTimeInterval(startTime, endTime) {
		let runTime = parseInt((endTime - startTime) / 1000);
		let year = Math.floor(runTime / 86400 / 365);
		runTime = runTime % (86400 * 365);
		let month = Math.floor(runTime / 86400 / 30);
		runTime = runTime % (86400 * 30);
		let day = Math.floor(runTime / 86400);
		runTime = runTime % 86400;
		let hour = Math.floor(runTime / 3600);
		runTime = runTime % 3600;
		let minute = Math.floor(runTime / 60);
		runTime = runTime % 60;
		let second = runTime;
		let str = '';
		if (year > 0) {
			str = year + '年';
		}
		if (year <= 0 && month > 0) {
			str = month + '月';
		}
		if (year <= 0 && month <= 0 && day > 0) {
			str = day + '天';
		}
		if (year <= 0 && month <= 0 && day <= 0 && hour > 0) {
			str = hour + '小时';
		}
		if (year <= 0 && month <= 0 && day <= 0 && hour <= 0 && minute > 0) {
			str = minute + '分钟';
		}
		if (year <= 0 && month <= 0 && day <= 0 && hour <= 0 && minute <= 0 && second > 0) {
			str += second + '秒';
		}
		str += '前';
		return str;
	},
	/**
	 * 打电话
	 * @param {String<Number>} phoneNumber - 数字字符串
	 */
	callPhone(phoneNumber = '') {
		let num = phoneNumber.toString()
		uni.makePhoneCall({
			phoneNumber: num,
			fail(err) {
				console.log('makePhoneCall出错', err)
			},
		});
	},

	/**
	 * toast
	 * @param {String<String>} title - 字符串
	 */
	msg(title, callback = () => { }, duration = 1000, mask = true, icon = "none") {
		//统一提示方便全局修改
		if (Boolean(title) === false) {
			return;
		}
		uni.showToast({
			title,
			duration,
			mask,
			icon,
			success: function () {
				setTimeout(callback, duration);
			}
		});
	},

	// 验证身份证号码
	isIdNumber(value) {
		var num = value.toUpperCase() || '';
		// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
		var reg = /^(\d{18,18}|\d{15,15}|\d{17,17}X)$/;
		if (!reg.test(num)) {
			return false;
		}
		// 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
		// 下面分别分析出生日期和校验位
		var len, re;
		len = num.length;
		if (len == 15) {
			re = new RegExp(
				/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
			var arrSplit = num.match(re) || [];
			// 检查生日日期是否正确
			var dtmBirth = new Date('19' + arrSplit[2] +
				'/' + arrSplit[3] + '/' + arrSplit[4]);
			var bGoodDay;
			bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) &&
				((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) &&
				(dtmBirth.getDate() == Number(arrSplit[4]));
			if (!bGoodDay) {
				return false;
			}
		}
		if (len == 18) {
			re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
			var arrSplit = num.match(re) || [];
			// 检查生日日期是否正确
			var dtmBirth = new Date(arrSplit[2] + "/" +
				arrSplit[3] + "/" + arrSplit[4]);
			var bGoodDay;
			bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) &&
				((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) &&
				(dtmBirth.getDate() == Number(arrSplit[4]));
			if (!bGoodDay) {
				return false;
			} else {
				// 检验18位身份证的校验码是否正确。
				// 校验位按照ISO 7064:1983.MOD
				// 11-2的规定生成，X可以认为是数字10。
				var valnum;
				var arrInt = new Array(7, 9, 10, 5, 8, 4,
					2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
				var arrCh = new Array('1', '0', 'X', '9',
					'8', '7', '6', '5', '4', '3', '2');
				var nTemp = 0,
					i;
				for (var i = 0; i < 17; i++) {
					nTemp += num.substr(i, 1) * arrInt[i];
				}
				valnum = arrCh[nTemp % 11];
				if (valnum != num.substr(17, 1)) {
					return false;
				}
			}
		}
		return true;
	}

}
