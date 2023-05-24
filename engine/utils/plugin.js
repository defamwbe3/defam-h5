import Vue from 'vue'
import notFoundImg from '../../static/images/not_found.png';
import defaultAvatar from  '@/static/images/avatar.png';


// 加载默认图片
// Vue.prototype.$setErrorImg = notFoundImg
Vue.prototype.$setErrorImg = (e) => {
  e.target.src = notFoundImg
  e.target.src.replace(/[\r\n]/g, "")
}
// 加载默认头像
// Vue.prototype.$defaultAvatar = defaultAvatar
Vue.prototype.$defaultAvatar = (e) => {
  e.target.src = defaultAvatar
  e.target.src.replace(/[\r\n]/g, "")
}
// 设置图片
Vue.prototype.$setImg = (url) => {
  let urls = ''
  if (url === '') {
    urls = Vue.prototype.$setErrorImg
  } else if (!url.includes('http') && (url.includes('.png') || url.includes('.jpg') || url.includes('.jpeg') || url.includes('.gif'))) {
    urls = Vue.prototype.$getBaseUrl() + url
  } else {
    urls = url
  }
  return urls
}
// 图片加载失败
Vue.prototype.$errorImage = (item, key) => {
  if (key) {
    item[key] = ''
  } else {
    item = ''
  }
}
