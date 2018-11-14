//index.js
//获取应用实例

var app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    n: 0,
    scrolly: '600px',
    imgUrls: [
      { id: 1, description: "镜中世界 - 镜界", url: 'http://img.zcool.cn/community/01282e58df1c45a801219c7754f76a.jpg' },
      { id: 2, description: "镜中世界 - 镜界", url: 'http://img.zcool.cn/community/01282e58df1c45a801219c7754f76a.jpg' },
      { id: 3, description: "镜中世界 - 镜界", url: 'http://img.zcool.cn/community/01282e58df1c45a801219c7754f76a.jpg' },
      { id: 4, description: "镜中世界 - 镜界", url: 'http://img.zcool.cn/community/01282e58df1c45a801219c7754f76a.jpg' },
      { id: 5, description: "镜中世界 - 镜界", url: 'http://img.zcool.cn/community/01282e58df1c45a801219c7754f76a.jpg' },
      { id: 6, description: "镜中世界 - 镜界", url: 'http://img.zcool.cn/community/01282e58df1c45a801219c7754f76a.jpg' }
    ]
  },

  onLoad: function (options) {
      app.isLogin();
   
    // scroll的高度的设定
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrolly: res.windowHeight + 'px'
        })

      },
      fail: function (res) {
        console.log('获取设备信息失败')
      }
    })
  },

})
