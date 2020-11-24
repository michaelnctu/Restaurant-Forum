const moment = require('moment')

module.exports = {
  ifCond: function (a, b, options) {
    if (a === b) {
      return options.fn(this)
    }
    return options.inverse(this)
  },


  selfWareness: function (v1, v2) { //提醒當下的登入情況 
    if (v1 === v2) { return '(yourself)' }
  },

  moment: function (a) {  //用於留言距離現在的時間差  
    return moment(a).fromNow()
  }


}