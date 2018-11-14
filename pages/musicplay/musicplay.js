// pages/musicplay/musicplay.js
/*Page({
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
    console.log(this.audioCtx)
  },
  data:{
    current:0,
    musicPlay:{},
    musicList:[{
        id:0,
      poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
      name: '此时此刻',
      author: '许巍',
      src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46'
    },{
      id:1,
      poster: 'http://www.dmly.online/img/music_poster/chimney01.jpg',
      name: '我怀念的',
      author: "chimney",
      src: 'http://www.dmly.online/music/whnd.mp3'
    },{
      id:2,
      poster: 'http://www.dmly.online/img/music_poster/chimney05.jpg',
      name: '童话镇',
      author: "chimney",
      src: 'http://www.dmly.online/music/thz.mp3'
    }]
  },
  
  onLoad:function(options){
    //console.log(options);
    this.setData({
      current: options.id,
      musicPlay:this.data.musicList[options.id]
    })
  },
  audioPlay: function () {
    console.log(1)
    console.log(this.audioCtx)
    //this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  },
  audio14: function () {
    this.audioCtx.seek(14)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})


*/
Page({
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
    //console.log(this.audioCtx)
  },
   data:{
    current:0,
    musicPlay:{},
    musicList:[{
      id:0,
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '此时此刻',
    author: '许巍',
    src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46'
  },{
    id:1,
    poster: 'http://www.dmly.online/img/music_poster/chimney01.jpg',
    name: '我怀念的',
    author: "chimney",
    src: 'http://www.dmly.online/music/whnd.mp3'
  },{
    id:2,
    poster: 'http://www.dmly.online/img/music_poster/chimney05.jpg',
    name: '童话镇',
    author: "chimney",
    src: 'http://www.dmly.online/music/thz.mp3'
  },{
    id:3,
    poster: 'http://www.dmly.online/img/music_poster/chimney03.jpg',
    name: '暧昧',
    author: "薛之谦",
    src: 'http://www.dmly.online/music/am.mp3'
  },{
    id:4,
    poster: 'http://www.dmly.online/img/music_poster/chimney04.jpg',
    name: 's7',
    author: "无名氏",
    src: 'http://www.dmly.online/music/sdyjq.mp3'
  },{
    id:5,
    poster: 'http://www.dmly.online/img/music_poster/chimney06.jpg',
    name: 'see you again',
    author: "s8",
    src: 'http://www.dmly.online/music/sya.mp3'
  },{
    id:6,
    poster: 'http://www.dmly.online/img/music_poster/chimney07.jpg',
    name: '我害怕',
    author: "胆小哥",
    src: 'http://www.dmly.online/music/whp.mp3'
  },{
    id:7,
    poster: 'http://www.dmly.online/img/music_poster/chimney08.jpg',
    name: '喜欢上的内心活动',
    author: "陈琦",
    src: 'http://www.dmly.online/music/xhsnsdnxhd.mp3'
  },{
    id:8,
    poster: 'http://www.dmly.online/img/music_poster/chimney09.jpg',
    name: 'xb',
    author: "don't know",
    src: 'http://www.dmly.online/music/xb.mp3'
  }]
  },
  onLoad:function(options){
    //console.log(options);
    var that=this;
    this.setData({
      current: options.id,
      musicPlay:this.data.musicList[options.id]
    });
    setTimeout(function(){
      that.audioPlay();
    },800)
    
  },
  audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
    //this.audioCtx.seek(600)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  },
  //上一首
  audioPre: function(){
    var that=this;
    if(this.data.current<=0){
      this.setData({
        current: this.data.musicList.length-1,
        musicPlay:this.data.musicList[this.data.musicList.length-1]
      })
    }else{
      this.setData({
        current: this.data.current-1,
        musicPlay:this.data.musicList[this.data.current-1]
      })
    }
    setTimeout(function(){
      that.audioCtx.play()
    },800)
    
  },
  //下一首
  audioNext: function(){
    var that=this;
    if(this.data.current>=(this.data.musicList.length-1)){
      this.setData({
        current: 0,
        musicPlay:this.data.musicList[0]
      })
    }else{
      this.setData({
        current: parseInt(this.data.current)+1,
        musicPlay:this.data.musicList[parseInt(this.data.current)+1]
      })
    }
    console.log(this.data.current,this.data.musicPlay)
    setTimeout(function(){
      that.audioCtx.play()
    },800)
    
  },
  auto: function(){
    this.audioNext();
    var that=this;
    setTimeout(function(){
      that.audioCtx.play()
    },800)
    
  }

})