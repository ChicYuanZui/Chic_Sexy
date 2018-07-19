// pages/news/news-detail/news-detail.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    detail: null,
    isCollected: false,
    currentId: null,
    mHidden: true,
    show: true,
    none: true,
    jiesuo: false,
    dianzan: true,
    weidian: false,
    yidian: true,
    imgArr: [],
    box: "",
    urlList: [],
    img: 7,
    spot: "",
    spotNum: "",
    cox: "",
    clientHeight: 0, 
    arr: [], 
    arrHight: []  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    const self = this;
    wx.getSystemInfo({
      success: function (res) {
        self.setData({
          clientHeight: res.windowHeight
        });
      }
    })
    // console.log(options)  
    var tarrHight = [];
    // app.util.request({
    //   'url': 'entry/wxapp/list',
    //   data: {
    //     category: options.category ? options.category : '',
    //   },
    //   'cachetime': '30',
    //   success(res) {
    //     //console.log(res);  
    //     self.setData({
    //       list: res.data.data
    //     })
    //     //   
    //     var arr = [];
    //     var length = Array.from(res.data.data).length;
    //     var isD = length % 2 == 0 ? true : false;

    //     for (var i = 0; i < length; i++) {
    //       arr[i] = false;
    //       tarrHight[i] = Math.floor(i / 2) * (320 / 750) * 520;
    //     }

    //     self.setData({
    //       arr: arr,
    //       list: Array.from(res.data.data),
    //       arrHight: tarrHight
    //     })
    //     //  console.log(self.data.arr)  
    //     //   
    //   },
    // })
    // for (var i = 0; i < self.data.list.length; i++) {
    //   if (tarrHight[i] < self.data.scrollTop) {
    //     if (arr[i] == false) {
    //       arr[i] = true;
    //     }
    //   }
    // }
    // 上拉加载  
    //点击搜索按钮，触发事件   
    self.setData({
      listPageNum: 1, //第一次加载，设置1   
      List: [], //放置返回数据的数组,设为空   
      isFromlist: true, //第一次加载，设置true   
      listLoading: true, //把"上拉加载"的变量设为true，显示   
      listLoadingComplete: false //把“没有数据”设为false，隐藏   
    })
    // self.fetchlist();



    // console.log('e.id:'+e.id)
    app.globalData.id = e.id;
    var id = e.id;
    var that = this;
    var cox = app.globalData.cox;
    if (id > 0) {
      wx.request({
        //图片详情页接口
        url: "https://stu.chicyuanzui.com/stunner/indexh/detail",
        data: { 
          id,
          type: 1,
          token: getApp().globalData.token
        },
        method: "GET",
        header: { token: getApp().globalData.token },
        success: function(res) {
          // console.log(res.data.data.pic.length);
          var box = res.data.data.unlock;
          app.globalData.cox = res.data.data.nest_id;
          //  console.log(app.globalData.cox);
          //  console.log(res.data.data.spotNum)\
          that.setData({
            imgArr: res.data.data.pic,
            box: res.data.data.unlock,
            cox: res.data.data.nest_id,
            spotNum: res.data.data.spotNum,
            length: res.data.data.pic.length
          });
          if (box == 1) {
            that.setData({ img: 100 });
            that.setData({ jiesuo: true });
            that.setData({ dianzan: false });
          } else {
            that.setData({ img: 7 });
          }
          var spot = res.data.data.spot;
          var spotNum = res.data.data.spotNum;
          // console.log(spot);
          if (spot == 1) {
            that.setData({
              yidian: false
            });
            that.setData({
              weidian: true
            });
          } else {
            that.setData({
              yidian: true
            });
            that.setData({
              weidian: false
            });
          }
          var name = res.data.data.name;
          wx.setNavigationBarTitle({ title: name });
          // console.log(res.data.data.pic.length);
          // console.log(res.data.data.share)
          var share = res.data.data.share;
          app.globalData.share = res.data.data.share;
        }
      });
    } else if (cox == null) {
      wx.showToast({
        title: "最后一组",
        icon: "succes",
        duration: 1000,
        mask: true
      });
    } else {
      wx.request({ //图片详情页接口
        url: "https://stu.chicyuanzui.com/stunner/indexh/detail", 
        data: { id: cox, type: 1, token: getApp().globalData.token }, 
        method: "GET", 
        header: { token: getApp().globalData.token }, 
        success: function(res) {
          // console.log(res.data.data);
          var box = res.data.data.unlock;
          app.globalData.cox = res.data.data.nest_id;
          //  console.log(app.globalData.cox);
          //  console.log(res.data.data.spotNum)
          that.setData({
            imgArr: res.data.data.pic,
            box: res.data.data.unlock,
            cox: res.data.data.nest_id,
            spotNum: res.data.data.spotNum,
            length: res.data.data.pic.length
          });
          if (box == 1) {
            that.setData({ img: 100 });
            that.setData({ jiesuo: true });
            that.setData({ dianzan: false });
          } else {
            that.setData({ img: 7 });
          }
          var spot = res.data.data.spot;
          var spotNum = res.data.data.spotNum;
          // console.log(spot);
          if (spot == 1) {
            that.setData({ yidian: false });
            that.setData({ weidian: true });
          } else {
            that.setData({ yidian: true });
            that.setData({ weidian: false });
          }
          var name = res.data.data.name;
          wx.setNavigationBarTitle({ title: name });
          // console.log(res.data.data.pic.length);
          var share = res.data.data.share;
          app.globalData.share = res.data.data.share;
        } });
    }
  },
  scroll: function (e) {
    //console.log(this.data);  
    var seeHeight = this.data.clientHeight; //可见区域高度  
    var arrHight = this.data.arrHight;
    var event = e;
    var scrollTop = event.detail.scrollTop;
    var arr = this.data.arr;
    // console.log(scrollTop)  
    for (var i = 0; i < this.data.list.length; i++) {
      if (arrHight[i] < scrollTop) {
        if (arr[i] == false) {
          arr[i] = true;
          // arr[i*2]   arr[i*2+1]   
        }
        //n = i + 1;  
      }
      //arr[i] = true;  
    }
    this.setData({
      arr: arr,
      scrollTop: scrollTop
    })
  },
  //图片点击事件
  /*图片预览*/
  previewImg: function(res) {
    var that = this;
    var box = this.data.box;
    var current = res.target.dataset.src;
    var urlList = [];
    for (var i = 0; i < this.data.imgArr.length; i++) {
      urlList[i] = this.data.imgArr[i].path;
    }
    that.setData({
      urlList: urlList
    });
    if (box == 1) {
      wx.previewImage({
        current: current, // 当前显示图片的http链
        urls: urlList, // 需要预览的图片http链接列表
        success: function(res) {}
      });
    } else {
    }
  },
  //弹窗
  weidian: function() {
    this.setData({ weidian: true });
    this.setData({ yidian: false });
    wx.showToast({
      title: "点赞成功",
      icon: "succes",
      duration: 1000,
      mask: true
    });
  },
  yidian: function() {
    this.setData({ yidian: true });
    this.setData({ weidian: false });
    wx.showToast({
      title: "已取消点赞",
      icon: "succes",
      duration: 1000,
      mask: true
    });
  },

  //点赞
  dianzan: function(e) {
    var that = this;
    wx.request({
      url: "https://stu.chicyuanzui.com/stunner/indexh/spot",
      data: {
        id: getApp().globalData.id,
        token: getApp().globalData.token
      },
      method: "GET",
      header: {
        token: getApp().globalData.token
      },
      success: function(res) {
        var spot = res.data.data.spot;
        var spotNum = res.data.data.spotNum;
        if (spot == 1) {
          that.setData({ yidian: false });
          that.setData({ weidian: true });
        } else {
          that.setData({ yidian: true });
          that.setData({ weidian: false });
        }
        that.setData({
          spotNum: res.data.data.spotNum
        });
      }
    });
  },
  xiazu: function(e) {
    var cox = this.data.cox;
    // console.log(cox)
    wx.redirectTo({ url: "/pages/me/me-detail/me-detail?id=" + cox });
  }
});
