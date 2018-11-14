var Data = require('../../../utils/util.js');
let col1H = 0;
let col2H = 0;

Page({

  data: {
    albumId: '',
    page:{
      pageSize: 10,
      pageNum: 0,
    },
    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    allCount:0,
    images: [],
    imageUrls: [],
    col1: [],
    col2: []
  },

  onLoad: function (options) {
    console.log(options);
    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.48;
        let scrollH = wh;

        this.setData({
          scrollH: scrollH,
          imgWidth: imgWidth
        });

        //加载首组图片
        this.loadImages(options.id);
      }
    })
  },

  onImageLoad: function (e) {
    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width;         //图片原始宽度
    let oImgH = e.detail.height;        //图片原始高度
    let imgWidth = this.data.imgWidth;  //图片设置的宽度
    let scale = imgWidth / oImgW;        //比例计算
    let imgHeight = oImgH * scale;      //自适应高度

    let images = this.data.images;
    let imageObj = null;

    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      if (img.id === imageId) {
        imageObj = img;
        break;
      }
    }

    imageObj.height = imgHeight;

    let loadingCount = this.data.loadingCount - 1;
    let col1 = this.data.col1;
    let col2 = this.data.col2;

    //判断当前图片添加到左列还是右列
    if (col1H <= col2H) {
      col1H += imgHeight;
      col1.push(imageObj);
    } else {
      col2H += imgHeight;
      col2.push(imageObj);
    }

    let data = {
      loadingCount: loadingCount,
      col1: col1,
      col2: col2
    };

    //当前这组图片已加载完毕，则清空图片临时加载区域的内容
    if (!loadingCount) {
      data.images = [];
    }

    this.setData(data);
  },

  loadImages: function (id) {
   
    var that = this;

    if(id != null){
      that.setData({
        albumId: id,
      });
    }
    //加载图片类别
    console.log(id);
    wx.request({
      url: Data.getUrl() +'/album/photo/findlist',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        albumId: that.data.albumId,
        page: that.data.page,
      },
      success:function(res){
        let page = res.data.data;
        let images = page.data;
        console.log(res.data.data);
        let imageUrls = [];
        for (let i = 0; i < images.length; i++) {
          imageUrls.push(images[i].url);
        }

        that.setData({
          page: {
            pageSize: 10,
            pageNum: page.pageable.pageNum+1,
          },
          loadingCount: images.length,
          allCount: images.length,
          images: images,
          imageUrls: imageUrls
        });
      }
    })
  },
  //点击详情单个图片
  show: function (event){
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = this.data.imageUrls;
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  }

})
