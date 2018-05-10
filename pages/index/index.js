//index.js

const util = require('../../utils/util.js')


//获取应用实例
const app = getApp()



Page({
  data: {
    motto: 'Hello World',
    object: {
      key: 'Hello '
    },
    zero: 0,
    a: 1,
    b: 2,
    array: ['MINA','sdfdsf'],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    //判断是用户是否绑定了openid，如果没有则此处加入 callback 以防止这种情况，该函数供app.js中使用
    if (app.globalData.sessionId && app.globalData.sessionId != '') {
      app.openidReadyCallback = res => {
        console.log("index.js:openid:" + app.globalData.sessionId)
        app.globalData.sessionId = res.data.openid
      }
    }

    // console.log("index.js:openid:" + app.globalData.openId)

    //获取用户基本信息
    if (app.globalData.userInfo) {
      // console.log("index.js：设置usrinfo信息")
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      // console.log("index.js：由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回，所以此处加入 callback 以防止这种情况")
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log("----------------点击之后，执行函数--------------------")
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  printSessionId: function(e){
    console.log("sessionId:" + app.globalData.sessionId)
    // // 允许从相机和相册扫码
    // wx.scanCode({
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })
  },
  wxStartScan: function (e) {
    console.log("开始扫描二维码")
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        console.log(res.result)
      }
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '智能马桶，让你的屁股每一天都很蓝!',
      path: '/pages/index/index?id=123',
      imageUrl:'/resources/images/share-index.jpg',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
