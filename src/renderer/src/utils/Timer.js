let timePlex = 1;
let init = false
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
  if(!init) initTs();
  tickTask();
}
function StopTimer() {
  clearTimeout(timer)
}

const initTs = ()=>{
  if(init) return;
  tickTask = ()=>{
    self.postMessage(timePlex)
    timer = setTimeout(tickTask, 1000);
  }
  init = true
}
