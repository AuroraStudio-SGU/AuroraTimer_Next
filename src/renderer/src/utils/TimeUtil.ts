export const formatTime = (time:Number)=>{
  let hour = time / 60000
  let _min = (time % 60000) / 1000
  let min
  if(_min.toFixed(0) == '0'){
    min = '00'
  }else {
    min = _min.toFixed(0)
  }
  return hour.toFixed(0) + ':' + min
}
