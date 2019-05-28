// pages/feedcomment/feedcomment.js
const app = getApp()

Page({


  /**
   * 页面的初始数据
   */
  data: {
    commentvalue: "",
    feed: [],
    comments: [],

    baseurl: "",
    feedid: ""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this

    this.setData({
      baseurl: app.globalData.baseurl
    })

    console.log(options)
    this.setData({
      feedid: options.feedid
    })

    wx.request({
      url: app.globalData.baseurl + "/getfeed",
      method: "POST",
      data: {
        feedid: options.feedid
      },
      success: function(res) {
        console.log(res)
        that.setData({
          feed: res.data
          // recommendfeeds: that.data.recommendfeeds.concat(res.data)
        })
      },
    })

    wx.request({
      url: app.globalData.baseurl + "/getallcomment",
      method: "POST",
      header: {
        Authorization: wx.getStorageSync("token")
      },
      data: {
        feedid: options.feedid
      },
      success: function(res) {
        console.log(res)
        that.setData({
          comments: res.data
        })
      },
    })


  },
  addcomment: function() {
    var that = this
    wx.request({
      url: app.globalData.baseurl + '/addcomment',
      method: "POST",
      header: {
        Authorization: wx.getStorageSync("token")
      },
      data: {
        feedid: this.data.feedid,
        commentvalue: this.data.commentvalue
      },
      success: function(res) {
        console.log(res)

        var temp = that.data.comments
        console.log(temp)

        temp.push(res.data.comment)
        console.log(res.data.comment)
        console.log(temp)

        that.setData({
          comments: temp,
          commentvalue: ""
        })
      }
    })
  },

  addcommentbtn: function(e) {
    var that = this
    if (wx.getStorageSync("hasuserinfo") == true) {
      this.addcomment()
    } else {
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
          that.addcomment()
        }
      })
    }
  },

  oncommentinputchange: function(e) {
    this.setData({
      commentvalue: e.detail
    })
  },

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