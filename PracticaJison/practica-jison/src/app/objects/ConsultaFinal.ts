import {Consulta} from "./Consulta";
import {DBTable} from "./DBTable";
import {Atributo} from "./Atributo";

export class ConsultaFinal{
  consultas: Array<DBTable>
  query!:string;
  private static instance: ConsultaFinal;
  constructor() {
    this.consultas=[]
  }
  public static getInstanciaConsultas():ConsultaFinal {
    if (!ConsultaFinal.instance) {
      ConsultaFinal.instance = new ConsultaFinal();
    }
    return ConsultaFinal.instance
  }
  public clear(){
    this.consultas=[];
  }
}
