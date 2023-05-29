import axios, {AxiosInstance} from "axios";

interface Response {
  success:boolean,
  msg:string,
  data:object,
}
interface User {
  id:string,
  name:string,
  password:string,
}

let instance:AxiosInstance;
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

function doGet(request:any) {
  return new Promise((resolve, reject)=>{
    instance.get(request)
      .then((res)=>{resolve(resOK(res.data))})
      .catch((e)=>{reject(resFail(e))});
  })
}

export function getCal(exp:string) {
  return instance.get('/cal/'+exp)
}

export async function addTime(id:string) {
  return await instance.get('/timer/'+id + '/300');
}

export async function getRank(lastXWeek:number):Promise<Response> {
  return await instance.get('/timer/lastXWeek/'+lastXWeek);
}

export async function register(user:User){
  return await instance.post('/user/register',user);
}

export async function login(user:User){
  return await instance.post('/user/login',user);
}
