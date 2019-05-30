// pages/mylikefeed/mylikefeed.js
const app = getApp()
const feedutil = require('../../utils/feedutil.js')
import Toast from '../../vant/toast/toast';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseurl: "",
    from: "",
    allmylikefeed: [],
    allmylikefeedid: [],
    displayfollowbtn: false
  },

  onLoad: function(options) {


    this.setData({
      baseurl: app.globalData.baseurl
    })



    console.log(options)

    wx.setNavigationBarTitle({
      title: options.title
    })

    if (options.title == "我的收藏") {
      this.setData({
        from: "self",
        userid: wx.getStorageSync("userid")
      })

      this.getallmylikefeed()
    }
    if (options.title == "我的分享") {
      this.getallmysharefeed()
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
  getallmysharefeed: function() {
    var that = this
    wx.request({
      url: app.globalData.baseurl + "/getallmyfeed",
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
  changefolded: function(e) {
    console.log(e)
    var index = e.target.dataset.index
    var that = this

    var temp = that.data.allmylikefeed

    temp[index].isFolded = !temp[index].isFolded

    that.setData({
      allmylikefeed: temp
    })
  },

  //喜欢feed 函数回调
  likefeedcallback: function(res, from, index) {
    var that = this

    var temp = that.data.allmylikefeed
    console.log(temp)
    temp[index].isliked = true
    temp[index].likecount = temp[index].likecount + 1

    that.setData({
      allmylikefeed: temp
    })

  },
  //dis喜欢feed 函数回调
  dislikefeedcallback: function(res, from, index) {

    var that = this


    var temp = that.data.allmylikefeed
    console.log(temp)

    temp[index].isliked = false
    temp[index].likecount = temp[index].likecount - 1

    that.setData({
      allmylikefeed: temp
    })

  },

  likeordislikethisfeedbtn: function(e) {
    console.log(e)

    var index = e.target.dataset.index
    var id = e.target.dataset.id
    var from = e.target.dataset.from

    var feeds = this.data.allmylikefeed
    var status = feeds[index]["isliked"]


    console.log(status)
    console.log(index)
    console.log(id)

    var that = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          if (status == false) {

            feedutil.likefeed(id, index, from, that.likefeedcallback)
            // this.likefeed(id, index, from)
          } else {
            feedutil.dislikefeed(id, index, from, that.dislikefeedcallback)

            // this.dislikefeed(id, index, from)
          }
        } else {
          wx.navigateTo({
            url: '/pages/login/login'
          })
        }
      }
    })


  },

  //转发回调
  forwardthisfeedcallback: function(res, from, index) {
    console.log(res)
    var that = this


   

      var temp = that.data.allmylikefeed
      console.log(temp)

      temp[index].isforward = true
      that.setData({
        allmylikefeed: temp
      })
 
  },

  disforwardthisfeedcallback: function(res, from, index) {
    console.log(res)
    var that = this
   

      var temp = that.data.allmylikefeed
      console.log(temp)

      temp[index].isforward = false
      that.setData({
        allmylikefeed: temp
      })
 
  },

  forwardthisfeed: function(e) {
    var that = this

    console.log(e)
    var index = e.target.dataset.index
    var id = e.target.dataset.id
    var from = e.target.dataset.from

  
    if (this.data.allmylikefeed[index].isforward == false) {
        if (wx.getStorageSync("userid") == this.data.allmylikefeed[index].userid) {
          Toast('不能转发自己的分享');
          // console.log("不能转发自己的")
        } else {
          feedutil.forwardfeed(id, index, from, this.forwardthisfeedcallback)
          Toast('分享成功');
        }
      } else {
        feedutil.disforwardfeed(id, index, from, this.disforwardthisfeedcallback)
        Toast('已取消分享');
      }
    

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
  navigateTofeedcomment: function(e) {
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