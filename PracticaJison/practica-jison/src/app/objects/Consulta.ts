import {Stmt} from "./Stmt";
import {DBTable} from "./DBTable";

export class Consulta {
  private static instance: Consulta;
  array_statemts!:Array<Array<Stmt>>;
  constructor() {
    this.array_statemts=[]
  }

  public static getInstanciaConsultas():Consulta{
    if(!Consulta.instance){
      Consulta.instance= new Consulta();
    }
    return Consulta.instance
  }
  public clear(){
    this.array_statemts=[];
  }

}
