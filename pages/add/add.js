// pages/add/add.js

const app = getApp()

Page({



  /**
   * 页面的初始数据
   */
  data: {
    bookname: "",
    bookcontent: "",
    bookcomment: "",
    bgimgid: "",
    bgimgurl: "",

    baseurl: "",
    backgroundimages: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      baseurl: app.globalData.baseurl
    })


    wx.pro.request({
      url: app.globalData.baseurl + '/getallbackgroundimage'
    }).then(res => {
      if (res.data["errcode"] == 0) {
        this.setData({
          backgroundimages: res.data["backgroundImages"],
          bgimgid: res.data["backgroundImages"][0]["id"],
          bgimgurl: app.globalData.baseurl + res.data["backgroundImages"][0]["uri"]
        })
      } else {}
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

  },

  inputbookname: function(e) {
    this.setData({
      bookname: e.detail.value
    })

  },
  inputbookcontent: function(e) {
    this.setData({
      bookcontent: e.detail.value
    })

  },
  inputbookcomment: function(e) {
    this.setData({
      bookcomment: e.detail.value
    })

  },
  setbgimgid: function(e) {
    this.setData({
      bgimgid: e.currentTarget.dataset.imgid,
      bgimgurl: e.currentTarget.dataset.imguri
    })
  },
  send: function() {
    var that = this
    if (wx.getStorageSync("hasuserinfo") == true) {
      wx.request({
        url: this.data.baseurl + '/addfeed',
        data: {
          bookname: this.data.bookname,
          bookcontent: this.data.bookcontent,
          bookcomment: this.data.bookcomment,
          bgimgid: this.data.bgimgid
        },
        method: "POST",
        header: {
          Authorization: wx.getStorageSync("token")
        },
        success: function(e) {
          if (e.data["errcode"] == 0) {
            wx.showToast({
              title: '发布成功',
              icon: 'success',
              duration: 2000,
              success: function() {
                setTimeout(function() {
                  wx.switchTab({
                    url: '/pages/discovery/discovery'
                  })
                }, 2000)
              }
            })
          } else {
            wx.showToast({
              title: '发布失败',
              duration: 2000
            })
          }
        }
      })
    }
  }
})