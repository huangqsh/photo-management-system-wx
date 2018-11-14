//app.js
var Data = require('./utils/util.js');

App({
    globalData: {
        userInfo: null,
        header: { 'Cookie': '' }
    },
    onLaunch: function () {
        //调用API从本地缓存中获取数据
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
    },
  
    isLogin: function (e) {
        try {
            var value = wx.getStorageSync('user');
            if (value) {
                this.globalData.userInfo = value;
            } else {
                wx.redirectTo({
                    url: '/pages/wxLogin/wxLogin',
                });
                return false;
            }
        } catch (e) {
            wx.redirectTo({
                url: '/pages/wxLogin/wxLogin',
            });
            return false;
        }
    },
    //登录
    getUserInfo: function (func) {
        var that = this;
        if (this.globalData.userInfo.isRegistry) {
            typeof func == "function" && func(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.login({
                success: function (res) {
                    //通过code进行后台登陆
                    wx.request({
                        url: Data.getUrl() + '/localLogin',
                        data: { code: res.code },
                        header: {
                            'content-type': 'application/json'
                        },
                        success: function (result) {
                            if (result.data.data){
                                console.log(result.data.data, "登陆成功")
                                that.globalData.userInfo = result.data.data;
                                typeof func == "function" && func(that.globalData.userInfo)
                                that.globalData.header = { 'Cookie': 'JSESSIONID=' + result.data.message };
                                //第一访问小程序，需要注册信息到数据库
                                if (result.data.data.isRegistry == 0) {
                                    that.registry(result.data.data.openid);
                                }
                                wx.setStorageSync("user", that.globalData.userInfo);
                            }
                        },
                        fail: function (e) {
                            wx.showToast({
                                title: '获取失败',
                                icon: "none"
                            })
                        }

                    })

                }
            })
        }
    },

    //注册
    registry: function (openid) {
        console.log("注册");
        var that = this;
        var data = this.globalData.userInfo;
        data.openid = openid;
        delete data.language;
        wx.request({
            url: Data.getUrl() + '/registry',
            data: {
                avatarUrl: data.avatarUrl,
                openid: openid,
                city: data.city,
                country: data.country,
                gender: data.gender,
                nickName: data.nickName,
                openid: data.openid,
                province: data.province
            },
            method: 'POST',
            header: that.globalData.header,
            success: function (res) {

            }
        })
    },
})