import {PrivList, User, UserInfo, UserTime} from "../api/interfaces/Schema";
import {ElNotification} from "element-plus";

export function isNotEmptyStr(s: string) {
    return typeof s == "string" && s.length > 0;
}

export function checkLength(s:string,require:number):boolean {
   return typeof s == "string" && s.length <= require;
}

export function getGrade(user:UserTime|UserInfo|User):string {
  if(!isNotEmptyStr(user.grade) && !isNotEmptyStr(user.id)) return ;
  try{
    if(isNotEmptyStr(user.grade) && user.grade != "待填写"){
      return user.grade.substring(0,2);
    }else {
      return user.id.substring(0, 2);
    }
  }catch (e) {
    console.error(e)
    console.error("出错用户对象")
    console.error(user)
  }
}
const DefaultPlaceHolder = "请选择方向";
const MAX_LENGTH = 32
export function checkUserSchema(user:User | UserInfo) {
  if(isNaN(Number(user.id))){
    ElNotification({
      title: "参数错误",
      message:"请填写正确的学号",
      type: "error"
    });
  }
  if(!isNotEmptyStr(user.name)){
    ElNotification({
      title: "参数错误",
      message: "姓名不能为空",
      type: "error"
    });return;
  }else if(user.name.length >=MAX_LENGTH){
    ElNotification({
      title: "参数错误",
      message: "太长了，能不能小于32个字符",
      type: "error"
    });return;
  }
  if(!isNotEmptyStr(user.workGroup) || user.workGroup===DefaultPlaceHolder){
    ElNotification({
      title: "参数错误",
      message: "请填写方向",
      type: "error"
    });return;
  }
  if(!isNotEmptyStr(user.major)){
      ElNotification({
      title: "参数错误",
      message: "请填写专业",
      type: "error"
    });return;
  }else if(user.major.length >= MAX_LENGTH) {
    ElNotification({
      title: "参数错误",
      message: "太长了，能不能小于32个字符",
      type: "error"
    });return;
  }
}

export function getPrivName(priv:number){
  console.log(priv)
  let privEle = PrivList.find(i=>i.val===priv);
  console.log(privEle)
  return privEle.name;
}
