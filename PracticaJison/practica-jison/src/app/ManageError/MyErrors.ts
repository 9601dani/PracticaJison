import {DefManageError} from "./DefManageError";

export class MyErrors{
  private static  instan:MyErrors;
  message_error!:Array<DefManageError>;
public clear(){
  this.message_error=[];
}
  constructor() {
  this.message_error=[];
  }
  public static getInstanci(): MyErrors {
    if (!MyErrors.instan) {
      MyErrors.instan = new MyErrors();
    }
    return MyErrors.instan;
  }
  public nuevoE(message:DefManageError){
    this.message_error.push(message);
  }
}
