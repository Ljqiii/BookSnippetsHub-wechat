// pages/bookfeed/bookfeed.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseurl: "",
    name: "",
    description: "",
    id: "",
    bookcoverimgurl: "",

    isstar: false,

    allfeedid: [],
    allfeed: []
  },

likebook:function(){
  var that=this
  wx.request({
    url: app.globalData.baseurl + '/likebook',
    data:{
      bookid: that.data.id
    },
    method: "POST",
    header: {
      Authorization: wx.getStorageSync("token")
    },
    success:function(res){
      if(res.data["isok"]==true){
          that.setData({
            isstar: true
          })
      }
    }
  })

},
dislikebook:function(){
  var that = this
  wx.request({
    url: app.globalData.baseurl + '/dislikebook',
    data: {
      bookid: that.data.id
    },
    method: "POST",
    header: {
      Authorization: wx.getStorageSync("token")
    },
    success: function (res) {
      if (res.data["isok"] == true) {
        that.setData({
          isstar: false
        })
      }

    }
  })
}

,


  onLoad: function(options) {
    var that = this
    wx.request({
      url: app.globalData.baseurl + '/islike',
      data: {
        bookid: options.bookid
      },
      method: "POST",
      header: {
        Authorization: wx.getStorageSync("token")
      },
      success: function(res) {
        that.setData({
          isstar: res.data["islike"]
        })
        console.log(res)
      }
    })
    this.setData({
      baseurl: app.globalData.baseurl
    })
    wx.request({
      url: app.globalData.baseurl + '/getbook',
      method: "POST",
      data: {
        bookid: options.bookid
      },
      success: function(res) {
        console.log(res)
        that.setData({
          name: res.data["name"],
          description: res.data["description"],
          id: res.data["id"],
          bookcoverimgurl: res.data["bookcoverimgurl"]
        })
        wx.setNavigationBarTitle({
          title: res.data["name"]
        })

      }
    })

    wx.request({
      url: app.globalData.baseurl + '/getbookfeed',
      method: "POST",
      data: {
        bookid: options.bookid,
        allfeedid: this.data.allfeed
      },
      success: function(res) {
        console.log(res)
        that.setData({
          allfeed: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})