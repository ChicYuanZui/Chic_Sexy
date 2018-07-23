// pages/news/news.js
// var newsItem = require("../../mockData/newsItem.js");
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    box: [],
    nums: 10,
    last_id: 0,
    next_data: 'yes',
    button_tips:'hide'
  },
  onLoad:function(){
    wx.showLoading({
      title: '正在加载'
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  },
  onShow: function(res) {
    // 调取统一数据获取函数
    get_list(this)
  },
  toDetail: function(event) {

    var id = event.currentTarget.dataset.id;

    wx.navigateTo({
      url: "news-detail/news-detail?id=" + id
    });
  },

  // 下拉刷新  
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading(); //在标题栏中显示加载图标 
    var that = this
    //  重置操作状态
    that.setData({
      box:[],
      last_id: 0,
      next_data: 'yes'
    });
    get_list(this, function() {
      wx.hideNavigationBarLoading(); //完成停止加载  
      wx.stopPullDownRefresh(); //停止下拉刷新
    })
  },

  onReachBottom: function (){
    wx.showLoading({
      title:'正在加载'
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
    get_list(this)

  }

});

function get_list(that, complete_fun) {
  // console.log(that)
  // 判断是否可以拉取数据
  if (that.data.next_data == 'yes'){
   
    wx.request({
      url: "https://stu.chicyuanzui.com/stunner/photoh/get_lists",
      method: "GET",
      data: {
        nums: that.data.nums,
        last_id: that.data.last_id
      },
      header: {
        token: getApp().globalData.token
      },
      success: function (res) {
        // console.log(getApp().globalData.token)
        var fas = res.data.data;
        // 源数据
        var udata = that.data.box;
        // 新数组
        var ndata = fas.list;
        ndata = udata.concat(ndata)
        that.setData({
          box: ndata,
          last_id: fas.last_id,
          next_data: fas.next_data
        });
        // 进行无数据处理
        if (fas.next_data == 'no'){
          // 拉出无数据提示
          console.log('没有下次数据了')
          that.setData({
            button_tips: 'display'
          });
          
          // $('.button_taps').
        }
      },
      complete: complete_fun
    });
  }else{
    console.log('没有数据了')
  }
}
