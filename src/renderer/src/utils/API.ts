import axios from "axios";

let instance;

export function init(baseUrl:string) {
  instance = axios.create({
    baseURL:baseUrl,
    timeout:10000,
  })
}


export function getCal(exp:string):Promise<axios.AxiosResponse<any>> {
  return instance.get('/cal/'+exp);
}
