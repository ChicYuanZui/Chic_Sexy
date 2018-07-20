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
    jiesuo: true,
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
    ios:false,
    android:false,
    timeStamp: "",
    nonceStr: "",
    packAge: "",
    paySign: ""
  },
  onReady:function(){
    console.log('onReady执行的顺序')
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    wx.showShareMenu({
      withShareTicket: true
    })
    wx.showLoading({
      title: '正在加载'
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    const self = this;
    wx.getSystemInfo({
      success: function(res) {
        self.setData({
          clientHeight: res.windowHeight
        });
      }
    })
    // console.log(options)  
    var tarrHight = [];
    /*app.util.request({
      'url': 'entry/wxapp/list',
      data: {
        category: options.category ? options.category : '',
      },
      'cachetime': '30',
      success(res) {
        //console.log(res);  
        self.setData({
          list: res.data.data
        })
        //   
        var arr = [];
        var length = Array.from(res.data.data).length;
        var isD = length % 2 == 0 ? true : false;

        for (var i = 0; i < length; i++) {
          arr[i] = false;
          tarrHight[i] = Math.floor(i / 2) * (320 / 750) * 520;
        }

        self.setData({
          arr: arr,
          list: Array.from(res.data.data),
          arrHight: tarrHight
        })
        //  console.log(self.data.arr)  
        //   
      },
    })
    for (var i = 0; i < self.data.list.length; i++) {
      if (tarrHight[i] < self.data.scrollTop) {
        if (arr[i] == false) {
          arr[i] = true;
        }
      }
    }*/
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
      // 解决分享首次进入接口无排队的bug
      console.log('开始获取图集信息')
      var token = getApp().globalData.token;
      var type = 0;
      if (token === '') {
        type = 2;
      }
      console.log('获取图集使用的token' + token)
      wx.request({
        //图片详情页接口
        url: "https://stu.chicyuanzui.com/stunner/indexhtest/detail",
        data: {
          id,
          token: token
        },
        method: "GET",
        header: {
          token: token,
          type: type
        },
        success: function(res) {
          
          console.log('获得到图集信息')
          var box = res.data.data.unlock;
          app.globalData.cox = res.data.data.nest_id;
          app.globalData.pic = res.data.data.pic;
          app.globalData.unlock = res.data.data.unlock;
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
            that.setData({
              img: 99
            });
            that.setData({
              jiesuo: true
            });
            that.setData({
              dianzan: false
            });
            that.setData({
              shows: true
            });
          } else {
            that.setData({
              img: 7
            });
            that.setData({
              jiesuo: false
            });
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
          wx.setNavigationBarTitle({
            title: name
          });
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
    } else {
      wx.request({
        //图片详情页接口
        url: "https://stu.chicyuanzui.com/stunner/indexh/detail",
        data: {
          id: cox,
          token: getApp().globalData.token
        },
        method: "GET",
        header: {
          token: getApp().globalData.token,
          type: 1
        },
        success: function(res) {
          console.log('获取数据')
          console.log(res);
          var box = 0;
          app.globalData.cox = res.data.data.nest_id;
          //  console.log(app.globalData.cox);
          //  console.log(res.data.data.spotNum)
          that.setData({
            imgArr: res.data.imgArr,
            box: 0,
            cox: res.data.cox,
            spotNum: res.data.spotNum,
            length: res.data.pic.length
          });
          if (box == 1) {
            that.setData({
              img: 99
            });
            that.setData({
              jiesuo: true
            });
            that.setData({
              dianzan: false
            });
            that.setData({
              shows: true
            });
          } else {
            that.setData({
              img: 7
            });
          }
          var spot = res.data.spot;
          var spotNum = res.data.spotNum;
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
        }
      });
    }
  },
  scroll: function(e) {
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
    } else {}
  },
  //弹窗
  actioncnt: function() {
    var that = this

    /*wx.login({
      success: function (res) {
        // console.log(res.data)
        var code = res.code
        if (code) {
          wx.getUserInfo({
            success: function (res_user) {
              var id = getApp().globalData.id
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
                  var share = getApp().globalData.share;
                   
    // console.log(share)
    if(share == 1){
      that.setData({ mHidden: true });
      that.setData({ show: false });
    }else{
      that.setData({ mHidden: false });
    }
                  };
                  // wx.redirectTo({
                  //   url: "/pages/news/news-detail/news-detail?id=" +id,
                  // })
                },
              });
            },
            fail: res => {
              console.log(code)
              wx.showModal({
                title: '警告',
                content: '您点击了拒绝授权，将无法正常使用部分的功能体验。请10分钟后再次点击授权，或者重新进入小程序。',
                success: res_user => {
                  var id = getApp().globalData.id
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
                      var share = getApp().globalData.share;
    // console.log(share)
    if(share == 1){
      that.setData({ mHidden: true });
      that.setData({ show: false });
    }else{
      that.setData({ mHidden: false });
    }
                      };
                      // wx.redirectTo({
                      //   url: "/pages/news/news-detail/news-detail?id=" +id,
                      // })
                    },
                  });
                }
              })
            }
          });
        }
      }
    });*/
    /*wx.login({
      success: res => {
        var code = res.code
        var that = this
        if (code) {
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
            success: function (res) {
              // console.log(res.data)
              // that.globalData.token = res.data.data.token
              // var tonen = res.data.data.token
              var id = getApp().globalData.id
              if (res.data.data.get_user_info) {
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
                 var share = getApp().globalData.share;
    // console.log(share)
    if(share == 1){
      that.setData({ mHidden: true });
      that.setData({ show: false });
    }else{
      that.setData({ mHidden: false });
    }
              }
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
                    var share = getApp().globalData.share;
    // console.log(share)
    if(share == 1){
      that.setData({ mHidden: true });
      that.setData({ show: false });
    }else{
      that.setData({ mHidden: false });
                  };
                }
            }
          })
        }
      }
    })*/
    wx.login({
      success: function(res) {
        // console.log(res.data)
        var code = res.code
        // console.log(code)
        wx.getUserInfo({
          success: function(res_user) {
            // console.log(res_user)
            wx.request({
              //后台接口地址
              url: "https://stu.chicyuanzui.com/stunner/userh/login",
              data: {
                code: res.code,
                token: getApp().globalData.token,
                userInfo: app.globalData.userInfo
              },
              method: "GET",
              header: {
                "content-type": "application/json"
              },
              success: function(res) {
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
                    success: function(res) {
                      // console.log(res.data.data);
                    }
                  });
                } else {
                  // console.log("id已经有了");
                  var share = getApp().globalData.share;
                  // console.log(share)
                  if (share == 1) {
                    that.setData({
                      mHidden: true
                    });
                    that.setData({
                      show: false
                    });
                  } else {
                    that.setData({
                      mHidden: false
                    });
                  };
                };
              },
            });
            var share = getApp().globalData.share;
            // console.log(share)
            if (share == 1) {
              that.setData({
                mHidden: true
              });
              that.setData({
                show: false
              });
            } else {
              that.setData({
                mHidden: false
              });
            };
          },
        });
      }

    });
  },
  hide: function() {
    this.setData({
      mHidden: true
    });
  },
  fufei: function() {
    var that =this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.system.substring(0,3));
        if (res.system.substring(0,3) == "iOS") {
          that.setData({
            ios: false,
            android:true
          });
        }else{
          that.setData({
            ios: true,
            android: false
          });
        }
      }
    })
    this.setData({
      show: false
    });
  },
  hidden: function() {
    this.setData({
      show: true
    });
  },
  weidian: function() {
    this.setData({
      weidian: true
    });
    this.setData({
      yidian: false
    });
    wx.showToast({
      title: "点赞成功",
      icon: "succes",
      duration: 1000,
      mask: true
    });
  },
  yidian: function() {
    this.setData({
      yidian: true
    });
    this.setData({
      weidian: false
    });
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
      // 来自页面内转发按·
      console.log('按钮转发' + res.target);
    }
    var that = this;
    var id = getApp().globalData.id
    var info = this.data
    // console.log(info)
    return {
      title: "尤物",
      path: "/pages/news/news-detail/news-detail?id=" + id + '&type=1',
      // path: "/pages/news/news",
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
              that.setData({
                img: 99
              });
              that.setData({
                jiesuo: true
              });
              that.setData({
                mHidden: true
              });
              that.setData({
                show: true
              });
              that.setData({
                shows: true
              });
              that.setData({
                dianzan: false
              });
            } else {
              that.setData({
                img: 0
              });
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
            url: "https://stu.chicyuanzui.com/stunner/orderh/add_pay_order_new",
            data: {
              photo_id: getApp().globalData.id,
            },
            method:"GET",
            header: {
              token: getApp().globalData.token
            },
            success: function (res) {
              console.log(res);
              that.setData({
                timeStamp: res.data.data.pay.timeStamp,
                nonceStr: res.data.data.pay.nonceStr,
                packAge: res.data.data.pay.package,
                paySign: res.data.data.pay.paySign
              });
              wx.request({
                url: "https://stu.chicyuanzui.com/stunner/orderh/get_user_data",
                data: {
                  photo_id: getApp().globalData.id,
                },
                method: "GET",
                header: {
                  token: getApp().globalData.token
                },
                success: function (res) {
                  if (res.data.data.unlock_frequency != 0){
                    that.balancePay();
                  }else{
                    wx.requestPayment({
                      timeStamp: that.data.timeStamp,
                      nonceStr: that.data.nonceStr,
                      package: that.data.packAge,
                      signType: "MD5",
                      paySign: that.data.paySign,
                      success: function (res) {
                        // success
                        console.log(res);
                      },
                      fail: function (res) {
                        // fail
                        console.log(res);
                      }
                    }); 
                  }
                }
              })
            }
          })
        } else {
          console.log("获取用户登录态失败！" + res.errMsg);
        }
      }
    });
  },
  //有余额支付function
  balancePay:function(){
    var that = this;
    wx.request({
            url:"https://stu.chicyuanzui.com/stunner/Orderh/pay_photo_order",
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
              var box = res.data.data.unlock;
              // console.log(res.data.data.unlock);
              that.setData({
                box: res.data.data.unlock,
              });
              if (box == 1) {
                that.setData({
                  img: 99
                });
                that.setData({
                  jiesuo: true
                });
                that.setData({
                  mHidden: true
                });
                that.setData({
                  show: true
                });
                that.setData({
                  shows: true
                });
                that.setData({
                  dianzan: false
                });
              } else {
                that.setData({
                  img: 0
                });
              }
            }
          });
  },
  //点赞
  dianzan: function(e) {
    var that = this;
    console.log('这里是点赞前')
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
        console.log('点赞数据')
        console.log(res.data.data.spot)
        var spotNum = res.data.data.spotNum;
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
        that.setData({
          spotNum: res.data.data.spotNum,
        });
      }
    });
  },
  xiazu: function(e) {
    var cox = this.data.cox;
    // console.log(cox)
    wx.redirectTo({
      url: "/pages/news/news-detail/news-detail?id=" + cox
    });
  }
});