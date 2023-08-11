// 配置编译环境和线上环境之间的切换
const env = process.env
// 阿里图表库avue、joolun、【因为阿里云图标现在变成了多个地址，所以定义了一个数据格式做了下区分如：第1个数组的就用iconfontUrl的第1个iconfontUrl中地址，依次类推】
let iconfontVersion = [['567566_qo5lxgtishg','1116466_f0ovtx5y88q','3012921_gzp7dfqt82b'],['3897410_pwdcyd7w657']]
let iconfontUrl = ['//at.alicdn.com/t/font_$key.css', '//at.alicdn.com/t/c/font_$key.css']//阿里图标地址
// 腾讯地图KEY
let qqMapKey = 'PFFBZ-RBM3V-IEEPP-UH6KE-6QUQE-C4BVJ'
//前端密码密钥，必须16位，和nacos配置文件base-gateway-dev.yml中的security.encode.key对应
let securityKey = '1234567891234567'
//后台第三方微信登录appId，微信开放平台申请网站应用：https://open.weixin.qq.com/
let wxAppId = 'wx37c7bff254f2823c'
//后台第三方QQ登录ClientId，QQ互联申请应用: https://connect.qq.com/
let qqClientId = '101885077'
//移动端（joolun-plus-uniapp）商城H5域名，用于：1、公众号自定义菜单中商城H5域名；2、店铺二维码地址
const h5HostMobile = 'http://demo1-mall.joolun.com'
//PC端（joolun-plus-uniapp-pc）商城H5域名，用于：1、店铺首页PC端访问地址
const h5HostPC = 'http://demo1-pc.joolun.com'
//小程序直播插件配置
const maLivePluginVersion = '1.2.10'
const maLivePluginProvider = 'wx2b03c6e691cd7370'
if (env.NODE_ENV == 'development') {

} else if (env.NODE_ENV == 'production') {

} else if (env.NODE_ENV == 'test') {

}
export {
  qqMapKey,
  iconfontUrl,
  iconfontVersion,
  env,
  securityKey,
  wxAppId,
  qqClientId,
  h5HostMobile,
  h5HostPC,
  maLivePluginVersion,
  maLivePluginProvider
}
