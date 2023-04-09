import {Stmt} from "./Stmt";

export class Consulta {
  private static instance: Consulta;
  array_statemts!:Array<Stmt>;
  constructor() {
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
