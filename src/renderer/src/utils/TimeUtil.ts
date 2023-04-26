

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

export const SecondToString = (Second:number)=>{
  if(Second >= 3600){
    let hour :string = parseInt((Second / 3600).toString()).toString()
    hour = hour + '小时';
    let minus :string = parseInt(((Second % 3600) / 60).toString()).toString() + '分钟'
    return hour + minus
  }else{
    return parseInt((Second / 60).toString()).toString() + '分钟';
  }

}
