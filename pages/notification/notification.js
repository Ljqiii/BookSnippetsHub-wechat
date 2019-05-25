// pages/message/message.js
const app = getApp()

Page({

  data: {
    loginbtn: true,
    baseurl: "",
    notifications: [],
    popupshow: false,
    popupnotificationindex: -1,

  },
  deleteSystemMessage(){
    
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo

    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    var that = this

    wx.request({
      url: app.globalData.baseurl + "/auth/uploadWxUserinfo",
      method: "POST",
      header: {
        Authorization: wx.getStorageSync("token")
      },
      data: {
        userinfo: e.detail.userInfo
      },
      success: res => {
        that.setData({
          loginbtn: false
        })
        wx.setStorageSync("hasuserinfo", true)
      }
    })
  },

  onReachBottom: function() {
    console.log("safds")
  },

  onPullDownRefresh: function() {
    wx.showNavigationBarLoading()
    setTimeout(function() {
      console.log("logonPullDownRefresh")
    }, 1000)
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
          wx.hideNavigationBarLoading()
          wx.stopPullDownRefresh()
        },
        header: {
          Authorization: wx.getStorageSync("token")
        }
      })
    }
  },

  onLoad: function(options) {
    var that = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          that.setData({
            loginbtn: false
          })
        }
      }
    })

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
    console.log("on show")

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log("on hide")

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

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