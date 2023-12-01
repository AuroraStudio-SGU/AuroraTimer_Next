import {UserInfo, UserTime} from "../api/interfaces/Schema";

export function isNotEmptyStr(s: string) {
    return typeof s == "string" && s.length > 0;
}

export function checkLength(s:string,require:number):boolean {
   return typeof s == "string" && s.length <= require;
}

export function getGrade(user:UserTime|UserInfo):string {
  try{
    if(isNotEmptyStr(user.grade) && user.grade != "待填写"){
      return user.grade.substring(0,2);
    }else {
      return user.id.substring(0, 2);
    }
  }catch (e) {
    console.error(e)
  }
  console.log(user.grade)
}
