// 时间戳转换yyyy-MM-dd hh:mm:ss
export function timestampToTime(times) {
    let time = times[1]
    let mdy = times[0]
    mdy = mdy.split('/')
    let month = parseInt(mdy[0]);
    let day = parseInt(mdy[1]);
    let year = parseInt(mdy[2])
    return year + '-' + month + '-' + day + ' ' + time
  }