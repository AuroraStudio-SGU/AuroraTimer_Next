let timePlex = 1;
let tickTask
let timer

self.onmessage = (event) => {
  if (event.data === 'start') {
    StartTimer();
  } else if (event.data === 'stop') {
    StopTimer();
  }
}

function StartTimer() {
  clearTimeout(timer)
  initTs();
  tickTask();
}
function StopTimer() {
  clearTimeout(timer)
}

const initTs = ()=>{
  tickTask = ()=>{
    self.postMessage(timePlex)
    timer = setTimeout(tickTask, 1000);
  }
}
