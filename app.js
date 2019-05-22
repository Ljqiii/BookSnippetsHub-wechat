//app.js
import './utils/wxPromise.js'

App({

  globalData: {
    hasuserinfo: "",
    userInfo: null,
    baseurl: "https://api.booksnippetshub.com" //change this
    // baseurl: "http://127.0.0.1:8081" //change this
  },
  onLaunch: function() {
    wx.setStorageSync("hasuserinfo", false)

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        var that = this
        wx.request({
          url: this.globalData.baseurl + '/auth/wxlogin',
          method: "POST",
          data: {
            js_code: res.code
          },
          success: function(res) {
            var thatt = that
            // console.log(res.data)
            if (res.data.errcode == 0) {

              wx.setStorageSync("userid", res.data.userid)
              wx.setStorageSync("token", res.data.token)
              wx.setStorageSync("hasuserinfo", res.data.hasuserinfo)
              thatt.globalData.hasuserinfo = res.data.hasuserinfo

              // 更新用户信息
              wx.getSetting({
                success: res => {
                  var thattt = thatt
                  if (res.authSetting['scope.userInfo']) {
                    console.log("已经授权")
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                      success: res => {
                        // 可以将 res 发送给后台解码出 unionId
                        // app.globalData.userInfo = res.userInfo
                        wx.request({
                          url: thattt.globalData.baseurl + "/auth/uploadWxUserinfo",
                          method: "POST",
                          header: {
                            Authorization: wx.getStorageSync("token")
                          },
                          data: {
                            userinfo: res.userInfo
                          },
                          success: res => {
                            wx.setStorageSync("hasuserinfo", true)
                          }
                        })
                        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                        // 所以此处加入 callback 以防止这种情况
                        if (thattt.userInfoReadyCallback) {
                          thattt.userInfoReadyCallback(res)
                        }
                      }
                    })
                  }
                }
              })


            } else {
              wx.navigateTo({
                url: '/pages/error/error?errmsg=登录失败',
              })
            }
          }
        })
      },
      fail: function(e) {
        wx.getNetworkType({
          success: function(res) {
            var errmsg = ''
            if (res.networkType == "none") {
              errmsg = "无网络连接"
            } else {
              errmsg = "登录失败"
            }
            wx.navigateTo({
              url: '/pages/error/error?errmsg=' + errmsg,
            })
          }
        })
      }
    })
  }
})