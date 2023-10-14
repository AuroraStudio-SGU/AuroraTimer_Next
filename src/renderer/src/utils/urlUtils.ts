/*
  address:在/assets下开始的目录
 */

export const getUrl = ( address )=>{
  return new URL(`../assets/${address}`,import.meta.url).href;
  // return new URL(`./assets/${address}`, import.meta.url).href;
}
export const getUrlFromServer = (file:string,base_url:string):string => {
    return ""
}
