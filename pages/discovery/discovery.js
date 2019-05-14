const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Arrarlist: [1, 2, 3, 4, 1, 1, 1, 1]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  },
  test: () => {
    wx.pro.request({
      url: 'http://127'
    }).catch(res => {
      console.log(res)
    })
    wx.pro.request({
      url: 'http://baidu.com',
    }).then(res => {
      console.log(res)
    })
    wx.pro.request({
      url: 'http://baidu.com',
    }).then(res => {
      console.log(res)
    })


  }
})