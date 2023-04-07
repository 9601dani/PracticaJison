import {DefManageError} from "./DefManageError";

export class MyErrorsMini{
  private static  instan:MyErrorsMini;
  message_error!:Array<DefManageError>;
  public clear(){
    this.message_error=[];
  }
  constructor() {
    this.message_error=[];
  }
  public static getInstanci(): MyErrorsMini {
    if (!MyErrorsMini.instan) {
      MyErrorsMini.instan = new MyErrorsMini();
    }
    return MyErrorsMini.instan;
  }
  nuevoE(message:DefManageError){
    this.message_error.push(message);
  }
}
