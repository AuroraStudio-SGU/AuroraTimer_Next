export function isNotEmptyStr(s: string) {
    return typeof s == "string" && s.length > 0;
}

export function checkLength(s:string,require:number):boolean {
   return typeof s == "string" && s.length <= require;
}
