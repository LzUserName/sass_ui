### [![输入图片说明](https://images.gitee.com/uploads/images/2021/0622/110750_59b42ced_5079715.jpeg "n_community_0l.jpg")](https://promotion.aliyun.com/ntms/yunparter/invite.html?userCode=wnw8gle1) <br>[阿里云领取￥2000红包，服务器低至￥91.80/年](https://promotion.aliyun.com/ntms/yunparter/invite.html?userCode=wnw8gle1)

### 注意🈲
1. 本软件为 www.joolun.com 开发研制，未经购买不得使用
1. 购买后有义务对源代码进行保密，禁止将本产品代码提供给任何第三方
1. 禁止将本产品的部分或全部代码和资源进行任何形式的开源（尤其上传GitHub、Gitee等开源平台）
1. 由此衍生的源代码的知识产权由购买方拥有，但是未经JooLun官方许可，不得将修改后的源代码提供给任何第三方
1. 一经发现盗用、分享、倒卖等行为，将追究法律责任，后果自负
### 重要信息
1. ⚡技术问题和bug，请提交 【[工单](https://git.joolun.com/joolun-multi/joolun-plus/issues)】；如问题解决请自行关闭工单，问题请带截图和操作步骤，问题没描述清楚的不处理
1. 前期一个月内项目部署时遇到问题可以联系技术人员QQ帮忙解决；其他非部署问题请直接发【工单】，工单无时间限制，QQ只处理前期部署方面的问题。如公司人员变动，请自行做好对接，技术支持只限前期一个月，如公司人员变动，请自行做好对接
2. 版本升级时要重新导入新的脚本，并清理redis缓存
3. 代码请拉master分支，其他分支不要管
3. 🔊请按照自己业务需求进行测试后再使用，因框架问题造成的任何损失JooLun概不负责
### ❗无论您是多年编程的资深大佬，还是刚刚入门的学生，部署请完全按照教程文档操作，先把本地开发环境跑起来再跑服务器生产环境，教程中没有说的就不需要做，一般只要按照教程一步步操作自己是可以直接部署起来的；先不要自己改代码逻辑、改库名、改包名、改服务端口、改引用的SDK版本，教程上没有说的就不要动，这样出了问题我们才好给你排查；因自己改了改代码逻辑、库名、包名、服务端口等教程之外的东西出了问题来咨询技术和工单的，都不受理
### 结构说明
* joolun-plus（后端服务）
* joolun-plus-ui（后端页面）
* joolun-plus-uniapp（uniapp商城用户端）
* joolun-plus-app（uniapp商户端app）
### 文档教程
* [开发环境部署教程](https://git.joolun.com/joolun-multi/joolun-plus/wiki/%E4%B8%80-%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83%E9%83%A8%E7%BD%B2%E6%95%99%E7%A8%8B%EF%BC%88%E5%90%8E%E5%8F%B0%EF%BC%89)
* [生产环境部署教程（centos7）](https://git.joolun.com/joolun-multi/joolun-plus/wiki/%E4%B8%80-%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83%E9%83%A8%E7%BD%B2%EF%BC%88centos7%EF%BC%89%E6%8E%A8%E8%8D%90)
* [所有教程文档](https://git.joolun.com/joolun-multi/joolun-plus/wiki)
### 常见问题
* [必看的常见问题](https://git.joolun.com/joolun-multi/joolun-plus/issues?q=&type=all&sort=&state=closed&labels=23&milestone=0&assignee=0)
### 版本升级说明
###### 升级只限于未二开的原程序，如自己已经二开过，请不要随意升级
###### 每次版本升级都会有业务或逻辑上的变化，请仔细阅读[升级日志](https://git.joolun.com/joolun-multi/joolun-plus/releases)后再决定是否升级
###### 前后端(joolun-plus、joolun-plus-ui、joolun-plus-nuiapp、joolun-plus-app)要统一升级，不能只升级某一端
###### 拉取完新版本代码后，数据库有两种方式升级；无特殊情况建议使用第一种全量导入；两种都需要清redis缓存，并重启所有服务（包括nacos）
###### 版本号查看：joolun-plus（查看pom.xml）；joolun-plus-ui（查看package.json）；joolun-plus-nuiapp、joolun-plus-app（查看package.json）
##### 第一种：重新全量导入
* 删除原来的库
* 重新导入joolun-plus/db下的4个全量脚本，无需理会升级脚本
* nacos中修改数据库、redis等信息
* 升级完要清redis缓存，再重启所有服务（包括nacos）
##### 第二种：执行升级脚本
* JooLun在每次上新版本的时候都会提供sql升级脚本（joolun-plus/db/升级脚本/xxx升级xxx.sql）
* 必须对应自己当前的版本号执行（项目pom.xml文件查看版本号）
* 数据库升级脚本不包含joolun_config库，joolun_config库一定要全量导入（先删除再导入）
* nacos中配置文件修改数据库、redis等信息
* 升级完要清redis缓存，再重启所有服务（包括nacos）
##### 如果没有特殊情况请直接第一种全量升级，避免不必要的麻烦
### 软著（受法律保护）
* ![](https://joolun-blog.oss-cn-zhangjiakou.aliyuncs.com/%E8%BD%AF%E8%91%97joolun-plus.png)