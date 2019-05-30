// pages/me/me.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseurl: "",
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    followerscount: 0,
    follow: 0,
    feed: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      baseurl: app.globalData.baseurl
    })

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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {



  },

  navigatetofollowlist: function () {
    console.log("in navigatetofollowlist")
    wx.navigateTo({
      url: '/pages/followlist/followlist'
    })
  },
  navigatetofollowerlist: function () {
    console.log("in navigatetofollowerlist")
    wx.navigateTo({
      url: '/pages/followerlist/followerlist'
    })
  },

  onShow: function() {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          console.log("in auth")
          var that = this
          wx.getUserInfo({
            success: function(res) {
              console.log(res)
              that.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              })
            }
          })
        } else {
          console.log("donot have user info")
        }
      }
    })

    var that = this
    if (wx.getStorageSync("hasuserinfo") == true) {
      wx.request({
        url: app.globalData.baseurl + "/me",
        method: "GET",
        success: function (res) {
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

  touserfeed: function() {
    var userid=wx.getStorageSync("userid")
    wx.navigateTo({
      url: '/pages/userfeed/userfeed&userid=' + userid,
    })
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo

    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

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
        wx.setStorageSync("hasuserinfo", true)
      }
    })
  },
  navigateTouserfeedmycollection: function () {
    wx.navigateTo({
      url: '/pages/userfeed/userfeed?title=我的收藏',
    })
  },

  navigateTouserfeedmyshare: function () {
    wx.navigateTo({
      url: '/pages/userfeed/userfeed?title=我的分享',
    })
  },


})