let tickTask
const startTimer = () => {
  if (!timeStore.isStarted) {
    timeStore.OpenTimer()
    tickTask();
  }
}
const setUpTimer = () => {
  tickTask = () => {
    globalStore.isAFK = false
    let time = timeStore.time
    let nowTimeStr = SecondToTimeStr(time)
    if(time % 300 === 0 && time!==0){
      //尝试上传时间
      // uploadTime() current disable
    }
    if (time % 1800 === 0 && time!==0 && globalStore.AFKDetected) {
      window.electronAPI.getMousePoint().then((point) => {
        if (globalStore.lastMousePoint.x === point.x || globalStore.lastMousePoint.y === point.y) {
          StopTimer()
          globalStore.isAFK = true
          //TODO 提示用户是否正在挂机
          const NOTIFICATION_TITLE = "你是不是正在挂机？";
          const NOTIFICATION_BODY =
            "点我恢复计时！";
          new Notification(NOTIFICATION_TITLE, {body: NOTIFICATION_BODY}).onclick =
            () => {
              tickTask();
              ElNotification({
                title: '重新恢复计时',
                type: 'success'
              })
            };
        }
        globalStore.lastMousePoint = point
      })
    }
    hour.value = nowTimeStr.hour
    min.value = nowTimeStr.min
    second.value = nowTimeStr.second
    timeStore.TimePlusPlus()
    timeStore.timer = setTimeout(tickTask, 1000)
  }
}

const uploadTime = async () => {
  await API.addTime(globalStore.Setting.userInfo.uid)
    .then(res=>{
      if(res.code==="200") return true
      else {
        ElNotification({
          title: "请求失败！",
          message:res.msg,
          type:"error"
        });
      }
    })
    .catch(res=>{
      ElNotification({
        title: "请求失败！",
        message:res.msg,
        type:"error"
      });
    })

}
