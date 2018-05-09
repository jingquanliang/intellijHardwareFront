//logs.js
const util = require('../../utils/util.js')

var initFilterTitle = '过滤'
var initFilterContent =""
Page({
  data: {
    filterText: initFilterTitle,
    filterContent: initFilterContent
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
