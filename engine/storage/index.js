import http from '@/engine/request/index'
// 当前用户资料
// 引用方法 import { userInfo } from '@/engine/storage';
// 使用方法 userInfo.get(true).then(res=>{})  true 选填，为true时走接口请求 不填写时不走接口拿缓存数据
const userInfo = {
  get (nocache) {
    let data = uni.getStorageSync('userInfo')
    if (!data || nocache) {
      return requestUserInfo().then(function (res) {
        uni.setStorageSync('userInfo', JSON.stringify(res.data))
        return res.data
      })
    } else {
      return Promise.resolve(JSON.parse(data))
    }
  },
  set (key, value) {
    let data = uni.getStorageSync('userInfo')
    if (!data) {
      return
    }
    let info = JSON.parse(data)
    info[key] = value
    uni.setStorageSync('userInfo', JSON.stringify(info))
  },
  update () {
    uni.removeStorageSync('userInfo')
    requestUserInfo().then(function (res) {
      setData('userInfo', JSON.stringify(res.data), sessionStorage)
    })
  },
  remove () {
    uni.removeStorageSync('userInfo')
  }
}


function requestUserInfo () {
	uni.stopPullDownRefresh();
  return http('member/info', {}, 'GET')
}


export {
  userInfo
}
