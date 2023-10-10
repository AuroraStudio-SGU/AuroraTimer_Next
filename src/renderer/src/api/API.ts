import axios, {AxiosInstance, AxiosResponse} from "axios";

let instance: AxiosInstance;

const HTTP_OK = 200;

export function init(baseUrl: string,token?:string) {
  instance = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers:{
      "token": token,
    },
  });
}

async function processResponse(RawResp:AxiosResponse):APIResponse {
  let apiResp: APIResponse = {
    success: true,
    msg: null,
    data: null
  }
  if (RawResp.status != HTTP_OK) {
    apiResp.success = false;
    apiResp.msg = "HTTP Code is not 200,current status is " + RawResp.status + "statusText is " + RawResp.statusText
    return apiResp;
  }
  //TODO target interface
  let Res = RawResp.data
  if (Res.code != HTTP_OK) {
    apiResp.success = false;
    apiResp.msg = "System return not 200 code,current code :" + Res.code
    return apiResp;
  }

  apiResp.msg = "操作成功"
  apiResp.data = Res.data
  return apiResp;
}

async function doGet(url: string,token?:string):APIResponse {
  let apiResp: APIResponse = {
    success: true,
    msg: null,
    data: null
  }
  try{
    let RawResp: AxiosResponse = await instance.get(url,{headers:{"token":token}})
    return await processResponse(RawResp);
  }catch (e) {
    apiResp.success = false;
    apiResp.msg = e;
    return apiResp;
  }

}
async function doPost(url:string,Obj:object,token?:string):APIResponse {
  let apiResp: APIResponse = {
    success: true,
    msg: null,
    data: null
  }
  try{
    let RawResp: AxiosResponse = await instance.post(url,Obj,{headers:{"token":token}})
    return processResponse(RawResp);
  }catch (e) {
    apiResp.success = false;
    apiResp.msg = e;
    return apiResp;
  }
}


export async function getPing() {
  return doGet('/ping')
}

export async function addTime(id: string,time:number) {
  return doGet('/timer/addTime/' + id + '/'+time);
}

export async function getRank(lastXWeek: number) {
  return doGet('/timer/lastXWeek/' + lastXWeek)
}

export async function register(user: User) {
  return doPost('/user/register', user);
}

export async function login(user: User) {
  return doPost('/user/login', user);
}
export async function loginByToken(token:string){
  return doGet('/user/loginByToken/'+token)
}

export async function setDuty(wed:string,sun:string) {
  let obj = {
    wed,
    sun,
  }
  return doPost('/admin/setDuty',obj);
}
export async function getDuty() {
  return doGet('/getDustList')
}

export async function setReduceTime(uid:string,time:number){
  return doGet('/admin/setUserReduceTime/'+uid+'/'+time)
}

export async function setTargetTime(hours:number){
  return doGet('/admin/setTargetTime/'+hours)
}

export async function getTargetTime(){
  return doGet('/getTargetTime')
}

export async function getNotice(){
  return doGet('/admin/getNotice')
}
