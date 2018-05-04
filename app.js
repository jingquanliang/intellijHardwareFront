//app.js
const util = require('./utils/util.js')

App({

  globalData: {
    userInfo: null,
    openId: "",
    test:"sldjfljsdljf",
    code:null
  },

  onLaunch: function () {

    var that = this; 

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          this.globalData.code = res.code;  
          //发起网络请求
          // console.log("log="+res.code)
          wx.request({
            url: 'https://localhost:8888/login',
            data: {
              type: 0,
              code: res.code
            },
            success: function (res) {
              // console.log(res)
              // console.log(typeof(res.data))
              var code = res.data.code
              console.log(code + ":" + res.data.openid)
              if (code=='1')
              {
                console.log("登录成功，后台获取了数据")
                that.globalData.openId = res.data.openid
                // console.log("++++++++++++++++++++" + that.globalData.test)
                
                // 由于是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.openidReadyCallback) {
                  console.log("--------------自定义openid回调函数执行----------")
                  this.openidReadyCallback(res)
                }
                
              }
              else
                console.log("虽然想后台请求登录，但是登录失败！")
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          console.log("已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框")
          wx.getUserInfo({
            success: res => {
              // console.log("app.js:res:")
              // console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  }
})