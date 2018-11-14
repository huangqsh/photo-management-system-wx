module.exports = {
  formatTime: formatTime,
  getUrl: getUrl//host接口 
}

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


//接口URL============== 
function getUrl() {
  return "https://huangqsh.top/photo-management-system";
  //return "http://localhost:20221/photo-management-system";
} 