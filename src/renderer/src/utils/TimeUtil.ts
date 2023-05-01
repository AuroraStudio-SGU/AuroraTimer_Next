interface DateTime {
  FullDate: string,
  Date: string,
  Time: string
}

interface Season {
  Spring_next: number
  Spring: number,
  Summer: number,
  Autumn: number,
  Winter: number
}

interface SumTime {
  Sunrise: number,
  Sunset: number
}

export const SecondToString = (Second: number) => {
  if (Second >= 3600) {
    let hour: string = parseInt((Second / 3600).toString()).toString()
    hour = hour + '小时';
    let minus: string = parseInt(((Second % 3600) / 60).toString()).toString() + '分钟'
    return hour + minus
  } else {
    return parseInt((Second / 60).toString()).toString() + '分钟';
  }
}

export const formatSecondTime = (Second: number) => {
  let hour: any = parseInt((Second / 3600).toString())
  if(hour < 10) hour = '0'+ hour
  let minus: any = parseInt(((Second % 3600) / 60).toString())
  if(minus < 10) minus = '0' + minus
  return hour + ':' + minus
}
export const currentDate = (): DateTime => {
  let date = new Date();
  const year = date.getFullYear(); //获取当前年
  const mon = date.getMonth() + 1; //获取当前月
  const day = date.getDate(); //获取当前日
  const hours = date.getHours(); //获取当前小时
  const minutes = date.getMinutes(); //获取当前分钟
  const seconds = date.getSeconds(); //获取当前秒
  return {
    FullDate: year + "-" + mon + "-" + day + " " + hours + ":" + minutes + ":" + seconds,
    Date: year + "-" + mon + "-" + day,
    Time: hours + ":" + minutes + ":" + seconds,
  }
}
//工作室的经纬度
const lon = 113.671886
const lat = 24.774934
//东八区中央经度
const GTM8_lon = 120

//春分秋分太阳入射角
const Spring_Autumn_SunAngle = 0
//夏至太阳入射角
const Summer_SunAngle = 23.27
//冬至太阳入射角
const Winter_SunAngle = -23.27
//地球半径（km)
const Earth_Round = 6371.393
//角度-弧度 倍率
const ArcPlex = 0.017453293

const CalSeasonTime = (): Season => {
  let year = new Date().getFullYear();
  return {
    Spring_next: Date.parse(year + 1 + '-03-20'),
    Spring: Date.parse(year + '-03-20'),
    Summer: Date.parse(year + '-06-22'),
    Autumn: Date.parse(year + '-09-20'),
    Winter: Date.parse(year + '-12-22')
  }
}
const angleToArc = (Angle:number):number =>{
  return Angle*ArcPlex
}
const arcToAngle = (Arc:number):number =>{
  return Arc / ArcPlex
}
/*
 * 计算工作室日出日落时间
 * 粗略计算!!!
 * 返回当天的日出日落时间(单位毫秒)
 */
export const CalculateSunTime = (): SumTime => {
  //正午时间 (单位小时)
  const HighNoon = 12+Number((GTM8_lon - lon) * (1 / 15).toFixed(3))
  //截面圆半径
  let _r = Earth_Round * Math.cos(angleToArc(lat))
  //太阳入射角计算
  let curDate = Date.parse(currentDate().Date)
  let SeasonTime = CalSeasonTime()
  let offset = 0
  let Angle = 0
  switch (true) {
    case curDate >= SeasonTime.Spring && curDate <= SeasonTime.Summer://春分-夏至
      offset = SeasonTime.Summer - SeasonTime.Spring;
      Angle = Summer_SunAngle * (1 - ((SeasonTime.Summer - curDate) / offset));
      break;
    case curDate >= SeasonTime.Summer && curDate <= SeasonTime.Autumn://夏至-秋分
      offset = SeasonTime.Autumn - SeasonTime.Summer;
      Angle = Summer_SunAngle * ((SeasonTime.Autumn - curDate) / offset);
      break;
    case curDate >= SeasonTime.Autumn && curDate <= SeasonTime.Winter://秋分-冬至
      offset = SeasonTime.Winter - SeasonTime.Autumn;
      Angle = Winter_SunAngle * (1 - ((SeasonTime.Autumn - curDate) / offset));
      break;
    case curDate >= SeasonTime.Winter && curDate <= SeasonTime.Spring_next://冬至-明年春分
      offset = SeasonTime.Spring_next - SeasonTime.Winter;
      Angle = Winter_SunAngle * ((SeasonTime.Spring_next - curDate) / offset);
      break;
  }
  //入射三角形斜边
  let c = _r * Math.cos(angleToArc(lat))
  //入射三角形短边
  let b = _r * Math.sin(angleToArc(lat)) * Math.tan(angleToArc(Angle))
  //斜边和短边的夹角 β
  let bet = Math.acos(b / c)
  //日出时间 (毫秒)
  let offSetTime = ((360 -  arcToAngle(bet) * 2) / 360 * 24) / 2
  let Sunrise = (HighNoon - offSetTime) * 3600 * 1000 + curDate
  let Sunset = (HighNoon + offSetTime) * 3600 * 1000 + curDate
  return {
    Sunrise,
    Sunset
  };
}



