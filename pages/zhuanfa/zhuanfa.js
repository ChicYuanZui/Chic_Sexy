// https://stu.chicyuanzui.com// pages/news/news-detail/news-detail.js
// var detailList = require("../../../mockData/newsData.js")
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
    arrHight: [],
    info: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    if (id > 0) {
      wx.request({
        //图片详情页接口
        url: "https://stu.chicyuanzui.com/stunner/indexh/detail",
        data: { id, token: getApp().globalData.token },
        method: "GET",
        header: { token: getApp().globalData.token },
        success: function(res) {
          // console.log(getApp().globalData.token);
          var box = res.data.data.unlock;
          app.globalData.cox = res.data.data.nest_id;
          app.globalData.pic = res.data.data.pic;
          app.globalData.unlock = res.data.data.unlock;
          //  console.log(app.globalData.cox);
           console.log(res.data.data.unlock)
          that.setData({
            imgArr: res.data.data.pic,
            box: res.data.data.unlock,
            cox: res.data.data.nest_id,
            spotNum: res.data.data.spotNum,
            length: res.data.data.pic.length
          });
          if (box == 1) {
            that.setData({ img: 99 });
            that.setData({ jiesuo: true });
            that.setData({ dianzan: false });
            that.setData({ shows: true });
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
          var share = res.data.data.share
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
    } 
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
  actioncnt: function() {
    var that = this
    
    wx.login({
      success: function (res) {
        // console.log(res.data)
        var code = res.code
        // console.log(code)
          wx.getUserInfo({
            success: function (res_user) {
              // console.log(res_user)
              wx.request({
                //后台接口地址
                url: "https://stu.chicyuanzui.com/stunner/userh/login",
                data: {
                  code: res.code,
                  token: getApp().globalData.token,
                  userInfo:app.globalData.userInfo
                },
                method: "GET",
                header: {
                  "content-type": "application/json"
                },
                success: function (res) {
                  app.globalData.token = res.data.data.token;
                  var token = res.data.data.token
                  // console.log(token)
                  if (res.data.data.get_user_info) {
                    wx.request({
                      url: "https://stu.chicyuanzui.com/stunner/userh/reg",
                      data: {
                        encryptedData: res_user.encryptedData,
                        iv: res_user.iv,
                        token: getApp().globalData.token
                      },
                      header: {
                        token: token
                      },
                      success: function (res) {
                        // console.log(res.data.data);
                      }
                    });
                  } else {
                    // console.log("id已经有了");
                    var share = getApp().globalData.share;
                    // console.log(share)
                    if(share == 1){
                      that.setData({ mHidden: true });
                      that.setData({ show: false });
                    }else{
                      that.setData({ mHidden: false });
                    };
                  };
                },
              });
              var share = getApp().globalData.share;
              // console.log(share)
              if(share == 1){
                that.setData({ mHidden: true });
                that.setData({ show: false });
              }else{
                that.setData({ mHidden: false });
              };
            },
          });
        }
      
    });
  },
  hide: function() {
    this.setData({ mHidden: true });
  },
  fufei: function() {
    this.setData({ show: false });
  },
  hidden: function() {
    this.setData({ show: true });
  },
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

  /*分享*/
  onShareAppMessage: function(res) {
    if (res.from === "button") {
      // 来自页面内转发按钮
      // console.log(res.target);
    }
    var that = this;
    var id = getApp().globalData.id
    console.log(this.data)
    console.log(this.data.cox)
    console.log(this.data.imgArr)
    // var info = pic
    // console.log(info)
    return {
      title: "尤物",
      path: "/pages/news/news-detail/news-detail?id=" +info,
      success: function(res) {
        // 转发成功
        wx.showToast({
          title: "成功",
          icon: "succes",
          duration: 1000,
          mask: true
        });
        console.log("转发成功:" + JSON.stringify(res));
        wx.request({
          //分享解锁接口
          url: "https://stu.chicyuanzui.com/stunner/indexh/share",
          data: {
            id: getApp().globalData.id,
            token: getApp().globalData.token
          },
          method: "GET",
          header: {
            token: getApp().globalData.token
          },
          success: function(res) {
            // console.log(res)
            // console.log(res.data.data.pic)
            // console.log(res.data.data.unlock)
            var box = res.data.data.unlock;
            that.setData({ 
              box: res.data.data.unlock,
              imgArr: res.data.data.pic,
            });
            if (box == 1) {
              that.setData({ img: 99 });
              that.setData({ jiesuo: true });
              that.setData({ mHidden: true });
              that.setData({ show: true });
              that.setData({ shows: true });
              that.setData({ dianzan: false });
            } else {
              that.setData({ img: 0 });
            }
          }
        });
      },

      fail: function(res) {
        // 转发失败
        // console.log("转发失败:" + JSON.stringify(res));
      }
    };
  },
  //支付
  pay: function() {
    var ordercode = this.data.txtOrderCode;
    var that = this;
    wx.login({
      success: function(res) {
        if (res.code) {
          wx.request({
            url: "https://stu.chicyuanzui.com/stunner/orderh/create",
            data: {
              photo_id: getApp().globalData.id,
              amount: 0,
              token: getApp().globalData.token
            },
            method: "GET",
            header: {
              token: getApp().globalData.token
            },
            success: function(res) {
              // console.log(res.data);
              /* wx.requestPayment({
                timeStamp: "",
                nonceStr: "",
                package: "",
                signType: "MD5",
                paySign: "",
                success: function(res) {
                  // success
                  // console.log(res);
                },
                fail: function(res) {
                  // fail
                  // console.log(res);
                }
              }); */
              
              var box = res.data.data.unlock;
              // console.log(res.data.data.unlock);
              that.setData({
                box: res.data.data.unlock,
              });
              if (box == 1) {
                that.setData({ img: 99 });
                that.setData({ jiesuo: true });
                that.setData({ mHidden: true });
                that.setData({ show: true });
                that.setData({ shows: true });
                that.setData({ dianzan: false });
              } else {
                that.setData({ img: 0 });
              }
            }
          });
        } else {
          console.log("获取用户登录态失败！" + res.errMsg);
        }
      }
    });
  },
  //点赞
  dianzan: function(e) {
    var that = this;
    console.log(e)
    console.log(getApp().globalData.token)
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
        console.log(res.data.data.spot)
        var spotNum = res.data.data.spotNum;
        if (spot == 1) {
          that.setData({ yidian: false });
          that.setData({ weidian: true });
        } else {
          that.setData({ yidian: true });
          that.setData({ weidian: false });
        }
        that.setData({
          spotNum: res.data.data.spotNum,
        });
      }
    });
  },
  xiazu: function(e) {
    var cox = this.data.cox;
    // console.log(cox)
    wx.redirectTo({ url: "/pages/news/news-detail/news-detail?id=" + cox });
  }
});