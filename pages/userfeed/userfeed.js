// pages/mylikefeed/mylikefeed.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseurl: "",
    from: "",
    allmylikefeed: [],
    allmylikefeedid: [],
    displayfollowbtn:false
  },

  onLoad: function(options) {


    this.setData({
      baseurl: app.globalData.baseurl
    })



    console.log(options)
    if (options.userid==null){
      wx.setNavigationBarTitle({
        title: "我的收藏"
      })
      this.setData({
        from: "self",
        userid: wx.getStorageSync("userid")
      })

      this.getallmylikefeed()
    }
    if (options.userid == wx.getStorageSync("userid")) {
    

      
      this.getallmylikefeed()
    } else {
      this.setData({
        from: "other",
        userid: options.userid
      })

      ////======
    }
  },

  getallmylikefeed: function() {
    console.log("in func getallmylikefeed")
    var that = this

    wx.request({
      url: app.globalData.baseurl + "/getallmylikefeed",
      method: "POST",
      data: {
        allmylikefeedid: that.data.allrecommendfeedsid
      },
      header: {
        Authorization: wx.getStorageSync("token")
      },
      success: function(res) {
        console.log(res)
        that.setData({
          allmylikefeed: that.data.allmylikefeed.concat(res.data)
        })
      }
    })
  },
  changefolded: function (e) {
    console.log(e)
    var index = e.target.dataset.index
    var that = this

    var temp = that.data.allmylikefeed

    temp[index].isFolded = !temp[index].isFolded

    that.setData({
      allmylikefeed: temp
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
  navigateTofeedcomment: function (e) {
    wx.navigateTo({
      url: '/pages/feedcomment/feedcomment?feedid=' + e.target.dataset.feedid,
    })
    console.log(e)
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