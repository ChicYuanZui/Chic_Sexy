//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  /* bindViewTap: function() {
    wx.navigateTo({
      url: ''
    })
  }, */
  // onLoad: function () {
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse){
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         // console.log(res.userInfo);
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // },
  // getUserInfo: function(e) {
  //   app.globalData.userInfo = e.detail.userInfo
  //   // console.log(e.detail.userInfo);
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   });
  //   wx.login({ success: function(res) {
  //       if (res.code) {
  //         wx.getUserInfo({
  //           withCredentials: true,
  //           success: function(res_user) {
  //             wx.request({
  //               //后台接口地址
  //               url: "https://stu.chicyuanzui.com/stunner/userh/login",
  //               data: {
  //                 code: res.code,
  //               },
  //               method: "GET",
  //               header: {
  //                 "content-type": "application/json"
  //               },
  //               success: function(res) {
  //                 // this.globalData.userInfo = JSON.parse(res.data);
  //                 wx.setStorageSync("openId", res.data.openId);
  //                 wx.setStorageSync("avatarUrl", res.data.avatarUrl);
  //                 wx.setStorageSync("nickName", res.data.nickName);
  //                 app.globalData.token = res.data.data.token;
  //                 // console.log("token=" + res.data.data.token);
  //                 var token = res.data.data.token;
  //                 if (res.data.data.get_user_info) {
  //                   wx.request({
  //                     url:
  //                       "https://stu.chicyuanzui.com/stunner/userh/reg",
  //                     data: {
  //                       res,
  //                       encryptedData: res_user.encryptedData,
  //                       iv: res_user.iv
  //                     },
  //                     header: {
  //                       token: token
  //                     },
  //                     success: function(res) {
  //                       // console.log(res.data);
  //                     }
  //                   });
  //                 } else {
  //                   // console.log("用户已登录");
  //                 }
  //               }
  //             });
  //           },
  //           fail: function() {},
  //           complete: function(res) {}
  //         });
  //       }
  //     } });
  // }
  onLoad: function (res) {
    console.log(res)
    var info = (wx.getStorageSync('info'))
    if(ops == 1007 || ops == 1008 || ops == 1036 || ops == 1044){
       wx.request({
        //图片详情页接口
        url: "/pages/news/news-detail/news-detail?id=" +'info',
        data: { id},
        method: "GET",
        header: { type: 1 },
        success: function(options) {
          console.log(app.globalData.info)
          // console.log(getApp().globalData.token);
          // var box = res.data.data.unlock;
          // app.globalData.cox = res.data.data.nest_id;
          // app.globalData.pic = res.data.data.pic;
          // app.globalData.unlock = res.data.data.unlock;
          //  console.log(app.globalData.cox);
           // console.log(res.data.data.unlock)
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
    }



    var openId = (wx.getStorageSync('openId'))
    if (openId) {
      wx.getUserInfo({
        success: function (res) {
          console.log(res.data.data)
          that.setData({
            nickName: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl,
          })
        },
      })
    }
  },
  getUserInfo: function (e) {
    wx.login({
      success: function (res) {
        // console.log(res.data)
        var code = res.code
        if (code) {
          wx.getUserInfo({
            success: function (res_user) {
              wx.request({
                //后台接口地址
                url: "https://stu.chicyuanzui.com/stunner/userh/login",
                data: {
                  code: res.code,
                },
                method: "GET",
                header: {
                  "content-type": "application/json"
                },
                success: function (res) {
                  app.globalData.token = res.data.data.token;
                  var token = res.data.data.token
                  if (res.data.data.get_user_info) {
                    console.log(3)
                    wx.request({
                      url: "https://stu.chicyuanzui.com/stunner/userh/reg",
                      data: {
                        encryptedData: res_user.encryptedData,
                        iv: res_user.iv
                      },
                      header: {
                        token: token
                      },
                      success: function (res) {
                        console.log(res.data.data);
                      }
                    });
                  } else {
                    console.log("id已经有了");
                  };
                  wx.switchTab({
                    url: '/pages/news/news',
                  })
                },
              });
            },
            fail: res => {
              console.log(code)
              wx.showModal({
                title: '警告',
                content: '您点击了拒绝授权，将无法正常使用部分的功能体验。请10分钟后再次点击授权，或者重新进入小程序。',
                success: res_user => {
                  wx.request({
                    //后台接口地址
                    url: "https://stu.chicyuanzui.com/stunner/userh/login",
                    data: {
                      code: code,
                    },
                    method: "GET",
                    header: {
                      "content-type": "application/json"
                    },
                    complete: res => {
                      app.globalData.token = res.data.data.token;
                      var token = res.data.data.token
                      if (!res.data.data.get_user_info) {
                        console.log(3)
                        wx.request({
                          url: "https://stu.chicyuanzui.com/stunner/userh/reg",
                          data: {
                            encryptedData: res_user.encryptedData,
                            iv: res_user.iv
                          },
                          header: {
                            token: token
                          },
                          success: function (res) {
                            console.log(res.data.data);
                          }
                        });
                      } else {
                        console.log("id已经有了");
                      };
                      wx.switchTab({
                        url: '/pages/news/news',
                      })
                    },
                  });
                }
              })
            }
          });
        }
      }
    });
  }
})
