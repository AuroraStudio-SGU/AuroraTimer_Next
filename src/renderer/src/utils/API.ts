import axios from "axios";

interface Response {
  success:boolean,
  msg:string,
  data:object,
}

let instance;
function resOK(data:object):Response {
  return {
    success:true,
    msg:'操作成功',
    data,
  }
}

function resFail(msg:string):Response {
  return {
    success:false,
    msg,
    data:null,
  }
}

export function init(baseUrl:string) {
  instance = axios.create({
    baseURL:baseUrl,
    timeout:10000,
  });
}

function doGet(request:any):Response {
  instance.get(request)
    .then((res)=>{return resOK(res)})
    .catch((e)=>{return resFail(e)});
  return resFail('null');
}

export function getCal(exp:string) {
  return instance.get('/cal/'+exp)
}

export function addTime(uid:string):Response {
  return doGet('/timer?id='+uid);
}
