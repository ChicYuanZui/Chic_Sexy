App({
  
  onShow: function(ops) {
    console.log('onShow的执行顺序')
    wx.login({
      success: res => {
        // 开始进行回调
        console.log('开始进行回调')
        console.log(res)
        var code = res.code
        var that = this
        console.log(code)
        if (code) {
          wx.request({
            //后台接口地址
            url: "https://stu.chicyuanzui.com/stunner/userh/login",
            data: {
              code: code,
              token: getApp().globalData.token
            },
            method: "GET",
            header: {
              "content-type": "application/json"
            },
            success: function (res) {
              console.log('app获取到token')
              console.log(res.data.data.token)
              that.globalData.token = res.data.data.token
              var token = res.data.data.token
              // console.log(token)
              // console.log(that.globalData.token)
              /* if (res.data.data.get_user_info) {
                 wx.showToast({
                   title: '需要授权',
                   duration: 5000,
                   image: '/images/youwu.png',
                   success: res => {
                     setTimeout(function () {
                       wx.redirectTo({
                         url: '/pages/index/index'
                       })
                     }, 3000);
                   }
                 })
               } else {
                 // console.log(that.globalData.token)
                 // console.log('已有id不用授权')
               }*/
            }
          })
        }
      }
    })
    // //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync("logs") || [];
    // logs.unshift(Date.now());
    // wx.setStorageSync("logs", logs);
    // var openId = wx.getStorageSync("openId");
    // var nickName = wx.getStorageSync("nickName");
    // var avatarUrl = wx.getStorageSync("avatarUrl");
    // var that = this;
    // if (openId) {
    //   wx.getUserInfo({
    //     success: function(res) {
    //       var nickName = userInfo.nickName;
    //       var avatarUrl = userInfo.avatarUrl;
    //     },
    //     fail: function() {
    //       // fail
    //       // console.log("获取失败！");
    //     },
    //     complete: function() {
    //       // complete
    //       // console.log("获取用户信息完成！");
    //     }
    //   });
    // } else {
    //   /* wx.login({
    //     success: function(res) {
    //       if (res.code) {
    //         wx.getUserInfo({
    //           withCredentials: true,
    //           success: function(res_user) {
    //             wx.request({
    //               //后台接口地址
    //               url: "https://stu.wangdoukeji.com/stunner/user/login",
    //               data: {
    //                 code: res.code,
    //               },
    //               success: function(res) {
    //                 // this.globalData.userInfo = JSON.parse(res.data);
    //                 wx.setStorageSync("openId", res.data.openId);
    //                 wx.setStorageSync("avatarUrl", res.data.avatarUrl);
    //                 wx.setStorageSync("nickName", res.data.nickName);
    //                 console.log("token=" + res.data.data.token);
    //                 var token = res.data.data.token;
    //                 if (res) {
    //                   wx.request({
    //                     url:
    //                       "https://stu.wangdoukeji.com/stunner/user/reg",
    //                     data: {
    //                       res,
    //                       encryptedData:
    //                         res_user.encryptedData,
    //                       iv: res_user.iv
    //                     },
    //                     header: {
    //                       token: token
    //                     },
    //                     success: function(res) {
    //                       console.log(res.data);
    //                     }
    //                   });
    //                 } else {
    //                   console.log("shibai");
    //                 }
    //               }
    //             });
    //           },
    //           fail: function() {
                
    //           },
    //           complete: function(res) {}
    //         });
    //       }
    //     }
    //   }); */
    // }
    // 头像授权全局
    // var that = this;
    wx.getUserInfo({
      success: res => {
        console.log('头像授权')
        this.globalData.userInfo = res.userInfo
        // console.log(res.userInfo)
      }
    });
   
    
  },
  onLaunch: function () {
    console.log('onLaunch的执行顺序')
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
  globalData: {
    token: '',
    id: null,
    cox:'',
    share:'',
    userInfo: '',
    unlock: ''
  }
});