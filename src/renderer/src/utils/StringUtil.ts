import {UserInfo, UserTime} from "../api/interfaces/Schema";

export function isNotEmptyStr(s: string) {
    return typeof s == "string" && s.length > 0;
}

export function checkLength(s:string,require:number):boolean {
   return typeof s == "string" && s.length <= require;
}

export function getGrade(user:UserTime|UserInfo):string {
    if(isNotEmptyStr(user.grade)){
      return user.grade;
    }else {
      return user.id.substring(0, 2);
    }
}
