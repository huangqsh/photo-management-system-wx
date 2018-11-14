// pages/photo/uploadPhoto/upload.js
Page({

  /**
   * 页面的初始数据
   */
    data: {
        albumId: '',
        fileList: [{
            uid: 0,
            status: 'uploading',
            url: 'http://pbqg2m54r.bkt.clouddn.com/qrcode.jpg',
        },
        {
            uid: 1,
            status: 'done',
            url: 'http://pbqg2m54r.bkt.clouddn.com/qrcode.jpg',
        },
        {
            uid: 2,
            status: 'error',
            url: 'http://pbqg2m54r.bkt.clouddn.com/qrcode.jpg',
        }
        ],

        currentTab: 0,
        navbar: [
            { name: "视频上传" },
            { name: "图片上传" }
        ],
        radioItems: [
            {
                value: '',
                amount: '',
                alias: '',
                checked: '',
                show: 1
            },

        ],
        checkItems: [
            {
                id: "1",
                value: "1",
                alias: "推荐",
                checked: false,
                show: 1
            },
            {
                id: "2",
                value: "2",
                alias: "啊啊",
                checked: false,
                show: 1
            },
            {
                id: "3",
                value: "3",
                alias: "嗯呢",
                checked: false,
                show: 1
            },
        ],
        src: "",
        tempFile: "",
        picLists: [],
        post_desc: "",
        redio: 0,
        checked: "",
        aShow: false,
        tShow: false,
        vShow: false,
        pShow: false,
        srcUrl: "",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.id)
        let that = this;
        that.setData({
            albumId: options.id,
        })
    },

    /**
     * 视频和封面图上传
     */
    post_desc: function (e) {
        var that = this;
        that.setData({
            post_desc: e.detail.value
        })
    },
    tempFile: function (e) {
        var that = this;
        that.setData({
            tempFile: e.detail.value
        })
    },
    //上传
    formSubmitVideo: function (e) {
        var that = this;
        var info = e.detail.value;
        var userid = app.d.userId;
        info.userid = userid;
        var src = that.data.src;    //视频
        var tempFile = that.data.tempFile;   //图片
        //条件判断
        if (info.post_desc == 0) {
            wx.showToast({
                title: "您现在此刻的心情是?",
                duration: 2000,
                icon: 'none'
            });
            return false;
        }
        var reg = /^(?!\d*$)/;
        if (!reg.test(info.post_desc)) {
            wx.showToast({
                title: "不能全是数字呐~",
                duration: 2000,
                icon: 'none'
            });
            return false
        }
        if (info.src == '' || info.tempFile == '') {
            wx.showToast({
                title: "请上传图片 or 视频~",
                duration: 2000,
                icon: 'none'
            });
            return false;
        }
        if (info.checkbox == '') {
            wx.showToast({
                title: "请选择发表栏目~",
                duration: 2000,
                icon: 'none'
            });
            return false;
        }
        if (src != '' && tempFile != '') {
            // 上传视频
            wx.uploadFile({
                url: app.d.ceshiUrl + '/Api/Profile/video',
                filePath: that.data.src,
                name: 'file',
                formData: { userid: userid },
                header: {
                    "Content-Type": "multipart/form-data"
                },
                success: function (res) {
                    var arrsrc = JSON.parse(res.data);
                    //var arrsrc = res.data;
                    if (arrsrc.status != 1) {
                        wx.showToast({
                            title: '上傳视频失敗',
                            icon: 'none',
                            duration: 2000
                        });
                        return false;
                    }
                    var src = arrsrc.code;
                    info.src = src;
                    //上传图片
                    wx.uploadFile({
                        url: app.d.ceshiUrl + '/Api/Upload/index',
                        filePath: that.data.tempFile,
                        name: 'file',
                        formData: { userid: userid },
                        header: {
                            "Content-Type": "multipart/form-data"
                        },
                        success: function (res) {
                            var arrtempFile = JSON.parse(res.data);
                            //var arrtempFile = res.data;
                            var tempFile = arrtempFile.code;
                            info.tempFile = tempFile;
                            if (info != '') {
                                //提交
                                wx.request({
                                    url: app.d.ceshiUrl + '/Api/Profile/addPost',
                                    method: 'POST',
                                    data: info,
                                    header: {
                                        'content-type': 'application/x-www-form-urlencoded' // 默认值
                                    },
                                    success: function (res) {
                                        var res = res.data;
                                        console.log(res);
                                        if (res.status == 1) {
                                            wx.showToast({
                                                title: res.msg,
                                                duration: 2000,
                                                icon: 'success'
                                            });
                                            setTimeout(function () {
                                                wx.reLaunch({
                                                    url: "/pages/index/index"
                                                })
                                            }, 2000);
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            })
        }
    },
    /**
     * 多张图片上传
     */
    formSubmitPhoto: function (e) {
        var that = this;
        var info = e.detail.value;
        // console.log(info);
        if (info.post_desc.length == 0) {
            wx.showToast({
                title: "您现在此刻的心情是?",
                duration: 2000,
                icon: 'none'
            });
            return false;
        }
        var reg = /^(?!\d*$)/;
        if (!reg.test(info.post_desc)) {
            wx.showToast({
                title: "不能全是数字呐~",
                duration: 2000,
                icon: 'none'
            });
            return false
        }
        var image = [];
        var info = e.detail.value;//表单里的所有值
        var userid = app.d.userId;
        info.userid = userid;//把用户加入表单里
        if (that.data.picLists.length > 0) {
            for (var i = 0; i < that.data.picLists.length; i++) {
                // 准备上传多图
                wx.uploadFile({
                    url: app.d.ceshiUrl + '/Api/Upload/index',
                    filePath: that.data.picLists[i],
                    name: 'file',
                    formData: { userid: userid },
                    header: {
                        'content-type': 'multipart/form-data'
                    },
                    success: function (res) {
                        var arr = JSON.parse(res.data);
                        //console.log("arr数组值:"+arr);
                        image.push(arr.code);
                        if (image.length == that.data.picLists.length) {
                            info.image = image;
                            //确认提交
                            wx.request({
                                url: app.d.ceshiUrl + '/Api/Profile/done',
                                method: 'POST',
                                data: info,
                                header: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                success: function (res) {
                                    var res = res.data;
                                    if (res.status == 0) {
                                        wx.showToast({
                                            title: res.msg,
                                            duration: 2000
                                        });
                                        return false;
                                    }
                                    if (res.status == 1) {
                                        wx.showToast({
                                            title: res.msg,
                                            duration: 2000
                                        });
                                        setTimeout(function () {
                                            wx.reLaunch({
                                                url: "/pages/person/person"
                                            });
                                        }, 1000);
                                        return false;
                                    }
                                }
                            })
                        }
                    }
                })
            }
        } else {
            info.image = image;
            wx.request({
                url: app.d.ceshiUrl + '/Api/Profile/done',
                method: 'POST',
                data: info,
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                    var res = res.data;
                    if (res.status == 0) {
                        wx.showToast({
                            title: res.msg,
                            duration: 2000
                        });
                        return false;
                    }
                    if (res.status == 1) {
                        wx.showToast({
                            title: res.msg,
                            duration: 2000
                        });
                        setTimeout(function () {
                            wx.reLaunch({
                                url: "/pages/person/person"
                            });
                        }, 1000);
                        return false;
                    }
                }
            })
        }
    },

    onChange(e) {
        console.log('onChange', e)
        const { file } = e.detail
        if (file.status === 'uploading') {
            this.setData({
                progress: 0,
            })
            wx.showLoading()
        } else if (file.status === 'done') {
            this.setData({
                imageUrl: file.url,
            })
        }
    },
    onSuccess(e) {
        console.log('onSuccess', e)
    },
    onFail(e) {
        console.log('onFail', e)
    },
    onComplete(e) {
        console.log('onComplete', e)
        wx.hideLoading()
    },
    onProgress(e) {
        console.log('onProgress', e)
        this.setData({
            progress: e.detail.file.progress,
        })
    },
    onPreview(e) {
        console.log('onPreview', e)
        const { file, fileList } = e.detail
        wx.previewImage({
            current: file.url,
            urls: fileList.map((n) => n.url),
        })
    },
    onRemove(e) {
        const { file, fileList } = e.detail
        wx.showModal({
            content: '确定删除？',
            success: (res) => {
                if (res.confirm) {
                    this.setData({
                        fileList: fileList.filter((n) => n.uid !== file.uid),
                    })
                }
            },
        })
    },
    navbarTap: function (e) {
        this.setData({
            currentTab: e.currentTarget.dataset.idx
        })
    },
    checkboxChange: function (e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    },
    changeCheck(e) {
        var idx = e.currentTarget.dataset.idx;
        if (this.data.checkItems[idx].show == 1) {
            this.data.checkItems[idx].show = 0;
            // this.data.checkItems[idx].checked = true;
        } else {
            this.data.checkItems[idx].show = 1;
            // this.data.checkItems[idx].checked = false;
        }
        this.setData({
            checkItems: this.data.checkItems
        })
    },
    // 图片上传
    chooseImg(e) {
        var that = this;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                //console.log(res);
                that.setData({
                    tempFile: res.tempFilePaths[0],
                    pShow: true
                })
            }
        })
    },
    // 多图上传
    choosePhoto(e) {
        var that = this;
        wx.chooseImage({
            count: 6, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var len = res.tempFilePaths.length;
                for (var i = 0; i < len; i++) {
                    that.data.picLists.push(res.tempFilePaths[i])
                }
                var imgs = that.data.picLists.length;
                console.log("这是图片上传张数:" + imgs);
                if (imgs >= 6) {
                    that.data.aShow = true;
                    that.data.picLists.length = 6
                } else {
                    that.data.aShow = false;
                }
                that.setData({
                    picLists: that.data.picLists,
                    tShow: true,
                    aShow: that.data.aShow
                })
                console.log(that.data.picLists)
                console.log("currentTarget:" + e.currentTarget);
            }
        })
    },
    clearPhoto: function (e) {
        var that = this;
        wx.showModal({
            title: '提示',
            content: '确定删除照片？',
            success: function (res) {
                if (res.confirm) {
                    console.log('确定');
                    var imgs = that.data.picLists;
                    var index = e.currentTarget.dataset.index;
                    imgs.splice(index, 1);
                    if (imgs.length < 6) {
                        that.data.aShow = false
                    }
                    that.setData({
                        picLists: imgs,
                        aShow: that.data.aShow
                    });
                } else if (res.cancel) {
                    console.log('取消')
                }
            }
        })
    },
    previewImg(e) {
        var id = e.currentTarget.dataset.id;
        wx.previewImage({
            current: this.data.picLists[id], // 当前显示图片的http链接
            urls: this.data.picLists // 需要预览的图片http链接列表
        })
    },
    // 视频上传
    chooseVideo(e) {
        var that = this;
        wx.chooseVideo({
            sourceType: ['album', 'camera'],
            maxDuration: 60,
            camera: 'back',
            success: function (res) {
                console.log("获取视频文件路径:" + res.tempFilePath);
                if (res.tempFilePath) {
                    that.data.Vshow = false;
                } else {
                    that.data.Vshow = true;
                }
                that.setData({
                    src: res.tempFilePath,
                    Vshow: that.data.Vshow,
                })
            }
        })

    }
})