// pages/my/my.js
const app = getApp()

Page({
  data: {
    userInfo: {}
  },
  
  onLoad: function () {
    
  },

  onShow: function () {
    // 页面显示
    this.setData({
      userInfo: app.globalData.userInfo,
    })
  }
})