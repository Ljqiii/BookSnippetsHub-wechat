const app = getApp()

Page({

  data: {
    baseurl: "",
    alllikebook: [],
    allrecommendfeedsid: [],
    recommendfeeds: []
  },
  navigateToBookPage: function(e) {
    wx.navigateTo({
      url: '/pages/bookfeed/bookfeed?bookid='+e.target.dataset.bookid
    })
    console.log(e)
  },

  navigateTofeedcomment:function(e){
    wx.navigateTo({
      url: '/pages/feedcomment/feedcomment?feedid=' + e.target.dataset.feedid,
    })
    console.log(e)
  },


  likethisfeed:function(e){
    console.log(e)
    var index=e.target.dataset.index
    var id = e.target.dataset.id




  },

  forwardthisfeed:function(e){
    console.log(e)
    var index = e.target.dataset.index
    var id = e.target.dataset.id

    this.setData({


    })


  },

  getrecommendfeed: function() {
    var that = this
    if (wx.getStorageSync("hasuserinfo") == true) {
      wx.request({
        url: app.globalData.baseurl + "/getrecommendfeed",
        method: "POST",

        data: {
          allrecommendfeedsid: that.data.allrecommendfeedsid
        },
        success: function(res) {
          console.log(res)
          that.setData({
            recommendfeeds: that.data.recommendfeeds.concat(res.data)
          })
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