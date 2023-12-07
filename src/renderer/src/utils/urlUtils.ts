/*
  address:在/assets下开始的目录
 */
export const getUrl = ( address )=>{
  return new URL(`../assets/${address}`,import.meta.url).href;
  // return new URL(`./assets/${address}`, import.meta.url).href;
}
