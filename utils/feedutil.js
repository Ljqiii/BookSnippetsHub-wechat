const app = getApp()



const dislikefeed = function(id, index, from, func) {
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
      func(res, from, index)
    }
  })
}

const likefeed = function(id, index, from, func) {
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

      func(res, from, index)

    }
  })
}

const forwardfeed = function (id, index, from, func) {
  var that = this
  console.log("in function forwardfeed")
  wx.request({
    url: app.globalData.baseurl + '/forward',
    method: "POST",
    header: {
      Authorization: wx.getStorageSync("token")
    },
    data: {
      feedid: id
    },
    success: res => {
      console.log(res)
      func(res, from, index)
      // func(res, from, index)

    }
  })
}


const disforwardfeed = function (id, index, from, func) {
  var that = this
  console.log("in function forwardfeed")
  wx.request({
    url: app.globalData.baseurl + '/disforward',
    method: "POST",
    header: {
      Authorization: wx.getStorageSync("token")
    },
    data: {
      feedid: id
    },
    success: res => {
      console.log(res)
      func(res, from, index)
      // func(res, from, index)

    }
  })
}





module.exports = {
  dislikefeed: dislikefeed,
  likefeed: likefeed,
  forwardfeed: forwardfeed,
  disforwardfeed: disforwardfeed
  // disforwardfeed: disforwardfeed

}