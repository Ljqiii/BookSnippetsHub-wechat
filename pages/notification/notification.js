// pages/message/message.js
const app = getApp()

Page({

  data: {
    baseurl: "",
    notifications: [],
    popupshow: false,
    popupnotificationindex: -1,

  },

  onPullDownRefresh: function() {
    wx.showNavigationBarLoading()
 
      console.log("====")
      this.getnotification()

   
  },

  getnotification: function() {
    var that = this
    if (wx.getStorageSync("hasuserinfo") == true) {
      wx.request({
        url: app.globalData.baseurl + "/getnotification",
        method: "GET",
        success: function(res) {
          that.setData({
            notifications: res.data
          })
          wx.stopPullDownRefresh()
        },
        header: {
          Authorization: wx.getStorageSync("token")
        }
      })
    }
  },

  onLoad: function(options) {

    this.setData({
      baseurl: app.globalData.baseurl
    })


    this.getnotification()

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

  },
  onPopupClose: function() {
    this.setData({
      popupshow: false
    });
  },
  showpopup: function(e) {
    this.setData({
      popupnotificationindex: e.target.dataset.notiid,
      popupshow: true
    })
  }
})