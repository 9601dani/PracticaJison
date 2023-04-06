import {Instruction} from "./instruction";
import {OperationType} from "./operation_type";
import {TablaSimbolos} from "./tabla_simbolos";

export class OperacionBinaria extends Instruction{
  type : OperationType;
  operador_izquierdo!: Instruction;
  operados_derecho!: Instruction;

  constructor(line:number,column:number, type:OperationType, operador_izquierdo:Instruction, operador_derecho:Instruction) {
    super(line,column);
    this.type=type;
    this.operador_izquierdo=operador_izquierdo;
    this.operados_derecho=operador_derecho;
  }

  run(table: TablaSimbolos): any {
  }



}

