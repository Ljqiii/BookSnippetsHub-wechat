const app = getApp()

Page({

  data: {

    isFolded: true,



    loginbtn: true,
    baseurl: "",
    alllikebook: [],
    allrecommendfeedsid: [],
    recommendfeeds: [],
    displayfollowbtn: true,
    userid: -1
  },


  change: function (e) {
    this.setData({
      isFolded: !this.data.isFolded,
    })
  },



  navigateToBookPage: function(e) {
    wx.navigateTo({
      url: '/pages/bookfeed/bookfeed?bookid=' + e.target.dataset.bookid
    })
    console.log(e)
  },

  navigateTofeedcomment: function(e) {
    wx.navigateTo({
      url: '/pages/feedcomment/feedcomment?feedid=' + e.target.dataset.feedid,
    })
    console.log(e)
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
    var tab = e.detail.title
    console.log(tab)
    if (tab == "关注") {
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
    }
  },

  likefeed: function(id, index, from) {
    var that = this
    console.log("in function like feed")
    wx.request({
      url: app.globalData.baseurl + '/likefeed',
      method: "POST",
      header: {
        Authorization: wx.getStorageSync("token")
      },
      data: {
        feedid: id
      },
      success: res => {

        if (from == "recommand") {
          var temp = that.data.recommendfeeds
          console.log(temp)
          temp[index].isliked = true
          temp[index].likecount = temp[index].likecount + 1

          that.setData({
            recommendfeeds: temp
          })
        }

        console.log(res)
      }
    })
  },

  dislikefeed: function(id, index, from) {
    var that = this
    console.log("in function dislike feed")
    wx.request({
      url: app.globalData.baseurl + '/dislikefeed',
      method: "POST",
      header: {
        Authorization: wx.getStorageSync("token")
      },
      data: {
        feedid: id
      },
      success: res => {

        if (from == "recommand") {
          var temp = that.data.recommendfeeds
          console.log(temp)

          temp[index].isliked = false
          temp[index].likecount = temp[index].likecount - 1

          that.setData({
            recommendfeeds: temp
          })
        }


        console.log(res)
      }
    })
  },

  likeordislikethisfeedbtn: function(e) {
    console.log(e)

    var index = e.target.dataset.index
    var id = e.target.dataset.id
    var from = e.target.dataset.from

    var feeds = this.data.recommendfeeds
    var status = feeds[index]["isliked"]


    console.log(status)
    console.log(index)
    console.log(id)

    var that = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          if (status == false) {
            this.likefeed(id, index, from)
          } else {
            this.dislikefeed(id, index, from)
          }
        } else {
          wx.navigateTo({
            url: '/pages/login/login'
          })
        }
      }
    })
  },

  forwardthisfeed: function(e) {
    console.log(e)
    var index = e.target.dataset.index
    var id = e.target.dataset.id

    this.setData({


    })


  },

  getrecommendfeed: function() {
    console.log("in func getrecommendfeed")
    var that = this
    // if (wx.getStorageSync("hasuserinfo") == true) {}
    wx.request({
      url: app.globalData.baseurl + "/getrecommendfeed",
      method: "POST",
      data: {
        allrecommendfeedsid: that.data.allrecommendfeedsid
      },
      success: function(res) {
        if (res.data == "TokenExpiredException") {

          that.getrecommendfeed()
        }
        console.log(res)
        that.setData({
          recommendfeeds: that.data.recommendfeeds.concat(res.data)
        })
      }
    })
  },

  needlogin: function() {
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
  },

  onLoad: function(options) {
    this.needlogin()

    this.setData({
      baseurl: app.globalData.baseurl,
      userid: wx.getStorageSync("userid")
    })
    this.getrecommendfeed()
  },

  handleShare: () => {
    wx.showActionSheet({
      itemList: [
        '分享到朋友圈', '分享到好友', '分享到朋友圈', '分享到QQ空间'
      ],
    })
  },
  handleShare1() {
    wx.showToast({
      title: ' 收藏成功',
      icon: 'success'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.needlogin()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {


  },

  follow: function(e) {
    console.log(e)


  },
  disfollow: function(e) {
    console.log(e)
    var userid=e.target.dataset.userid

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