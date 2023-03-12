export const enum errCode{
    E200=200,
    E400=400,
    E404=404,
}

export const enum errMsg{
    OK='Success',
    Missing='Parameters Missing',
    Fail='Fail to store data'
}

export class Err{
    data:any;
    code:number;
    msg:string;
    constructor(code,msg,data) {
      this.code=code
      this.msg=msg
        this.data=data
    }
}

