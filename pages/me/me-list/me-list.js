// pages/me/me-list/me-list.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    box:[],
    nums: 10,
    last_id: 0,
    next_data: 'yes',
    button_tips: 'hide'
  },
  onLoad: function(res){
    
    var that = this
    wx.showLoading({
      title: '正在加载'
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
    get_list(that)
   
  },
  onReachBottom: function () {
    wx.showLoading({
      title: '正在加载'
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
    get_list(this)

  },
  toDetail: function(event) {
    
    var id = event.currentTarget.dataset.id;
    // console.log(id);
    
    wx.navigateTo({ url: "/pages/me/me-detail/me-detail?id=" + id });
  },
});


function get_list(that, complete_fun) {
  // 判断是否可以拉取数据
  if (that.data.next_data == 'yes') {
    wx.request({
      url: "https://stu.chicyuanzui.com/stunner/indexh/get_unlock",
      method: "GET",
      header: {
        token: getApp().globalData.token
      },
      data: {
        nums: that.data.nums,
        last_id: that.data.last_id
      },
      success: function (res) {
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
        if (fas.next_data == 'no') {
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
  } else {
    console.log('没有数据了')
  }

}