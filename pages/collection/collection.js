// pages/collection/collection.js
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseurl: ""

  },

  getallbook: function() {
      var that = this
      if (wx.getStorageSync("hasuserinfo") == true) {
        wx.request({
          url: app.globalData.baseurl + "/me",
          method: "GET",
          success: function(res) {
            that.setData({
              followerscount: res.data["followerscount"],
              follow: res.data["followcount"],
              feed: res.data["feed"]
            })
          },
          header: {
            Authorization: wx.getStorageSync("token")
          }
        })
      }

    }

    ,
  onLoad: function(options) {
    this.setData({
      baseurl: app.globalData.baseurl
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