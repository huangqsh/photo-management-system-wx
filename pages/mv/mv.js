// pages/mv/mv.js
function getRandomColor () {
  let rgb = []
  for (let i = 0 ; i < 3; ++i){
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}




Page({
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  inputValue: '',
    data: {
      scrolly: '200px',
      current:0,
      mvPlay: {},
      mvList: [{
        id: 0,
        name: '漫步人生路',
        author: 'chimney',
        poster: 'https://img1.mukewang.com/5b62ccfd0001ba4406000338-240-135.jpg',
        src: 'https://huangqsh.top/static_html/mv/mv1.mp4',
      },{
        id: 1,
        name: '伦家也害羞',
        author: 'chimney',
        poster: 'https://img1.mukewang.com/5b62ccfd0001ba4406000338-240-135.jpg',
          src: 'http://huangqsh.top/static_html/mv/mv2.mp4',
      },{
        id: 2,
        name: '好莱坞chimney',
        author: 'chimney',
        poster: 'https://img1.mukewang.com/5b62ccfd0001ba4406000338-240-135.jpg',
          src: 'http://huangqsh.top/static_html/mv/mv3.mp4',
      }],
        
    danmuList: [
      {
        text: '',
        color: '',
      }]
    },
  onLoad: function(){
    //请求mv数据
    var that=this;
    wx.request({
      url: '',
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        that.setData({
          mvList: res.data
        })
      }
    })

    //初始状态播放列表第一个mv
    this.setData({
      mvPlay: this.data.mvList[this.data.current]
    })

    // scroll的高度的设定
    var that=this;
    wx.getSystemInfo({
      success: function(res) {
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        that.setData({
          scrolly: (res.windowHeight-288)+'px'
        })
     
      },
      fail: function( res ){
        console.log('获取设备信息失败')
      }
    })
  },
  bindInputBlur: function(e) {
    this.inputValue = e.detail.value
  },
  bindButtonTap: function() {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front','back'],
      success: function(res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },
  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  },
  //点击列表播放
  play: function(ev){
    var that=this;    
    this.setData({
      current: ev.currentTarget.id,
      mvPlay: this.data.mvList[ev.currentTarget.id]
    })
    setTimeout(function(){
      that.videoContext.seek(0);
      that.videoContext.play();
    },1000)
    console.log(this.videoContext)
    
  }
})