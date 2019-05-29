// pages/collection/collection.js
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {

    isloading: true,
    loginbtn: true,

    Arraylist: [1],
    baseurl: "",
    allbook: [],
    alllikebook: [],

    title: "关注"

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

  onChange: function(e) {
    console.log(e)
    this.setData({
      title: e.detail.title
    })
  },
  navigateToBookPage: function(e) {
    wx.navigateTo({
      url: '/pages/bookfeed/bookfeed?bookid=' + e.target.dataset.bookid
    })
    console.log(e)
  },

  getallbook: function() {
    var that = this
    wx.request({
      url: app.globalData.baseurl + "/getallbook",
      method: "GET",
      success: function(res) {
        console.log(res)
        that.setData({
          allbook: res.data
        })
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      },
      header: {
        Authorization: wx.getStorageSync("token")
      }
    })

  },

  getalllikebook: function() {
    var that = this
    if (wx.getStorageSync("hasuserinfo") == true) {
      wx.request({
        url: app.globalData.baseurl + "/getalllikebook",
        method: "GET",
        success: function(res) {
          console.log(res)
          that.setData({
            alllikebook: res.data
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

    setTimeout(function() {
      that.setData({
        isloading: false
      })
    }, 400)
    
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
    this.getallbook()
    this.getalllikebook()

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
    this.getallbook()
    this.getalllikebook()
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
    var that = this
    wx.showNavigationBarLoading()
    if (this.data.title == "关注") {
      that.getalllikebook()
    } else {
      that.getallbook()
    }


    console.log("onPullDownRefresh")

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