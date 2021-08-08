![kickass](https://github.com/zaiyuyishiyoudu/luci-app-kickass/blob/master/screenshot.png)

![kickass](https://github.com/zaiyuyishiyoudu/luci-app-kickass/blob/master/screenshot2.png)

![kickass](https://github.com/zaiyuyishiyoudu/luci-app-kickass/blob/master/对比阀值设置.png)

![kickass](https://github.com/zaiyuyishiyoudu/luci-app-kickass/blob/master/对比阀值设置2.png)


# luci-app-kickass

基于shell写的自动检测剔除脚本，支持弱信号剔除与强信号剔除，从原出处 https://github.com/Quenii/kickass  弱信号剔除 https://www.cnblogs.com/oneseven/p/8974740.html 修改而来

默认支持多个无线热点剔除支持，需要开源驱动

# 补充：
1.其中强信号剔除如果配合wifidog-ng https://github.com/zhaojh329/wifidog-ng/tree/v1.5.6 其中wifidog-ng用来阻断网络并给一个“请将设备靠近路由器的网页提示”将脚本强信号剔除命来换成wifidog放行命令则可以实现距离感应WiFi上网，可以有效防止蹭网行为（带功放的定向网卡除外）简单但不完美 应该命来是网页认证授权放行（需要支持命来放行的wifidog认证服务器程序）放行后网页跳转欢迎页

2.对比条件通过系统无线配置的js“wireless.js”写入“wireless”中

# 位置： ../feeds/luci/modules/luci-mod-network/htdocs/luci-static/resources/view/network/wireless.js
最新源码位置略有不同

# 缺点：
用shall来写在专业的人看来或许像狗屎一样臭，可能会引起一系列莫名其妙的未知问题，但毕竟是业余的不懂c之类的一切编程语言各种命令来源于网上搜索

# 编译步骤：
1. git clone https://github.com/zaiyuyishiyoudu/luci-app-kickass.git
2. 将luci-app-kickass内的luci-app-kickass复制或剪切到package内粘贴
3. 进入定制界面Applications内勾选luci-app-kickass
4. 根据例子修改wireless.js添加阀值控制选项
5. 编译不用多说了。。。

# 希望有人能够提供用c或者python写的版本并添加详细注释
