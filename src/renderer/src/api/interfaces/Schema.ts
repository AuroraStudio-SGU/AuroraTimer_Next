interface APIResponse {
  success:boolean;
  msg:string;
  data:object;
}

interface getRank {
  code:number,
  msg:string,
  data:UserTime[]
}


class User {
  id:string;
  name:string;
  password:string;
}

interface UserTime {
  id:string,
  name:string,
  totalTime:number,
  weekTime:number,
  reduceTime:number,
  unfinishedCount:number,
}

interface UserInfo {
  id:string,
  name:string,
  major:string,
  token:string,
}

