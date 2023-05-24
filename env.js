/**
 *  Shopro全局配置文件 v1.3.2
 */

// export const BASE_URL = 'https://api.cjlbzx.szyqa.com/api/' //测试后台根域名'
// export const SHARE_url = 'https://h5.cjlbzx.szyqa.com/#/' //邀请测试'

export const BASE_URL = 'https://api.defam.info/api/' //正试后台根域名'
export const SHARE_url = 'https://h5.defam.info/#/' //邀请国内正式'
// export const SHARE_url = 'https://h5.defam.io/#/' //邀请国外正式'

// export const BASE_URL = '/app/' //正式后台根域名'
export const API_URL = `${BASE_URL}` //后台接口域名
// export const IMG_URL = 'https://api.cjlbzx.szyqa.com/static/images/' //全局网络图片地址变量，css背景图片地址变量在uni.scss
export const IMG_URL = 'https://api.defam.info/static/images/' //全局网络图片地址变量，css背景图片地址变量在uni.scss
export const MAP_KEY = '426ebc3f1*****0689ee6061a98'; //高德地图开发者Web服务key,逆坐标解析
export const HAS_LIVE = false //后台是否开通直播权限,根据情况在manifest.json中，开启注释相应组件的引入。

