import axios, {AxiosInstance, AxiosResponse} from "axios";
import {APIResponse, Notice, Term, User, UserInfo} from "./interfaces/Schema";
import config from '../../../../package.json'
import {formatDate} from "../utils/DateUtils";

let instance: AxiosInstance;

const HTTP_OK = 200;

export function init(baseUrl: string, token: string) {
  instance = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers: {
      "token": token,
    },
  });
}

async function processResponse(RawResp: AxiosResponse): Promise<APIResponse<any>> {
  let apiResp: APIResponse<any> = {
    success: true,
    msg: null,
    data: null
  }
  if (RawResp.status != HTTP_OK) {
    apiResp.success = false;
    apiResp.msg = "Http:" + RawResp.status + " statusText is " + RawResp.statusText
    return apiResp;
  }
  //TODO target interface
  let Res = RawResp.data
  if (Res.code != HTTP_OK) {
    apiResp.success = false;
    if(Array.isArray(Res.msg)){
      let message = '';
      Res.msg.forEach((m)=>{
          message = message + m + ';'
      })
      apiResp.msg = message;
    }else {
      apiResp.msg = Res.msg;
    }
    return apiResp;
  }
  apiResp.msg = Res.msg;
  apiResp.data = Res.data
  return apiResp;
}

async function doGet(url: string): Promise<APIResponse<any>> {
  return await processResponse(await instance.get(url));
}

async function doPost(url: string, Obj: object): Promise<APIResponse<any>> {
  return await processResponse(await instance.post(url, Obj));
}
export async function getPing() {
  return doGet('/ping')
}

export async function addTime(id: string) {
  return doGet('/timer/addTime/' + id + '?version='+config.version);
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

export async function loginByToken(token: string) {
  return doGet('/user/loginByToken/' + token)
}

export async function setDuty(wed: string, sun: string) {
  let obj = {
    wed,
    sun,
  }
  return doPost('/duty/setDuty', obj);
}

export async function getDuty() {
  return doGet('/getDustList')
}

export async function setReduceTime(uid: string, time: number) {
  return doGet('/admin/setUserReduceTime/' + uid + '/' + time)
}

export async function setTargetTime(hours: number) {
  return doGet('/admin/setTargetTime/' + hours)
}

export async function getTargetTime() {
  return doGet('/getTargetTime')
}

export async function getNotice() {
  return doGet('/timer/getNotice')
}

export async function createNotice(notice: Notice) {
  return doPost('/admin/uploadNotice', notice);
}

export async function getTop3() {
  return doGet('/timer/top3');
}

export async function getLast3() {
  return doGet('/timer/last3');
}

export async function updateAvatar(byte: ArrayBuffer, id: string) {
  const blob = new Blob([byte]);
  const formData = new FormData();
  formData.append('file', blob, id + '.avatar');
  let apiResp: APIResponse<any> = {
    success: true,
    msg: null,
    data: null
  }
  try {
    let RawResp: AxiosResponse = await instance.post('/user/uploadAvatar/' + id, formData, {headers: {'Content-Type': 'multipart/form-data'}})
    return processResponse(RawResp);
  } catch (e) {
    apiResp.success = false;
    apiResp.msg = e;
    return apiResp;
  }
}

export async function getAvatarById(id: string) {
  return doGet('/user/avatar/' + id);
}

export async function checkAdmin() {
  return doGet('/admin/test');
}

export async function queryUser(id: string) {
  return doGet('/user/' + id);
}

/**
 * tips: this cant not change admin state
 * @param user UserInfo
 */
export async function updateUser(user: UserInfo | User) {
  return doPost('/user/update', user)
}

export async function restPassword(id:string,pwd:string) {
  return doGet('/user/resetPassword/'+id+'?pwd='+pwd);
}

export async function queryAllUser(withAFK:boolean):Promise<APIResponse<UserInfo>> {
  return doGet('/manager/queryAllUser?withAFK='+withAFK);
}
export async function getDefaultAvatarUrl() {
  return doGet('/getDefaultAvatar');
}
export async function deleteUser(id:string) {
  return doGet('/manager/deleteUser/'+id);
}
export async function getTimeDetail(id:string) {
  return doGet('/timer/queryTimeDetail/'+id);
}
export async function getPriv(){
  return doGet('/user/getPriv')
}
export async function getTerm() {
  return doGet('/TermTime')
}
export async function updateTerm(term:Term) {
  let temp = {
    id:term.id,
    start:formatDate(term.start,"yyyy-MM-dd"),
    end:formatDate(term.end,"yyyy-MM-dd"),
    name:term.name
  }
  return doPost('/admin/updateTerm',temp);
}

export async function deleteBatchUser(ids:Array<string>){
    return await processResponse(await instance.request({
      url:'manager/batchDelete',
      method:'DELETE',
      params:{
        ids:ids.join(',')
      }
    }))
}
export async function getMiniVersion() {
  let res:APIResponse<string> = await doGet('/getMiniVersion');
  if(res.success){
    return res.data;
  }
  return undefined;
}
