//判断两个日期是否在同一周
export function isSameWeek(date1:Date, date2:Date) {
  // 获取日期1的年份、周数和星期几
  const year1 = date1.getFullYear();
  const week1 = getWeekNumber(date1);
  const dayOfWeek1 = date1.getDay();

  // 获取日期2的年份、周数和星期几
  const year2 = date2.getFullYear();
  const week2 = getWeekNumber(date2);
  const dayOfWeek2 = date2.getDay();

  // 检查年份和周数是否相同，以及星期几是否在同一周内
  return year1 === year2 && week1 === week2 && dayOfWeek1 <= dayOfWeek2;
}

// 辅助函数：获取给定日期的周数
export function getWeekNumber(date) {
  // 创建一个新的日期对象，将其设置为给定日期的副本
  const d = new Date(date);
  // 将日期调整为一周的开始（星期天）
  d.setHours(0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  // 获取年份的第一天
  const yearStart = new Date(d.getFullYear(), 0, 1);
  // 计算周数
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}
