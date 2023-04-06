import {Instruction} from "./instruction";
import {OperationType} from "./operation_type";
import {TablaSimbolos} from "./tabla_simbolos";
import {Variable, VariableType} from "./variable";

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

  run(table: TablaSimbolos): Variable| undefined {
    const left: Variable|undefined= this.operador_izquierdo.run(table); /*ira a value para saber el valor*/
    const  right:Variable|undefined= this.operados_derecho.run(table);
    let variable = new Variable();
    if(left && right){
        const type= left.type=== VariableType.DECIMAL || right.type=== VariableType.DECIMAL
        ? VariableType.DECIMAL
        : VariableType.INT;
        variable.type= type;
        switch (this.type){
          case OperationType.MAS:
            variable.value= Number(left.value)+Number(right.value);
            console.log(variable.value)
            //TODO: aqui va la verificacion de que type retorna
            return variable;
          case OperationType.MENOS:
            variable.value= Number(left.value)-Number(right.value);
            //TODO: aqui va la verificacion de que type retorna
            return variable;
          case OperationType.DIVIDE:
            variable.value= Number(left.value)/Number(right.value);
            variable.type= VariableType.DECIMAL
            //TODO: aqui va la verificacion de que type retorna
            return variable;
          case OperationType.POR:
            variable.value= Number(left.value)*Number(right.value);
            //TODO: aqui va la verificacion de que type retorna
            return variable;
        }
    }
    throw new Error("Errores en la operacion")
  }
}

