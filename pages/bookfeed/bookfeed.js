// pages/bookfeed/bookfeed.js

const app = getApp()


import Toast from '../../vant/toast/toast';

const feedutil = require('../../utils/feedutil.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseurl: "",
    name: "",
    description: "",
    id: "",
    bookcoverimgurl: "",

    isstar: false,

    allfeedid: [],
    allfeed: []
  },

  likebook: function() {
    var that = this
    wx.request({
      url: app.globalData.baseurl + '/likebook',
      data: {
        bookid: that.data.id
      },
      method: "POST",
      header: {
        Authorization: wx.getStorageSync("token")
      },
      success: function(res) {
        if (res.data["isok"] == true) {
          that.setData({
            isstar: true
          })
        }
      }
    })

  },

  dislikebook: function() {
    var that = this
    wx.request({
      url: app.globalData.baseurl + '/dislikebook',
      data: {
        bookid: that.data.id
      },
      method: "POST",
      header: {
        Authorization: wx.getStorageSync("token")
      },
      success: function(res) {
        if (res.data["isok"] == true) {
          that.setData({
            isstar: false
          })
        }

      }
    })
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
        var temp = that.data.allfeed
        console.log(temp)
        temp[index].isliked = true
        temp[index].likecount = temp[index].likecount + 1

        that.setData({
          allfeed: temp
        })

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


        var temp = that.data.allfeed
        console.log(temp)

        temp[index].isliked = false
        temp[index].likecount = temp[index].likecount - 1

        that.setData({
          allfeed: temp
        })

        console.log(res)
      }
    })
  },

  likeordislikethisfeedbtn: function(e) {
    console.log(e)

    var index = e.target.dataset.index
    var id = e.target.dataset.id
    var from = e.target.dataset.from

    var feeds = this.data.allfeed
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

  navigateTofeedcomment: function(e) {
    wx.navigateTo({
      url: '/pages/feedcomment/feedcomment?feedid=' + e.target.dataset.feedid,
    })
    console.log(e)
  },

  onLoad: function(options) {
    var that = this
    wx.request({
      url: app.globalData.baseurl + '/islike',
      data: {
        bookid: options.bookid
      },
      method: "POST",
      header: {
        Authorization: wx.getStorageSync("token")
      },
      success: function(res) {
        that.setData({
          isstar: res.data["islike"]
        })
        console.log(res)
      }
    })
    this.setData({
      baseurl: app.globalData.baseurl
    })
    wx.request({
      url: app.globalData.baseurl + '/getbook',
      method: "POST",
      data: {
        bookid: options.bookid
      },
      success: function(res) {
        console.log(res)
        that.setData({
          name: res.data["name"],
          description: res.data["description"],
          id: res.data["id"],
          bookcoverimgurl: res.data["bookcoverimgurl"]
        })
        wx.setNavigationBarTitle({
          title: res.data["name"]
        })

      }
    })

    wx.request({
      url: app.globalData.baseurl + '/getbookfeed',
      method: "POST",
      data: {
        bookid: options.bookid,
        allfeedid: this.data.allfeed
      },
      success: function(res) {
        console.log(res)
        that.setData({
          allfeed: res.data
        })
      }
    })
  },


  followusercallback: function(res, from, userid) {
    console.log(res)
    console.log(from)

    if (res.data.isok == true) {
      console.log("in func followusercallback")
      console.log(from)



      var recommendfeeds = this.data.allfeed
      for (var i = 0; i < recommendfeeds.length; i++) {
        if (recommendfeeds[i].userid == userid) {
          recommendfeeds[i].isfollow = true
        }
      }
      this.setData({
        allfeed: recommendfeeds
      })




    }
  },

  disfollowusercallback: function(res, from, userid) {
    console.log(res)
    console.log(from)
    if (res.data.isok == true) {
      console.log("in func disfollowusercallback")


      var recommendfeeds = this.data.allfeed
      for (var i = 0; i < recommendfeeds.length; i++) {
        if (recommendfeeds[i].userid == userid) {
          recommendfeeds[i].isfollow = false
        }
      }
      this.setData({
        allfeed: recommendfeeds
      })



    }
  },




  followuser: function(e) {
    var userid = e.target.dataset.userid
    var from = e.target.dataset.from
    feedutil.follow(userid, from, this.followusercallback)
  },



  disfollowuser: function(e) {
    var userid = e.target.dataset.userid
    var from = e.target.dataset.from
    feedutil.disfollow(userid, from, this.disfollowusercallback)
  },


  //转发回调
  forwardthisfeedcallback: function(res, from, index) {
    console.log(res)
    var that = this



    var temp = that.data.allfeed
    console.log(temp)

    temp[index].isforward = true
    that.setData({
      allfeed: temp
    })




  },

  disforwardthisfeedcallback: function(res, from, index) {
    console.log(res)
    var that = this


    var temp = that.data.allfeed
    console.log(temp)

    temp[index].isforward = false
    that.setData({
      allfeed: temp
    })



  },

  forwardthisfeed: function(e) {
    var that = this

    console.log(e)
    var index = e.target.dataset.index
    var id = e.target.dataset.id
    var from = e.target.dataset.from
    var feeds = this.data.allfeed


    if (feeds[index].isforward == false) {
      if (wx.getStorageSync("userid") == feeds[index].userid) {
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