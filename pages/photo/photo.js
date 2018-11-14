// pages/music/music.js
var Data = require('../../utils/util.js');
const app = getApp()

Page({
  data:{
    image: { flag: false, src: '', path:''},//封面
    scrolly:'700px',
    photoList:[],
    album: {
      id:null,
      name:'',
      isPublic: 'checked',

    }
  },
  onLoad:function(options){
    // scroll的高度的设定
    var that=this;
    wx.getSystemInfo({
      success: function(res) {
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        that.setData({
          scrolly: res.windowHeight+'px'
        })
     
      },
      fail: function( res ){
        console.log('获取设备信息失败')
      }
    })
  },
 //获得影集
  getAlbumList: function () {
    var that = this;
    wx.request({
      url: Data.getUrl() +'/album/find',
      data: { id: app.globalData.userInfo.id},
      success(e){
        that.setData({photoList:e.data.data})
      }
    })
  },
  //点击一个影集
  tap: function (ev) {
    wx.navigateTo({
      url: `/pages/photo/photoDetail/detail?id=${ev.currentTarget.id}`
    })
  },
  //长按一个影集
  updateAlbum: function(ev){
    this.setData({tapLock:false})
    console.log(ev);
    let that = this;
    var photoList = that.data.photoList;
    for (var e in photoList ){
      if (photoList[e].id == ev.currentTarget.id){
          that.setData({
              image: { flag: true, src: photoList[e].poster, path: 'old' },
              album: {
                id: photoList[e].id,
                name: photoList[e].name,
                isPublic: photoList[e].isPublic,
              },
              showCenterDialog: !this.data.showCenterDialog
          });
          break;
      }
    }
  },

  onShow:function(){
    // 页面显示
    this.getAlbumList();
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },

  //添加影集
  addAlbum: function () {
    let that = this;
    that.setData({
      showCenterDialog: !this.data.showCenterDialog
    });
  },
  //选择封面
  chooseImage(e) {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片 
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机 
      success: res => { 
        console.log(res);
        that.setData({
          image: { flag: true, src: res.tempFilePaths[0], path: res.tempFiles[0].path, size: res.tempFiles[0].size},
        });
      } 
    })
  },
//提交添加
  albumFormSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    if (formData.isPublic){
      formData.isPublic = 1;
    }else{
      formData.isPublic = 0;
    }
    console.log(formData);
    var header = app.globalData.header;
    if (that.data.image.path != 'old'){
      header["Content-Type"] = "multipart/form-data";
      wx.uploadFile({
        url: Data.getUrl() + '/album/add',
        filePath: that.data.image.path,
        name: 'file',
        formData: formData,
        header: header,
        success: function (res) {
          console.log(res, res.data);
          var result = JSON.parse(res.data);
          that.getAlbumList();
          that.onClickCancelCenterView();
          if (result.code == '200') {
            wx.showToast({
              title: '操作成功',
              icon: 'success',
              duration: 2000
            })
          } else {
            wx.showModal({
              content: '发生了错误，状态码【' + result.code + '】',
              showCancel: false,
              success: function (res) {

              }
            });
          }
        },
        fail: function (res) {
          console.log("fail");
        }
      })    
    }else{
      wx.request({
        url: Data.getUrl() + '/album/update',
        data: formData,
        header: header,
        success: function (res) {
          console.log(res);
          that.getAlbumList();
          that.onClickCancelCenterView();
          if (res.data.code == '200'){
            wx.showToast({
              title: '操作成功',
              icon: 'success',
              duration: 2000
            })
          }else{
            wx.showModal({
              content: '发生了错误，状态码【' + res.data.status+'】',
              showCancel: false,
              success: function (res) {
                
              }
            });
          }
        },
        fail: function (res) {
          console.log("fail");
        }
      })
    }
    
  },

  //展示添加窗口
  onClickdiaView: function () {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  //关闭添加窗口
  onClickCancelCenterView: function () {
    this.setData({
      image: { flag: false, src: '' },//封面
      album: {
        name: '',
        isPublic: 'checked',
      },
      showCenterDialog: !this.data.showCenterDialog
    });
  },

})