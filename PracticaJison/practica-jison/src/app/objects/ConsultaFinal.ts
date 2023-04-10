import {Consulta} from "./Consulta";

export class ConsultaFinal{
  consultas: Array<Consulta>
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
