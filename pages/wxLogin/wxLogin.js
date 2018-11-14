// pages/wxLogin/wxLogin.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:''
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //点击授权
    getUserInfo: function(e) {
        app.globalData.userInfo = e.detail.userInfo;
        var that = this;
        app.getUserInfo(function (userInfo) {
            if (userInfo.gender == 1) {
                userInfo.genderStr = '男';
            } else if (userInfo.gender == 2) {
                userInfo.genderStr = '女';
            } else {
                userInfo.genderStr = ' ';
            }
            app.globalData.userInfo = userInfo;
            wx.setStorageSync("user", userInfo);
            setTimeout(function () {
                wx.reLaunch({
                    url: "/pages/index/index"
                })
            }, 2000);
        })

    },
 
})